import { View, Text, StyleSheet, Button, Pressable } from 'react-native'
import * as Colors from '../lib/Colors'
import { LocationProps } from '../models/LocationProps';
import { gameStyle } from '../lib/GameStyle';

const Location = (props: LocationProps) => {

    const renderControlSpaces = () =>{
        let openSpaces = "";
        let takenSpaces = "";
        for(let i = 0; i < props.controlAmount - props.controlTaken; i++){
            openSpaces += "⬜";
        }
        for(let i = 0; i < props.controlTaken; i++){
            takenSpaces += "🛑";
        }
        return(
            <Text>{takenSpaces}{openSpaces}</Text>
        );
    }

    return(        
        <View style={{flex: 1,
            flexDirection: "column",
            justifyContent: 'center', 
            alignItems: 'center'}}>
            <Text style={gameStyle.text}>Press: Add Control</Text>
            <Text style={gameStyle.text}>Press and Hold: Remove Control</Text>
            <Pressable
            onPress={() => props.updateControl(1)}
            onLongPress={() => props.updateControl(-1)}
            >
            <View style={[styles.playerCard, {backgroundColor: "green"}]}>
                <Text style={styles.nameText}>
                    {props.name}
                </Text>
                <View style={styles.descriptionBox}>
                    <Text style={styles.descriptionText}>
                        {props.description}
                    </Text>
                </View>
                <View style={styles.descriptionBox}>
                    <Text style={styles.descriptionText}>
                        {renderControlSpaces()}
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
        color: "black"
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

export default Location;