import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native'
import * as Colors from '../lib/Colors'
import { GameDetailsProps } from '../models/GameDetailsProps';

const GameDetailsModal = (props: GameDetailsProps) => {
    let modalVisible = props.isVisible;

    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          props.displayFn(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <View>
            <Text style={{textAlign: "center", fontSize: 25}}>Game Details</Text>
            <Text>Your selected characters are: {props.characters}</Text>
            <Text>Your selected year is: {props.year}</Text>
            <Text style={{textDecorationLine: "underline"}}>Legend:</Text>
            <Text>❤️: Heart</Text>
            <Text>⚡: Attack token</Text>
            <Text>🪙: Influence token</Text>
            <Text>🛑: Villan Control token</Text>
            <Text>🟥: Gryfinndor Die</Text>
            <Text>🟩: Syltherin Die</Text>
            <Text>🟦: Ravenclaw Die</Text>
            <Text>🟨: Hufflepuff Die</Text>
          </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => props.displayFn(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
}
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      margin: 3
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
});

export default GameDetailsModal;