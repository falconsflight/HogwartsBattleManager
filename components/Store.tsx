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
import { View, Text, Image, StyleSheet, TouchableOpacity, ToastAndroid, Button } from 'react-native'
import * as Colors from '../lib/Colors'
import Card from './Card';
import { StoreProps } from '../models/StoreProps';
import { CardProps } from '../models/CardProps';

const Store = (props: StoreProps) => {
    let drawPile = props.drawPile;
    let shelf = props.shelf;
    return(
        <View style={[styles.playerBoard,{ flex: 1, flexWrap: "wrap", flexDirection: "column", padding: 10, justifyContent: 'center', alignItems: 'center'}]}>
            <View style={{flex:1}}>
            <Text>Store (Only 6 Cards allowed)</Text>
            </View>
            <View style={{flex:1}}>
            <Button
                title={"Draw (" + drawPile.length + ")"}
                onPress={() => {props.drawFn()}}
            />
            </View>
            {shelf.map((card: CardProps) => CreateCard(card))}
        </View>
    );

    function CreateCard(card: CardProps){//might need to add cost to CardProps eventually
        return (
          <>
          <Card id={card.id} name={card.name} description={card.description} type={card.type} cost={card.cost} discardFn={props.acquireFn}></Card>
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
export default Store;