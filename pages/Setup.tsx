import React, { useState } from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import DropdownComponent from '../components/DropdownComponent';

function SetupPage({ navigation }) {
    const [checkBoxSelected, setCheckBoxSelected] = useState([]);
    const charactersJson = require('../Characters.json');
    const years = [
        {label: '1', value: 1},
        {label: '2', value: 2},
        {label: '3', value: 3},
        {label: '4', value: 4},
        {label: '5', value: 5},
        {label: '6', value: 6},
        {label: '7', value: 7},
    ];

    return (
      <View style={{ flex: 1, alignItems: 'stretch'}}>
        <View style={{ flex: 2}}>
            <Text style={styles.text}>Select Hogwarts Year</Text>
            <DropdownComponent data={years} dropdownLabel="Year"/>
        </View>
        <View style={{ flex: 2}}>
            <Text style={styles.text}>Select Characters</Text>
            <CheckBox props={charactersJson.characters}></CheckBox>
        </View>
        <View style={{ flex: 4, marginTop: 5}}>
            <Button
            title="Play"
            onPress={() => {
                navigation.navigate('Game', {
                    characters: checkBoxSelected,
                    year: 1
                });
            }}
            />
        </View>
        {
            /*
                Test code for when I was learning navigation...
                <Button
                title="Go to Details... again"
                onPress={() => navigation.push('Details')}
                />
                <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
                <Button title="Go back" onPress={() => navigation.goBack()} />
                <Button
                title="Go back to first screen in stack"
                onPress={() => navigation.popToTop()}
                />
            */
        }
      </View>
    );

      function ToggleCheckBox(id : number){
        if(checkBoxSelected.includes(id)){
            setCheckBoxSelected(checkBoxSelected.filter((item) => item != id));
        }else{
            setCheckBoxSelected([...checkBoxSelected, id]);
        }
      }
    
      function CheckBox(props){ 
        /*
            Test code for determining types and data for objects and arrays. 
            console.log("low type of variable is:"+typeof(props.props.characters));
            console.log("low data of variable is:"+JSON.stringify(props.props.characters));
        */
        return (
          props.props.map((val) => {
            return (
            <View style={styles.checkboxView}>
              <TouchableOpacity key={val.id} onPress={() => {ToggleCheckBox(val.id)}}>
                <View style={{
                  height: 20,
                  width: 20,
                  borderWidth: 2,
                  borderColor: '#000',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {
                    checkBoxSelected.includes(val.id) ?
                      <View style={{
                        height: 10,
                        width: 10,
                        backgroundColor: '#000',
                      }} />
                      : null
                  }
                </View>
              </TouchableOpacity>
              <Text style={styles.checkboxText}>{val.name}</Text>
            </View>
            )
          })
        );
      }
}
const styles = StyleSheet.create({
    text: {
        fontFamily: "Georgia, serif",
        fontSize:20,
        fontWeight: 'bold',
        paddingLeft: 5
    },
    checkboxText: {
        fontFamily: "Georgia, serif",
        fontSize: 16,
        paddingLeft: 5
    },
    checkboxView: {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: 'left',
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'white'
    }
  });

export default SetupPage;