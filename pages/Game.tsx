import React, { useState } from 'react';
import {
  Button,
  ScrollView,
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
    const store = CreateStore(year);
    
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View>
            <Text>Game Details:</Text>
            <Text>Your selected characters are: {JSON.stringify(characters)}</Text>
            <Text>Your selected year is: {year}</Text>
          </View>
          {store}
          <Text>{GetCharacterName(characters[currentPlayer]-1)}'s turn</Text>
          <Button
            title="End Turn"
            onPress={() => {EndTurn()}}
          />
            {players}
        </View>
      </ScrollView>
    );

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

    function CreateStore(year: number){
      let i = 1;
      let deck: CardProps[][] = [];
      for(;i <= year; i++){
        deck.push(createDeck(Cards.hogwartsCards[i]))
      }
      let finalDeck = shuffleCards(deck.flat());
      
      return <Store cards={finalDeck} acquireFn={acquireCard}></Store>
    }

    function acquireCard(){

    }
    
    function SetupPlayers(characters: number[]){
      return characters.map((characterId) => CreatePlayer(characterId));
    }
    
    function CreatePlayer(characterId: number){
      return <><Player character={charactersData[characterId-1]}></Player></>
    }
}

export default GamePage;