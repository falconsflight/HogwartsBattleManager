import { View, Text, StyleSheet, Button } from 'react-native'
import * as Colors from '../lib/Colors'
import { LocationProps } from '../models/LocationProps';

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

    const renderPlusMinus = () => {
        return (
          <View style={{flexDirection: 'row'}}>
              <View>
                <View style={{flex: 1, flexDirection: "row"}}>
                  <Button
                    title="+"
                    onPress={() => {props.updateControl(1)}}
                  />
                  <Button
                    title="-"
                    onPress={() => {props.updateControl(-1)}}
                  />
                </View>
              </View>
            </View>
        );
      }

    return(        
        <View style={{flex: 1,
            flexDirection: "row",
            justifyContent: 'center', 
            alignItems: 'center'}}>
            {renderPlusMinus()}
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