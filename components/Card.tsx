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
            <Text>{props.description}</Text>
            {showCost(props.cost)}
            
        </View>
        </TouchableOpacity>
    );
}

const showCost = (cost: number) =>{
    if (cost > 0) {
        return (
            <Text>{cost}</Text>
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
    }
});

export default Card;