import { View, Text, StyleSheet, Button, Pressable } from 'react-native'
import * as Colors from '../lib/Colors'
import { gameStyle } from '../lib/GameStyle';
import { VillainProps } from '../models/VillainProps';

const Villain = (props: VillainProps) => {

    return(  
        <View style={{flex: 1,
            flexDirection: "column",
            justifyContent: 'center', 
            alignItems: 'center'}}>
            <View style={{flex: 1,
                flexDirection: "row",
                justifyContent: 'center', 
                alignItems: 'center'}}>
                <Text style={gameStyle.tokenText}>❤️ {props.villain.health}</Text>
                <Text style={gameStyle.tokenText}>⚡ {props.attacks}</Text>
            </View>
            <Pressable
            onPress={() => props.healthFn(props.id, 1)}
            onLongPress={() => props.healthFn(props.id, -1)}
            >
            <View style={[styles.playerCard, {backgroundColor: Colors.LightBlack}]}>
                <Text style={styles.nameText}>
                    {props.villain.name}
                </Text>
                <View style={styles.descriptionBox}>
                    <Text style={styles.descriptionText}>
                        {props.villain.ability}
                    </Text>
                </View>
                <View style={styles.descriptionBox}>
                    <Text style={styles.descriptionText}>
                        {props.villain.reward}
                    </Text>
                </View>
            </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    playerCard:{
        padding: 5,
        borderRadius: 5,
        margin: 5,
        elevation: 10,
        width: 200,
        minHeight: 100,
        borderWidth: 1
    },
    nameText:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: "white"
    },
    descriptionBox:{
        backgroundColor: Colors.CardDescription,
        borderRadius: 5,
        borderWidth: 1,
    },
    descriptionText:{
        textAlign: 'center',
        fontWeight: "semibold",
        color: Colors.LightBlack
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

export default Villain;