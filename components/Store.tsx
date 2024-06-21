import React from 'react';
import { View, Text, StyleSheet, Button, ToastAndroid } from 'react-native'
import * as Colors from '../lib/Colors'
import { StoreProps } from '../models/StoreProps';
import { CardData } from '../models/CardData';
import TouchableCard from './TouchableCard';
import { nullFunction } from '../lib/UtilityFunctions';
import Card from './Card';

const Store = (props: StoreProps) => {
    let drawPile = props.drawPile;
    let shelf = props.shelf;
    
    const renderCard = (card: Readonly<CardData>, playerId: Readonly<number>, discardFn: Readonly<Function>) =>{
        let pressFn = props.credit >= card.cost ? discardFn : UnableToBuyToast;
        let type = props.credit >= card.cost ? card.type : "";
        return (
            <TouchableCard
            id={card.id}
            playerId={playerId}
            name={card.name}
            description={card.description}
            type={type}
            cost={card.cost}
            pressFn={pressFn}
            longPressFn={nullFunction}/>);
    }

    return(
        <View style={[styles.playerBoard,{ flex: 1, flexWrap: "wrap", flexDirection: "column", padding: 10, justifyContent: 'center', alignItems: 'center'}]}>
            <View style={{flex:1}}>
            <Text style={styles.title}>Store</Text>
            <Text>(Only 6 Cards allowed)</Text>
            <Text>Store Credit: 🪙 {props.credit}</Text>
            </View>
            <View style={{flex:1}}>
            <Button
                title={"Draw (" + drawPile.length + ")"}
                onPress={() => {props.drawFn()}}
            />
            </View>
            <View style={{flex: 1, 
                        flexWrap: "wrap", 
                        flexDirection: "row", 
                        padding: 10, 
                        justifyContent: 'center', 
                        alignItems: 'center'}}>
            {shelf.map((card: CardData) => renderCard(card, 0, props.acquireFn))}
            </View>
        </View>
    );
}

function UnableToBuyToast(){
    ToastAndroid.show("Not enough influence to acquire!", ToastAndroid.SHORT);
}

const styles = StyleSheet.create({
    playerBoard:{
        padding: 5,
        borderRadius: 5,
        margin: 5,
        elevation: 5,
        backgroundColor: Colors.LightGray
    },
    title:{
        fontSize: 25,
        textAlign: 'center',
        color: Colors.LightBlack
    }
});
export default Store;