import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'
import * as Colors from '../lib/Colors'
import Card from './Card';
import { PlayerProps } from '../models/PlayerProps';
import { CardData } from '../models/CardData';

const Player = (props: PlayerProps) => {
    const name = props.character.name;

    return(
        <View style={[styles.playerBoard,{ flex: 1, flexWrap: "wrap", flexDirection: "column", padding: 10, justifyContent: 'center', alignItems: 'center'}]}>
            <View style={{flex:1}}>
            <Text style={{fontSize:25}}>{name}</Text>
            </View>
            <View style={{flex:1}}>
            <Button
                title={"Draw (" + props.drawPile.length + ")"}
                onPress={() => {props.drawFn(props.character.id)}}
            />
            </View>
            {renderHand(props.hand, props.character.id, props.discardFn)}
            <Button
                title={"Discards (" + props.discardPile.length + ")"}
                onPress={() => {/* add logic here for modal to show discards in order*/}}
            />
        </View>
    );
}

const renderHand = (hand: Readonly<CardData[]>, playerId: Readonly<number>, discardFn: Readonly<Function>) =>{
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
            {hand.map((card) => renderCard(card, playerId, discardFn))}
            </View>
        );
      }
      return null;
}

const renderCard = (card: Readonly<CardData>, playerId: Readonly<number>, discardFn: Readonly<Function>) =>{
    return (
        <Card
        id={card.id}
        playerId={playerId}
        name={card.name}
        description={card.description}
        type={card.type}
        cost={card.cost}
        discardFn={discardFn}/>
      )
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