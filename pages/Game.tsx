import React, { useReducer, useState } from 'react';
import {
  Button,
  Pressable,
  ScrollView,
  Text,
  ToastAndroid,
  View
} from 'react-native';
import Player from '../components/Player';
import {GetEmptyCardData, UpdateBoundedNumber, createDarkArtsDeck, createDeck, nullFunction, shuffleCards} from '../lib/UtilityFunctions';
import Store from '../components/Store';
import Cards from '../lib/Cards';
import GameDetailsModal from '../components/GameDetailsModal';
import { PlayerProps } from '../models/PlayerProps';
import { CardData } from '../models/CardData';
import { DarkArtsData } from '../models/DarkArtsData';
import DarkArtsCard from '../components/DarkArtsCard';
import AcquireCardModal from '../components/AcquireCardModal';
import { gameStyle } from '../lib/GameStyle';
import Characters from '../lib/Characters';
import { LocationProps } from '../models/LocationProps';
import Location from '../components/Location';
import { VillainData } from '../models/VillainData';
import { VillainProps } from '../models/VillainProps';
import Villain from '../components/Villain';

const GamePage = ({ route, navigation}) => {
    const { characters, year } = route.params;
    const playerCount = characters.length;
    const shelfLimit = 6;
    const villainLimit = [
      {year: 1, value: 1},
      {year: 2, value: 1},
      {year: 3, value: 2},
      {year: 4, value: 2},
      {year: 5, value: 3},
      {year: 6, value: 3},
      {year: 7, value: 3},
  ];
    
    const charactersJson = Characters.data;
    const charactersData = charactersJson.characters;
    const [locations] = useState(CreateLocations());
    const [villains] = useState(CreateVillains(year));
    const [activeVillains, setActiveVillains] = useState([]);
    const [defeatedVillains] = useState([]);
    const [turnCount, setTurnCount] = useState(1);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [currentLocation, setCurrentLocation] = useState(0);
    const [players] = useState(SetupPlayers(characters));
    const [store] = useState(CreateStore(year));
    const [darkArtsCards] = useState(CreateDarkArtsCards(year));
    const [gameDetailsVisible, setGameDetailsVisible] = useState(false);
    const [acquireCardModalVisible, setAcquireCardModalVisible] = useState(false);
    const [acquiredCard, setAcquiredCard] = useState(GetEmptyCardData());
    const [,forceUpdate] = useReducer(x => x + 1, 0);

    const renderPlayer = (player: Readonly<PlayerProps>) => {
      return (
        <Player 
        character={player.character} 
        drawPile={player.drawPile}
        hand={player.hand}
        discardPile={player.discardPile}
        health={player.health}
        influence={player.influence}
        isActive={IsPlayerActive(player)}
        drawFn={player.drawFn}
        drawDiscardFn={player.drawDiscardFn}
        playFn={player.playFn}
        discardFn={player.discardFn}
        updateHealth={player.updateHealth}
        updateInfluence={player.updateInfluence}
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

    const renderLocation = (location: Readonly<LocationProps>) => {
      return(
        <Location 
          name={location.name}
          controlAmount={location.controlAmount}
          description={location.description}
          order={location.order}
          total={location.total}
          controlTaken={location.controlTaken}
          updateControl={UpdateVillainControl} //send like this so the current state of the game is sent during rendering and the callback will work properly
        />
      );
    }

    const renderAllHeroesButtons = () => {
      return (
        <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1,
              flexDirection: "column", 
              padding: 10, 
              justifyContent: 'center', 
              alignItems: 'center'}}>
              <Text style={gameStyle.tokenText}>❤️ All</Text>
              <View style={{flex: 1, flexDirection: "row"}}>
                <Button
                  title="+1"
                  onPress={() => {UpdateAllHeroesHealth(1)}}
                />
                <Button
                  title="-1"
                  onPress={() => {UpdateAllHeroesHealth(-1)}}
                />
              </View>
            </View>
            <View style={{flex: 1,
            flexDirection: "column", 
            padding: 10, 
            justifyContent: 'center', 
            alignItems: 'center'}}>
              <Text style={gameStyle.tokenText}>🪙 All</Text>
              <View style={{flex: 1, flexDirection: "row"}}>
                <Button
                  title="+1"
                  onPress={() => {UpdateAllHeroesInfluence(1)}}
                />
                <Button
                  title="-1"
                  onPress={() => {UpdateAllHeroesInfluence(-1)}}
                />
              </View>
            </View>
          </View>
      );
    }

    const renderVillains = () => {
      if(activeVillains.length == 0){
        setActiveVillains(UpdateActiveVillains([]));
      }
      return activeVillains.map((villain : VillainProps) => renderVillain(villain));
    }

    const renderVillain = (villain : VillainProps) => {
      return (
        <Villain
        id={villain.id}
        villain={villain.villain}
        attacks={villain.attacks}
        healthFn={UpdateVillainHealth}
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
          <Store drawPile={store.drawPile} shelf={store.shelf} credit={GetCurrentPlayer()?.influence ?? 0} drawFn={addToShelf} acquireFn={acquireCard}></Store>
          {renderLocation(GetCurrentLocation())}
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
          {renderDarkArtsCard({name: "Dark Arts Deck", description: "Click to draw\n"+darkArtsCards.drawPile.length, id: "darkArtsDraw", count: 1})}
          </Pressable>
          {renderDarkArts(darkArtsCards.discardPile)}
          </View>
          <Text style={gameStyle.text}>Press: Add ⚡</Text>
          <Text style={gameStyle.text}>Press and Hold: Remove ⚡</Text>
          <Text style={gameStyle.text}>Villains remaining: {villains.length}</Text>
          {renderVillains()}
          {renderAllHeroesButtons()}
          <Button
            title={"End Turn #"+turnCount}
            onPress={() => {EndTurn()}}
          />
          {renderPlayer(players.filter((player) => IsPlayerActive(player))[0])}
          {players.filter((player) => !IsPlayerActive(player)).map((player) => renderPlayer(player))}
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

    function IsPlayerActive(player: PlayerProps){
      return player.character.name == GetCurrentPlayerName();
    }

    function GetCurrentLocation(){
      return locations[currentLocation];
    }

    function UpdateVillainControl(delta: number){
      let location = GetCurrentLocation();
      location.controlTaken = UpdateBoundedNumber(location.controlAmount, 0, delta, location.controlTaken);
      forceUpdate();
    }

    function UpdateAllHeroesHealth(delta: number){
      players.map((player) => player.health = UpdateBoundedNumber(10, 0, delta, player.health));
      forceUpdate();
    }

    function UpdateAllHeroesInfluence(delta: number){
      players.map((player) => player.influence = player.influence + delta >= 0 ? player.influence + delta : 0);
      forceUpdate();
    }

    function UpdateHealth(characterId: number, newValue: number){
      let player = findPlayer(characterId);
      if(player != undefined){
        player.health = newValue; 
      }
      forceUpdate();
    }

    function UpdateVillainHealth(villainId: string, delta: number){
      let villain = findVillain(villainId);
      if(villain != undefined){
        villain.attacks = UpdateBoundedNumber(villain.villain.health, 0, delta, villain.attacks)
        forceUpdate();
      }
    }

    function UpdateInfluence(characterId: number, newValue: number){
      let player = findPlayer(characterId);
      if(player != undefined){
        player.influence = newValue; 
      }
      forceUpdate();
    }

    function findVillain(villainId: string){
      return activeVillains.find((villain : VillainProps) => villain.id == villainId);
    }

    function findPlayer(characterId: number){
      return players.find((player) => player.character.id == characterId);
    }

    function GetCurrentPlayerName(){
      return GetCharacterName(characters[currentPlayer]);
    }

    function GetCurrentPlayer(){
      return players.find((player) => GetCurrentPlayerName() == player.character.name);
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
      let player = GetCurrentPlayer();
      if(player != undefined){
        player.influence = 0;
      }

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

      let location = GetCurrentLocation();
      //Move to next location if this has become controlled by Villains
      if (location.controlAmount == location.controlTaken){
        if(currentLocation + 1 == locations.length){
          EndGame("Villains control everything! Game Over!");
        }
        setCurrentLocation(currentLocation + 1);
      }

      let newDefeatedVillain = activeVillains.filter((villain : VillainProps) => villain.attacks == villain.villain.health);
      if(newDefeatedVillain != undefined){
        defeatedVillains.push(newDefeatedVillain);
        if(AllVillainsDefeated()){
          EndGame("You win! You've defeated all the Villains!");
        }else{
          let newVillains = UpdateActiveVillains(activeVillains.filter((villain : VillainProps) => villain.attacks != villain.villain.health));
          setActiveVillains(newVillains);
        }
      }

      setTurnCount(turnCount+1);
    }

    function AllVillainsDefeated(){
      let hasActiveVillain = activeVillains.filter((villain : VillainProps) => villain.attacks != villain.villain.health)
      return villains.length == 0 && hasActiveVillain.length == 0;
    }

    function EndGame(message : string){
      ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.CENTER);
      navigation.popToTop();
    }

    function addToShelf(){
      if(store.shelf.length < shelfLimit){
        let card = store.drawPile.pop();
        if(card != undefined){
          store.shelf.push(card);
        }
      }
      forceUpdate();
    }

    function acquireCard(id: string){
      let card = store.shelf.filter((card: CardData) => card.id == id)[0];
      setAcquiredCard(card);
      setAcquireCardModalVisible(true);
    }

    function addCardToCurrentPlayer(whereToPlaceCard: string){
      let player = GetCurrentPlayer();
      if(player != undefined){
        if(whereToPlaceCard == "Discard"){
          player.discardPile.push(acquiredCard);
        }else if(whereToPlaceCard == "Draw"){
          player.drawPile.push(acquiredCard);
        }else{
          player.hand.push(acquiredCard);
        }
        store.shelf = store.shelf.filter((card: CardData) => card.id != acquiredCard.id);
        player.influence = player?.influence - acquiredCard.cost;
      }
    }

    function CreateStore(year: number){
      let i = 1;
      let deck: CardData[][] = [];
      for(;i <= year; i++){
        deck.push(createDeck(Cards.hogwartsCards[i]))
      }
      let finalDeck = shuffleCards(deck.flat());
      let shelf : CardData[] = [];
      i=0;
      for(;i < shelfLimit; i++){
        let card = finalDeck.pop();
        if (card != undefined){
          shelf.push(card);
        }
      }
      return {drawPile: finalDeck, shelf: shelf};
    }

    function CreateDarkArtsCards(year: number){
      let i = 1;
      let deck: DarkArtsData[][] = [];
      for(;i <= year; i++){
        deck.push(createDarkArtsDeck(Cards.darkArtsCards[i]))
      }
      let finalDeck = shuffleCards(deck.flat());
      let discardPile : CardData[] = [];
      return {drawPile: finalDeck, discardPile: discardPile};
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
        health: 10,
        influence: 0,
        drawFn: drawPlayerCard,
        drawDiscardFn: drawDiscard,
        playFn: playCard,
        discardFn: discardCard,
        updateHealth: UpdateHealth,
        updateInfluence: UpdateInfluence
      };
      return player;
    }

    function CreateLocations(){
      let input = Cards.locations[year];
      let locations : LocationProps[] = [];
      for(const element of input){
        let location : LocationProps = {
          name : element.name,
          controlAmount : element.controlAmount,
          description : element.description,
          order : element.order,
          total : element.total,
          controlTaken : 0,
          updateControl : UpdateVillainControl
        }
        locations.push(location);
      }
      return locations;
    }

    function CreateVillains(year: number){
      let villains : VillainProps[] = [];
      let villainsData : VillainData[][] = [];
      for(let i = 1;i <= year; i++){
        villainsData.push(Cards.villains[i])
      }
      let villainsDataResult = shuffleCards(villainsData.flat());

      for(const element of villainsDataResult){
        let villain : VillainProps = {
          id : element.name,
          villain : element,
          attacks : 0,
          healthFn : nullFunction
        }
        villains.push(villain);
      }
      return villains;
    }

    //pass in villain list, update, return or set
    function UpdateActiveVillains(currentVillains : VillainProps[]){
      let count = villainLimit[year-1].value;
      let currentVillainCount = currentVillains.length;
      let newActiveVillains = currentVillains;
      if(currentVillainCount < count && villains.length > 0){
        for(let i = 0; i < (count - currentVillainCount); i++){
          newActiveVillains.push(villains.pop());
        }
      }
      return newActiveVillains;
    }

    function drawPlayerCard(characterId : number){
      let drawingPlayer = findPlayer(characterId);
      if (drawingPlayer != undefined){
        if(drawingPlayer.drawPile.length > 0){
          addPlayerCardToHand(drawingPlayer);
        }else{
            if(drawingPlayer.discardPile.length < 1){
                console.log("Unable to draw because draw and discard piles are empty");
            }else{
                restoreDrawPile(drawingPlayer);
                addPlayerCardToHand(drawingPlayer);
            }
        }
      }
      forceUpdate();
    }

  function addPlayerCardToHand(player: PlayerProps){
    let card = player.drawPile.pop();
    if(card != undefined){
      player.hand.push(card);
    }
  }

  function restoreDrawPile(player: PlayerProps){
      shuffleCards(player.discardPile).map((card) => player.drawPile.push(card));//Does this always put it on top? Might be bad if there is a leftover card on the draw pile? Might be okay though if we force the user to press the draw button always.
      player.discardPile = [];
  }

  function restoreDarkArtsDeck(){
    shuffleCards(darkArtsCards.discardPile).map((card) => darkArtsCards.drawPile.push(card));
    darkArtsCards.discardPile = [];
  }

  function playCard(id: string, characterId: number){
    let player = findPlayer(characterId);
    if(player != undefined){
      sendToDiscardPile(player, id);
    }
  }

  function discardCard(id: string, characterId: number) {
      let player = findPlayer(characterId);
      if(player != undefined){
        sendToDiscardPile(player, id);
      }
  }

  function sendToDiscardPile(player: PlayerProps, id: string){
    let playedCard = player.hand.filter((card: CardData) => card.id == id);
    player.discardPile.push(playedCard[0]);
    player.hand = player.hand.filter((card: CardData) => card.id != id);
    forceUpdate();
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
      let card = darkArtsCards.drawPile.pop();
      if(card != undefined){
        darkArtsCards.discardPile.push(card);
      }
    }else{
        if(darkArtsCards.discardPile.length < 1){
            console.log("Unable to draw because draw and discard piles are empty");
        }else{
            restoreDarkArtsDeck();
            let card = darkArtsCards.drawPile.pop();
            if(card != undefined){
              darkArtsCards.discardPile.push(card);
            }
          }
    }
    forceUpdate();
  }
}

export default GamePage;