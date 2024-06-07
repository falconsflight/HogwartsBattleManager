import React, { useState } from 'react';
import {
  Button,
  ScrollView,
  Text,
  View
} from 'react-native';
import Card from '../components/Card';
import Player from '../components/Player';

/*
TODO:
- Card
- Deck (array of cards)
- Pile (draw, discard)
- Draw action
- Discard action
- Shuffle
- Load cards from json file
*/

const GamePage = ({ route, navigation}) => {
    const { characters, year } = route.params;
    const playerCount = characters.length;
    const charactersJson = require('../Characters.json');
    const charactersData = charactersJson.characters;
    const [ currentPlayer, setCurrentPlayer ] = useState(0);
    const players = SetupPlayers(characters);
    
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Your selected characters are: {JSON.stringify(characters)}</Text>
          <Text>Your selected year is: {year}</Text>
          <Text>{charactersData[characters[currentPlayer]-1].name}'s turn {currentPlayer}</Text>
          <Button
            title="End Turn"
            onPress={() => {EndTurn()}}
          />
            {players}
        </View>
      </ScrollView>
    );

    function EndTurn(){
      //reduce current player's hand to zero, draw 5 cards, shuffle discards if necessary, update
      if((playerCount - 1) == currentPlayer){
        setCurrentPlayer(0);
      }else{
        setCurrentPlayer(currentPlayer+1);
      }
    }

    function shuffle(deck: []){
      let i = deck.length - 1;
      for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
      }
      return deck;
    };
    
    function SetupPlayers(characters: number[]){
      return characters.map((characterId) => CreatePlayer(characterId));
    }
    
    function CreatePlayer(characterId: number){
      return <><Player character={charactersData[characterId-1]}></Player></>
    }
}

export default GamePage;