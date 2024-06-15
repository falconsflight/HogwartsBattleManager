import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'
import * as Colors from '../lib/Colors'
import Card from './Card';
import { PlayerProps } from '../models/PlayerProps';
import { CardData } from '../models/CardData';

const Player = (props: PlayerProps) => {
    const [showDiscards, setShowDiscards] = useState(false);
    const [showTopCard, setShowTopCard] = useState(false);
    const name = props.character.name;

    return(
        <View style={[styles.playerBoard,
        { 
            backgroundColor: props.isActive ? Colors.Gray : Colors.InactivePlayer,
            flex: 1, 
            flexWrap: "wrap", 
            flexDirection: "column", 
            padding: 10, 
            justifyContent: 'center', 
            alignItems: 'center'
        }]}>
            {renderName(name, props.isActive)}
            <View style={{flex:1, marginBottom: 5}}>
            <Button
                title={((getShowOrHideText(showTopCard)))+" top card"}
                onPress={() => {setShowTopCard(!showTopCard)}}
            />
            {renderTopCard(showTopCard, props.drawPile, props.character.id)}
            <Button
                title={"Draw (" + props.drawPile.length + ")"}
                onPress={() => {props.drawFn(props.character.id)}}
            />
            </View>
            {renderCards(props.hand, props.character.id, props.discardFn)}
            <Button
                title={(getShowOrHideText(showDiscards))
                    +" Discards (" + props.discardPile.length + ")"}
                onPress={() => {setShowDiscards(!showDiscards)}}
            />
            {renderDiscards(showDiscards, props.discardPile, props.character.id, props.drawDiscardFn)}
        </View>
    );
}

function getShowOrHideText(flag: boolean){
    return flag ? "Hide" : "Show";
}

function nullFunction(){}

const renderTopCard = (showTopCard: boolean, deck: Readonly<CardData[]>, playerId: Readonly<number>) => {
    if(showTopCard){
        if(deck.length > 0){
            return renderCard(deck[deck.length-1], playerId, nullFunction);
        }
    }
    return null;
}

const renderName = (name: string, isActive: boolean) =>{
    let display = isActive ? name + "'s Turn" : name;
    return(
        <View style={{flex:1}}>
            <Text style={{fontSize:25}}>{display}</Text>
        </View>
    );
}

const renderCards = (hand: Readonly<CardData[]>, playerId: Readonly<number>, discardFn: Readonly<Function>) =>{
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

const renderDiscards = (show: boolean, cards: Readonly<CardData[]>, playerId: Readonly<number>, discardFn: Readonly<Function>) =>{
    if (show) {
        return renderCards(cards, playerId, discardFn);
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
        elevation: 5
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