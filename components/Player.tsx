/*
Things on a card:
- Type
- Image (might not be necessary here)
- Color
- Name
- Cost
- Description
*/
import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import * as Colors from '../lib/Colors'
import Card from './Card';

type PlayerProps = {
    name: string,
    startingDeck: []
}

const Player = (props: PlayerProps) => {
    const name = props.name;
    const handDrawLimit = 5;
    const [drawPile, setDrawPile] = useState(props.startingDeck);
    const [hand, setHand] = useState(fillHand());
    const [discardPile, setDisCardPile] = useState([]);

    return(
        <View style={[styles.playerBoard,{ flex: 1, flexWrap: "wrap", flexDirection: "column", padding: 10, justifyContent: 'center', alignItems: 'center'}]}>
            <View style={{flex:1}}>
            <Text>{name}</Text>
            </View>
            <View style={{flex:1}}>
            <TouchableOpacity  key={1} onPress={() => {setHand(fillHand())}}>
                <Text>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity  key={1} onPress={() => {setHand(fillHand())}}>
                <Text>Draw</Text>
            </TouchableOpacity>
            </View>
            <View style={{ flex: 1, flexWrap: "wrap", flexDirection: "row", padding: 10, justifyContent: 'center', alignItems: 'center'}}>
            {hand}
            </View>
        </View>
    );

    function fillHand(){
        let tempHand = [];
        for(let i = 0; i < handDrawLimit; i++){
            tempHand.push(drawCard(drawPile));
        }
        return tempHand;
    }

    function drawCard(deck:[]){
        if(deck.length > 0){
            return deck.pop();
        }else{
            //setDrawPile(shuffle(discardPile));
        }
    }

    function resetPile() {
        setDrawPile([]);
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
}

const styles = StyleSheet.create({
    playerBoard:{
        padding: 5,
        borderRadius: 5,
        margin: 5,
        elevation: 5,
        backgroundColor: Colors.Gray
    },
    nameText:{
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

export default Player;