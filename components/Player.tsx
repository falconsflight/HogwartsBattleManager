import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ToastAndroid, Button } from 'react-native'
import * as Colors from '../lib/Colors'
import Card from './Card';

type CharacterData = {
    id: number,
    name: string
}

type PlayerProps = {
    character: CharacterData
}

type CardProps = {
    name: string,
    description: string,
    count: number,
    type: string,
    id: string
}

const Player = (props: PlayerProps) => {
    const name = props.character.name;
    const handDrawLimit = 5;
    const [test, setTest] = useState(0);
    const [drawPile, setDrawPile] = useState(CreatePlayerDeck(props.character.id));
    const [hand, setHand] = useState([]);
    const [discardPile, setDisCardPile] = useState([]);

    const renderHand = () =>{
        if (hand.length > 0) {
            return (
                <View style={[
                    styles.handView, 
                    { 
                        flex: 1, 
                        flexWrap: "wrap", 
                        flexDirection: "row", 
                        padding: 10, 
                        justifyContent: 'center', 
                        alignItems: 'center'
                    }]
                }>
                {hand.map((card) => CreateCard(card))}
                </View>
            );
          }
          return null;
    }

    return(
        <View style={[styles.playerBoard,{ flex: 1, flexWrap: "wrap", flexDirection: "column", padding: 10, justifyContent: 'center', alignItems: 'center'}]}>
            <View style={{flex:1}}>
            <Text>{name}</Text>
            </View>
            <View style={{flex:1}}>
            <Button
                title={"Draw (" + drawPile.length + ")"}
                onPress={() => {drawFromDrawPile(); setTest(test+1)}}
            />
            </View>
            {renderHand()}
            <Button
                title={"Discards (" + discardPile.length + ")"}
                onPress={() => {/* add logic here for modal to show discards in order*/}}
            />
        </View>
    );

    function fillHand(){
        let tempHand = [];
        for(let i = 0; i < handDrawLimit; i++){
            tempHand.push(drawFromDrawPile());
        }
        return tempHand;
    }

    function drawFromDrawPile(){
        if(drawPile.length > 0){
            hand.push(drawPile.pop());
        }else{
            if(discardPile.length < 1){
                console.log("Unable to draw because draw and discard piles are empty");
                toast("Unable to draw because draw and discard piles are empty");
            }else{
                restoreDrawPile();
                hand.push(drawPile.pop());
            }
        }
    }

    function restoreDrawPile(){
        shuffle(discardPile).map((card) => drawPile.push(card));//Does this always put it on top? Might be bad if there is a leftover card on the draw pile? Might be okay though if we force the user to press the draw button always.
        setDisCardPile([]);
    }

    function addToDiscardPile(id: string) {
        let playedCard = hand.filter((card: CardProps) => card.id == id);
        discardPile.push(playedCard[0]);
        discardPile.map((card: CardProps) => console.log("In discard pile " + card.id));
        setHand(hand.filter((card: CardProps) => card.id != id));
    }

    function shuffle(deck: []){
        let i = deck.length - 1;
        for (; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          let temp = deck[i];
          deck[i] = deck[j];
          deck[j] = temp;
        }
        return deck;
      };
      
      /*
      To better manage the cards, I think they should be
      kept in json format and passed around/used like that.
      When displaying is when we'll need to create the 
      components.
      */
      function CreatePlayerDeck(characterId: number){
        let deck = [];
        let i = 0;
        let starterCards = require('../lib/StarterCards.json');
        let starterDeck = starterCards[characterId];

        starterDeck.forEach((card: CardProps) => {
          if(card.count > 1){
            for (let i=0; i< card.count; i++){
                deck.push({
                    name: card.name,
                    description: card.description,
                    count: card.count,
                    type: card.type,
                    id: card.name + i
                });
            }
          }else{
            card.id = card.name;
            deck.push(card);
          }
          });
        return shuffle(deck);
      }
      
      function CreateCard(card: CardProps){//might need to add cost to CardProps eventually
          return (
            <>
            <Card id={card.id} name={card.name} description={card.description} type={card.type} cost={0} discardFn={addToDiscardPile}></Card>
            </>
          )
      }

      function toast(message:string){
        ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.CENTER);
      }
}

const styles = StyleSheet.create({
    playerBoard:{
        padding: 5,
        borderRadius: 5,
        margin: 5,
        elevation: 5,
        backgroundColor: Colors.Gray
    },
    handView:{
        backgroundColor: Colors.White
    },
    nameText:{
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

export default Player;