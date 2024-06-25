import { StyleSheet } from "react-native";
import * as Colors from '../lib/Colors'

export const gameStyle = StyleSheet.create({
    text:{
        color: Colors.LightBlack
    },
    tokenText:{
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.LightBlack,
        padding: 5
    }
});