/*
Things on a card:
- Type
- Image (might not be necessary here)
- Color
- Name
- Cost
- Description
*/

import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import * as Colors from '../lib/Colors'

//Use later instead of individual parameters
type CardProps = {
    id: string,
    name: string,
    description: string,
    type: string,
    cost: number,
    discardFn: Function
}

const Card = (props: CardProps) => {
    return(
        <TouchableOpacity onPress={() => props.discardFn(props.id)}>
        <View id={props.id} style={[styles.playerCard, {backgroundColor: GetColorForType(props.type)}]}>
            <Text style={styles.nameText}>
                {props.name}
            </Text>
            {/* Move description to a modal onlongpress?*/}
            <Text style={styles.descriptionText}>
                {props.description}
            </Text>
            {showCost(props.cost)}
            {/* Add "Spell/Item/Ally plate here?*/}
        </View>
        </TouchableOpacity>
    );
}

const showCost = (cost: number) =>{
    if (cost > 0) {
        return (
            <Text style={styles.costText}>{cost}</Text>
        );
      }
      return null;
}

const GetColorForType = (type: string) => {
    switch(type){
        case("Spell"):
            return Colors.Spell;
        case("Item"):
            return Colors.Item;
        case("Ally"):
            return Colors.Ally;
        default: return Colors.CardBack;
    }
};

const styles = StyleSheet.create({
    
    playerCard:{
        padding: 5,
        borderRadius: 5,
        margin: 5,
        elevation: 10
    },
    nameText:{
        textAlign: 'center',
        fontWeight: 'bold'
    },
    descriptionText:{
        textAlign: 'center',
        backgroundColor: Colors.CardDescription
    },
    costText:{
        backgroundColor: Colors.CardDescription,
        height: 20,
        width: 20,
        borderWidth: 2,
        borderRadius: 10,
        textAlign: 'center'
    }
});

export default Card;