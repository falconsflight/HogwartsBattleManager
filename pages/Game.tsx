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

const GamePage = ({ route, navigation}) => {
    const { characters, year } = route.params;
    const playerCount = characters.length;
    const charactersJson = require('../Characters.json');
    const charactersData = charactersJson.characters;
    const [ currentPlayer, setCurrentPlayer ] = useState(0);
    const players = SetupPlayers(characters);
    const shelfLimit = 6;
    const [storeShelf, setStoreShelf] = useState([]);
    const [storeStock, setStoreStock] = useState(CreateStore(year));
    const [modalVisible, setModalVisible] = useState(false);
    let acquiredCard = "";
    storeStock.map((card) => console.log(card.name));
    
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View>
            <Text>Game Details:</Text>
            <Text>Your selected characters are: {JSON.stringify(characters)}</Text>
            <Text>Your selected year is: {year}</Text>
          </View>
          <Store drawPile={storeStock} shelf={storeShelf} drawFn={addToShelf} acquireFn={acquireCard}></Store>
          <Text>{GetCurrentPlayerName()}'s turn</Text>
          <Button
            title="End Turn"
            onPress={() => {EndTurn()}}
          />
            {players}
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
            <Text style={styles.modalText}>Please choose where to place {acquiredCard} for {GetCurrentPlayerName()}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Draw pile</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hand</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Discard pile</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      </ScrollView>
    );

    function GetCurrentPlayerName(){
      return GetCharacterName(characters[currentPlayer]-1);
    }

    function GetCharacterNames(ids: number[]){
      let names = "";
      ids.map((id) => GetCharacterName(id));
      return "";
    }

    function GetCharacterName(characterId: number){
      return charactersData[characterId].name;
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
      acquiredCard = storeShelf.filter((card: CardProps) => card.id == id)[0];
      //need to add acquiredCard to player's hand, draw pile, or discard pile
      setModalVisible(true);
      setStoreShelf(storeShelf.filter((card: CardProps) => card.id != id));
    }
    
    function SetupPlayers(characters: number[]){
      return characters.map((characterId) => CreatePlayer(characterId));
    }
    
    function CreatePlayer(characterId: number){
      return <><Player character={charactersData[characterId-1]}></Player></>
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