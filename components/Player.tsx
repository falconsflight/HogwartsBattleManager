import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native'
import * as Colors from '../lib/Colors'
import Card from './Card';
import { PlayerProps } from '../models/PlayerProps';
import { CardData } from '../models/CardData';
import TouchableCard from './TouchableCard';
import { nullFunction } from '../lib/UtilityFunctions';

const Player = (props: PlayerProps) => {
    const [showDiscards, setShowDiscards] = useState(false);
    const [showTopCard, setShowTopCard] = useState(false);
    let playFunction = props.isActive ? props.playFn : nullFunction;

    //Need to move health and influence and attacks to player props so the game can manage
    //those resources: Keep turn logs, update player tokens during end of a turn,
    //maybe in the future have playing a card actually perform the action it allows you to (with respect to tokens)

    const renderCards = (hand: Readonly<CardData[]>, pressFn: Readonly<Function>, longPressFn: Readonly<Function>) =>{
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
                {hand.map((card) => renderTouchableCard(card, props.character.id, pressFn, longPressFn))}
                </View>
            );
          }
          return null;
    }
    
    const renderDiscards = (cards: Readonly<CardData[]>, pressFn: Readonly<Function>) =>{
        if (showDiscards) {
            return renderCards(cards, pressFn, nullFunction);
          }
          return null;
    }

    const renderTopCard = (deck: Readonly<CardData[]>, playerId: Readonly<number>) => {
        if(showTopCard){
            if(deck.length > 0){
                let card = deck[deck.length-1];
                return renderCard(card, playerId)
            }
        }
        return null;
    }
    
    const renderName = () =>{
        let display = props.isActive ? props.character.name + "'s Turn" : props.character.name;
        display += props.health == 0 ? "\n" + props.character.name + " is stunned!" : "";
        return(
            <View style={{flex:1}}>
                <Text style={styles.nameText}>{display}</Text>
            </View>
        );
    }
    
    return(
        <View style={[styles.playerBoard,
        { 
            backgroundColor: 
                props.health == 0 ? Colors.PlayerStunned : 
                props.isActive ? Colors.Gray : Colors.LightGray,
            flex: 1, 
            flexWrap: "wrap", 
            flexDirection: "column", 
            padding: 10, 
            justifyContent: 'center', 
            alignItems: 'center'
        }]}>
            {renderName()}
            <View style={{flexDirection: 'row'}}>
            {renderHealth(props.health, props.character.id, props.updateHealth)}
            {renderInfluence(props.influence, props.character.id, props.updateInfluence)}
            </View>
            <View style={{flex:1, marginBottom: 5}}>
            <Button
                title={((getShowOrHideText(showTopCard)))+" top card"}
                onPress={() => {setShowTopCard(!showTopCard)}}
            />
            {renderTopCard(props.drawPile, props.character.id)}
            <Button
                title={"Draw (" + props.drawPile.length + ")"}
                onPress={() => {props.drawFn(props.character.id)}}
            />
            </View>
            <Text style={styles.howToPlayText}>Press: Play Card</Text>
            <Text style={styles.howToPlayText} >Press and Hold: Discard Card</Text>
            {renderCards(props.hand, playFunction, props.discardFn)}
            <Button
                title={(getShowOrHideText(showDiscards))
                    +" Discards (" + props.discardPile.length + ")"}
                onPress={() => {setShowDiscards(!showDiscards)}}
            />
            {renderDiscards(props.discardPile, props.drawDiscardFn)}
        </View>
    );
}

function getShowOrHideText(flag: boolean){
    return flag ? "Hide" : "Show";
}

const renderHealth = (health: number, playerId: number, updateHealth: Function) => {
    return (
        <View style={{flex: 1,
            flexDirection: "column", 
            padding: 10, 
            justifyContent: 'center', 
            alignItems: 'center'}}>
            <Text style={styles.tokenText}>❤️ {health}</Text>
            <View style={{flex: 1, flexDirection: "row"}}>
                    <View style={{marginRight: 3}}>
                        <Button
                        title={"+ 1"}
                        onPress={() => {if(health < 10)updateHealth(playerId, health+1)}}
                        />
                    </View>
                    <View style={{marginRight: 3}}>
                        <Button
                        title={"+ 2"}
                        onPress={() => {
                            if(health < 9){updateHealth(playerId, health+2)}else{updateHealth(playerId, 10)}
                            }}
                        />
                    </View>
                    <View style={{marginRight: 3}}>
                        <Button
                            title={"- 1"}
                            onPress={() => {if(health > 0)updateHealth(playerId, health-1)}}
                        />
                    </View>
                    <Button
                        title={"- 2"}
                        onPress={() => {
                            if(health > 1){updateHealth(playerId, health-2)}else{updateHealth(playerId, 0)}
                            }}
                    />
            </View>
            <View style={{marginTop: 3}}>
                <Button
                    title={"Reset"}
                    onPress={() => {updateHealth(playerId, 10)}}
                />
            </View>
        </View>
    );
}

const renderInfluence = (influence: number, playerId: number, updateInfluence: Function) =>{
    return (
        <View style={{flex: 1,
            flexDirection: "column", 
            padding: 10, 
            justifyContent: 'center', 
            alignItems: 'center'}}>
            <Text style={styles.tokenText}>🪙 {influence}</Text>
            <View style={{flex: 1, flexDirection: "row"}}>
                <View style={{marginRight: 3}}>
                    <Button
                    title={"+ 1"}
                    onPress={() => {updateInfluence(playerId, influence+1)}}
                    />
                </View>
                <View style={{marginRight: 3}}>
                    <Button
                    title={"+ 2"}
                    onPress={() => {updateInfluence(playerId, influence+2)}}
                    />
                </View>
                <View style={{marginRight: 3}}>
                <Button
                    title={"- 1"}
                    onPress={() => {if(influence > 0)updateInfluence(playerId, influence-1)}}
                />
                </View>
            </View>
            <View style={{marginTop: 3}}>
                <Button
                    title={"Reset"}
                    onPress={() => {updateInfluence(playerId, 0)}}
                />
            </View>
        </View>
    );
}

const renderTouchableCard = (
    card: Readonly<CardData>,
    playerId: Readonly<number>,
    pressFn: Readonly<Function>,
    longPressFn: Readonly<Function>) => {
    return (
        <TouchableCard
        id={card.id}
        playerId={playerId}
        name={card.name}
        description={card.description}
        type={card.type}
        cost={card.cost}
        pressFn={pressFn}
        longPressFn={longPressFn}/>
      )
}

const renderCard = (
    card: Readonly<CardData>,
    playerId: Readonly<number>) =>{
    return (
        <Card
        id={card.id}
        playerId={playerId}
        name={card.name}
        description={card.description}
        type={card.type}
        cost={card.cost}/>
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
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.LightBlack
    },
    tokenText:{
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.LightBlack,
        padding: 5
    },
    howToPlayText:{
        color: Colors.LightBlack
    }
});

export default Player;