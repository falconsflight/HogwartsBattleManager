import React, { useReducer, useState } from 'react';
import {
  Button,
  Pressable,
  ScrollView,
  Text,
  View
} from 'react-native';
import Player from '../components/Player';
import {createDarkArtsDeck, createDeck, shuffleCards} from '../lib/UtilityFunctions';
import { CardProps } from '../models/CardProps';
import Store from '../components/Store';
import Cards from '../lib/Cards';
import GameDetailsModal from '../components/GameDetailsModal';
import { PlayerProps } from '../models/PlayerProps';
import { CardData } from '../models/CardData';
import { DarkArtsData } from '../models/DarkArtsData';
import DarkArtsCard from '../components/DarkArtsCard';
import AcquireCardModal from '../components/AcquireCardModal';

const GamePage = ({ route, navigation}) => {
    const { characters, year } = route.params;
    const playerCount = characters.length;
    const shelfLimit = 6;
    
    const charactersJson = require('../Characters.json');
    const charactersData = charactersJson.characters;
    const [turnCount, setTurnCount] = useState(1);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [players, setPlayers] = useState(SetupPlayers(characters));
    const [store, setStore] = useState(CreateStore(year));
    const [darkArtsCards, setDarkArtsCards] = useState(CreateDarkArtsCards(year));
    const [gameDetailsVisible, setGameDetailsVisible] = useState(false);
    const [acquireCardModalVisible, setAcquireCardModalVisible] = useState(false);
    const [acquiredCard, setAcquiredCard] = useState({});
    const [,forceUpdate] = useReducer(x => x + 1, 0);

    const renderPlayer = (player: Readonly<PlayerProps>) => {
      return (
        <Player 
        character={player.character} 
        drawPile={player.drawPile}
        hand={player.hand}
        discardPile={player.discardPile}
        isActive={player.character.name == GetCurrentPlayerName()}
        drawFn={player.drawFn}
        drawDiscardFn={player.drawDiscardFn}
        discardFn={player.discardFn}
        />
      );
    }

    const renderDarkArts = (deck: Readonly<DarkArtsData[]>) => {
      if(deck.length > 0){
        let card = deck[deck.length - 1]
        return (
          <DarkArtsCard
          id={card.id}
          name={card.name}
          description={card.description}
          />
        );
      }
      return null;
    }

    const renderDarkArtsCard = (card: Readonly<DarkArtsData>) => {
      return (
          <DarkArtsCard
          id={card.id}
          name={card.name}
          description={card.description}
          />
        );
    }
    
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
            title="Game Details"
            onPress={() => {setGameDetailsVisible(true)}}
          />
          <Text style={{fontSize:25}}>{GetCurrentPlayerName()}'s turn</Text>
          <Button
            title={"End Turn #"+turnCount}
            onPress={() => {EndTurn()}}
          />
          <View style={{ 
                    flex: 1, 
                    flexWrap: "wrap", 
                    flexDirection: "row", 
                    padding: 10, 
                    justifyContent: 'center', 
                    alignItems: 'center'
                }
            }>
          <Pressable onPress={() => drawDarkArtsCard()}>
          {renderDarkArtsCard({name: "Dark Arts Deck", description: "", id: "darkArtsDraw", count: 1})}
          </Pressable>
          {renderDarkArts(darkArtsCards.discardPile)}
          </View>
          <Store drawPile={store.drawPile} shelf={store.shelf} drawFn={addToShelf} acquireFn={acquireCard}></Store>
          {players.map((player) => renderPlayer(player))}
        </View>

      <AcquireCardModal
        cardName={acquiredCard.name}
        cardId={acquiredCard.id}
        playerName={GetCurrentPlayerName()}
        isVisible={acquireCardModalVisible}
        displayFn={setAcquireCardModalVisible}
        acquireFn={addCardToCurrentPlayer}/>
      <GameDetailsModal
        year={year}
        characters={GetCharacterNames(characters)}
        isVisible={gameDetailsVisible}
        displayFn={setGameDetailsVisible}/>
      </ScrollView>
    );

    function findPlayer(characterId: number){
      return players.find((player) => player.character.id == characterId);
    }

    function GetCurrentPlayerName(){
      return GetCharacterName(characters[currentPlayer]);
    }

    function GetCharacterNames(ids: number[]){
      let names = ids.map((id) => GetCharacterName(id));
      let returnValue = "";
      names.forEach((name) => returnValue = returnValue + " " + name);
      return returnValue;
    }

    function GetCharacterName(characterId: number){
      return charactersData[characterId-1].name;
    }

    function EndTurn(){
      //In the future: reduce current player's hand to zero, draw 5 cards, shuffle discards if necessary, update
      if((playerCount - 1) == currentPlayer){
        setCurrentPlayer(0);
      }else{
        setCurrentPlayer(currentPlayer+1);
      }

      let difference = shelfLimit - store.shelf.length;
      if(difference > 0){
        for(let i = 0; i < difference; i++){
          addToShelf();
        }
      }

      setTurnCount(turnCount+1);
    }

    function addToShelf(){
      if(store.shelf.length < shelfLimit){
        store.shelf.push(store.drawPile.pop());
      }
      forceUpdate();
    }

    function acquireCard(id: string){
      let card = store.shelf.filter((card: CardProps) => card.id == id)[0];
      setAcquiredCard(card);
      setAcquireCardModalVisible(true);
    }

    function addCardToCurrentPlayer(whereToPlaceCard: string){
      let id = characters[currentPlayer];
      let player = findPlayer(id);
      if(whereToPlaceCard == "Discard"){
        player?.discardPile.push(acquiredCard);
      }else if(whereToPlaceCard == "Draw"){
        player?.drawPile.push(acquiredCard);
      }else{
        player?.hand.push(acquiredCard);
      }
      store.shelf = store.shelf.filter((card: CardData) => card.id != acquiredCard.id);
    }

    function CreateStore(year: number){
      let i = 1;
      let deck: CardData[][] = [];
      for(;i <= year; i++){
        deck.push(createDeck(Cards.hogwartsCards[i]))
      }
      let finalDeck = shuffleCards(deck.flat());
      
      return {drawPile: finalDeck, shelf: []};
    }

    function CreateDarkArtsCards(year: number){
      let i = 1;
      let deck: DarkArtsData[][] = [];
      for(;i <= year; i++){
        deck.push(createDarkArtsDeck(Cards.darkArtsCards[i]))
      }
      let finalDeck = shuffleCards(deck.flat());
      
      return {drawPile: finalDeck, discardPile: []};
    }

    function SetupPlayers(characters: number[]){
      return characters.map((characterId) => CreatePlayer(characterId));
    }
    
    function CreatePlayer(characterId: number){
      let player : PlayerProps = {
        character: {
          id: characterId,
          name: GetCharacterName(characterId)
        },
        drawPile: shuffleCards(createDeck(Cards.starterCards[characterId])),
        hand: [],
        discardPile: [],
        isActive: false,
        drawFn: drawPlayerCard,
        drawDiscardFn: drawDiscard,
        discardFn: discardCard
      };
      return player;
    }

    function drawPlayerCard(characterId : number){
      let drawingPlayer = findPlayer(characterId);
      if (drawingPlayer != undefined){
        if(drawingPlayer.drawPile.length > 0){
          drawingPlayer.hand.push(drawingPlayer.drawPile.pop());
        }else{
            if(drawingPlayer.discardPile.length < 1){
                console.log("Unable to draw because draw and discard piles are empty");
            }else{
                restoreDrawPile(drawingPlayer);
                drawingPlayer.hand.push(drawingPlayer.drawPile.pop());
            }
        }
      }
      forceUpdate();
    }

  function restoreDrawPile(player: PlayerProps){
      shuffleCards(player.discardPile).map((card) => player.drawPile.push(card));//Does this always put it on top? Might be bad if there is a leftover card on the draw pile? Might be okay though if we force the user to press the draw button always.
      player.discardPile = [];
  }

  function restoreDarkArtsDeck(){
    shuffleCards(darkArtsCards.discardPile).map((card) => darkArtsCards.drawPile.push(card));
    darkArtsCards.discardPile = [];
  }

  function discardCard(id: string, characterId: number) {
      let player = findPlayer(characterId);
      if(player != undefined){
        let playedCard = player.hand.filter((card: CardData) => card.id == id);
        player.discardPile.push(playedCard[0]);
        player.hand = player.hand.filter((card: CardData) => card.id != id);
      }
      forceUpdate()
  }

  function drawDiscard(id: string, characterId: number) {
    let player = findPlayer(characterId);
    if(player != undefined){
      let playedCard = player.discardPile.filter((card: CardData) => card.id == id);
      player.hand.push(playedCard[0]);
      player.discardPile = player.discardPile.filter((card: CardData) => card.id != id);
    }
    forceUpdate()
  }

  function drawDarkArtsCard(){
    if(darkArtsCards.drawPile.length > 0){
      darkArtsCards.discardPile.push(darkArtsCards.drawPile.pop());
    }else{
        if(darkArtsCards.discardPile.length < 1){
            console.log("Unable to draw because draw and discard piles are empty");
        }else{
            restoreDarkArtsDeck();
            darkArtsCards.discardPile.push(darkArtsCards.drawPile.pop());
          }
    }
    forceUpdate();
  }
}

export default GamePage;