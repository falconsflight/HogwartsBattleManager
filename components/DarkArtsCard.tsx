import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import * as Colors from '../lib/Colors'
import { DarkArtsCardProps } from '../models/DarkArtsCardProps';

const DarkArtsCard = (props: DarkArtsCardProps) => {
    if(props.description == ""){
        return(
            <View id={props.id} style={[styles.playerCard]}>
                <Text style={styles.nameText}>
                    {props.name}
                </Text>
            </View>
        );
    }else{
        return(
            <View id={props.id} style={[styles.playerCard]}>
                <Text style={styles.nameText}>
                    {props.name}
                </Text>
                <View style={styles.descriptionBox}>
                    <Text style={styles.descriptionText}>
                        {props.description}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
    playerCard:{
        padding: 5,
        borderRadius: 5,
        margin: 5,
        elevation: 10,
        width: 150,
        minHeight: 100,
        backgroundColor: "black"
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

export default DarkArtsCard;