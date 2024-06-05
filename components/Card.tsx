/*
Things on a card:
- Type
- Image (might not be necessary here)
- Color
- Name
- Cost
- Description
*/

import { View, Text, Image, StyleSheet } from 'react-native'
import * as Colors from '../lib/Colors'

//Use later instead of individual parameters
type CardProps = {
    name: string,
    description: string,
    type: string,
    cost: number
}

const Card = ({name, description, type, cost}: {name: string, description: string, type: string, cost: number}) => {
    return(
        <View style={[styles.playerCard, {backgroundColor: GetColorForType(type)}]}>
            <Text style={styles.nameText}>
                {name}
            </Text>
            <Text>{description}</Text>
            <Text>{cost}</Text>
        </View>
    );
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