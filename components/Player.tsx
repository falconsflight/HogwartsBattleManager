import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ToastAndroid, Button } from 'react-native'
import * as Colors from '../lib/Colors'
import Card from './Card';
import { CardProps } from '../models/CardProps';
import { PlayerProps } from '../models/PlayerProps';
import { CardData } from '../models/CardData';

const Player = (props: PlayerProps) => {
    const name = props.character.name;

    const renderHand = () =>{
        if (props.hand.length > 0) {
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
                {props.hand.map((card) => CreateCard(card))}
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
                title={"Draw (" + props.drawPile.length + ")"}
                onPress={() => {props.drawFn(props.character.id)}}
            />
            </View>
            {renderHand()}
            <Button
                title={"Discards (" + props.discardPile.length + ")"}
                onPress={() => {/* add logic here for modal to show discards in order*/}}
            />
        </View>
    );
      
      function CreateCard(card: CardData){
          return (
            <>
            <Card id={card.id} playerId={props.character.id} name={card.name} description={card.description} type={card.type} cost={card.cost} discardFn={props.discardFn}></Card>
            </>
          )
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