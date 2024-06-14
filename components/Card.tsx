import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import * as Colors from '../lib/Colors'
import { CardProps } from '../models/CardProps';

const Card = (props: CardProps) => {
    return(
        //Maybe we move "Touchable" higher up to Player/Gallery/ect... then you don't have to pass a discard function down
        <TouchableOpacity onPress={() => props.discardFn(props.id, props.playerId)}>
        <View id={props.id} style={[styles.playerCard, {backgroundColor: GetColorForType(props.type)}]}>
            <Text style={styles.nameText}>
                {props.name}
            </Text>
            {/* Move description to a modal onlongpress?*/}
            <View style={styles.descriptionBox}>
                <Text style={styles.descriptionText}>
                    {props.description}
                </Text>
                {showCost(props.cost)}
            </View>
            
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
        elevation: 10,
        width: 150,
        minHeight: 100
    },
    nameText:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: "black"
    },
    descriptionBox:{
        backgroundColor: Colors.CardDescription,
        borderRadius: 5,
        borderWidth: 1,
    },
    descriptionText:{
        textAlign: 'center',
        fontWeight: "semibold"
    },
    costText:{
        margin: 2,
        height: 20,
        width: 20,
        borderWidth: 2,
        borderRadius: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: "black"
    }
});

export default Card;