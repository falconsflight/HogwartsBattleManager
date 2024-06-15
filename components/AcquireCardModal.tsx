import { View, Text, StyleSheet, Modal, Pressable } from 'react-native'
import { AcquireCardProps } from '../models/AcquireCardProps';

const AcquireCardModal = (props: AcquireCardProps) => {
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
            <Text style={styles.modalText}>Please choose where to place {props.cardName} for {props.playerName}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {props.acquireFn("Discard"); props.displayFn(!modalVisible)}}>
              <Text style={styles.textStyle}>{props.playerName}'s Discard pile</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {props.acquireFn("Draw"); props.displayFn(!modalVisible)}}>
              <Text style={styles.textStyle}>{props.playerName}'s Draw Pile</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => props.displayFn(!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
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
      fontSize: 25
    },
});

export default AcquireCardModal;