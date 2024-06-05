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
    
    //Move all of this setup inside of Player
    //Need to pass in character information
    function SetupPlayers(characters: number[]){
      const starterCards = require('../lib/StarterCards.json');
      return characters.map((characterId) => CreatePlayer(characterId, starterCards[characterId]));
    }
    
    function CreatePlayer(characterId: number, starterCards:[]){
      let name = charactersData[characterId-1].name;
      let startingDeck = CreatePlayerDeck(starterCards);
      return <Player name={name} startingDeck={startingDeck}></Player>
    }
    
    function CreatePlayerDeck(starterCards:[]){
      let deck = [];
      let i = 0;
      starterCards.forEach((card) => {
        if(card.count > 1){
          for (let i=0; i< card.count; i++){
            deck.push(CreateCard(card.name, card.description, card.type, 0));
          }
        }else{
          deck.push(CreateCard(card.name, card.description, card.type, 0));
        }
        });
      return shuffle(deck);
    }
    
    function CreateCard(name: string, description: string, type:string, cost: number){
        return (
          <>
          <Card name={name} description={description} type={type} cost={cost}></Card>
          </>
        )
    }
}

export default GamePage;