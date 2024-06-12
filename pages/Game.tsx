import React, { useState } from 'react';
import {
  Alert,
  Button,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Player from '../components/Player';
import {createDeck, shuffleCards} from '../lib/UtilityFunctions';
import { CardProps } from '../models/CardProps';
import Store from '../components/Store';
import Cards from '../lib/Cards';
import GameDetailsModal from '../components/GameDetailsModal';
import { CharacterProps } from '../models/CharacterProps';
import { PlayerProps } from '../models/PlayerProps';
import { CardData } from '../models/CardData';

const GamePage = ({ route, navigation}) => {
    const { characters, year } = route.params;
    const playerCount = characters.length;
    const shelfLimit = 6;
    const charactersJson = require('../Characters.json');
    const charactersData = charactersJson.characters;
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [players, setPlayers] = useState(SetupPlayers(characters));
    const [storeShelf, setStoreShelf] = useState([]);
    const [storeStock, setStoreStock] = useState(CreateStore(year));
    const [modalVisible, setModalVisible] = useState(false);
    const [gameDetailsVisible, setGameDetailsVisible] = useState(false);
    const [acquiredCard, setAcquiredCard] = useState({});
    const [test, setTest] = useState(false);
    
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
            title="Game Details"
            onPress={() => {setGameDetailsVisible(true)}}
          />
          <Store drawPile={storeStock} shelf={storeShelf} drawFn={addToShelf} acquireFn={acquireCard}></Store>
          <Text>{GetCurrentPlayerName()}'s turn</Text>
          <Button
            title="End Turn"
            onPress={() => {EndTurn()}}
          />
            {players.map((player) => DisplayPlayer(player))}
        </View>

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Please choose where to place {acquiredCard.name} for {GetCurrentPlayerName()}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {addCardToCurrentPlayer("Discard"); setModalVisible(!modalVisible)}}>
              <Text style={styles.textStyle}>Discard pile</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {addCardToCurrentPlayer("Draw"); setModalVisible(!modalVisible)}}>
              <Text style={styles.textStyle}>Draw Pile</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <GameDetailsModal year={year} characters={GetCharacterNames(characters)} isVisible={gameDetailsVisible} displayFn={setGameDetailsVisible}/>
      </ScrollView>
    );

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
    }

    function addToShelf(){
      if(storeShelf.length < shelfLimit){
          setStoreShelf([...storeShelf, storeStock.pop()])
      }
    }

    function CreateStore(year: number){
      let i = 1;
      let deck: CardProps[][] = [];
      for(;i <= year; i++){
        deck.push(createDeck(Cards.hogwartsCards[i]))
      }
      let finalDeck = shuffleCards(deck.flat());
      
      return finalDeck;
    }

    function acquireCard(id: string){
      let card = storeShelf.filter((card: CardProps) => card.id == id)[0];
      setAcquiredCard(card);
      setModalVisible(true);
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
      setStoreShelf(storeShelf.filter((card: CardProps) => card.id != acquiredCard.id));
    }
    
    function SetupPlayers(characters: number[]){
      console.log(""+characters);
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
        drawFn: drawPlayerCard,
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
      setPlayers(players);
    }

    function DisplayPlayer(player: PlayerProps){//might need to add cost to CardProps eventually
        return (
          <>
          <Player 
          character={player.character} 
          drawPile={player.drawPile}
          hand={player.hand}
          discardPile={player.discardPile}
          drawFn={player.drawFn}
          discardFn={player.discardFn}
          />
          </>
        );
    }

  function restoreDrawPile(player: PlayerProps){
      shuffleCards(player.discardPile).map((card) => player.drawPile.push(card));//Does this always put it on top? Might be bad if there is a leftover card on the draw pile? Might be okay though if we force the user to press the draw button always.
      player.discardPile = [];
  }

  function discardCard(id: string, characterId: number) {
      let player = findPlayer(characterId);
      if(player != undefined){
        let playedCard = player.hand.filter((card: CardData) => card.id == id);
        player.discardPile.push(playedCard[0]);
        player.hand = player.hand.filter((card: CardData) => card.id != id);
      }
      setTest(!test);
  }

  function findPlayer(characterId: number){
    return players.find((player) => player.character.id == characterId);
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 3
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default GamePage;