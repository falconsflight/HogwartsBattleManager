import React, { useState } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ToastAndroid
} from 'react-native';
import DropdownComponent from '../components/DropdownComponent';
import CheckBox from '../components/CheckBox';
import Characters from '../lib/Characters';
import * as Colors  from '../lib/Colors';

function SetupPage({ navigation }) {
    const [checkBoxSelected, setCheckBoxSelected] = useState([]);
    const [year, setYear] = useState(1);
    const charactersJson = Characters.data;
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
        <View style={{ flex: 2, margin: 10}}>
            <Text style={styles.text}>Select Hogwarts Year</Text>
            <DropdownComponent data={years} dropdownLabel="Year" setSelection={setYear}/>
        </View>
        <View style={{ flex: 2, margin: 10}}>
            <Text style={styles.text}>Select Characters</Text>
            <CheckBox characters={charactersJson.characters} selectedBoxes={checkBoxSelected} toggleFn={ToggleCheckBox}></CheckBox>
        </View>
        <View style={{ flex: 4, marginTop: 5}}>
            <Button
            title="Play"
            onPress={() => {
                if(checkBoxSelected.length > 0){
                    navigation.navigate('Game', {
                        characters: checkBoxSelected,
                        year: year
                    });
                }else{
                    ToastAndroid.showWithGravity("Please select a character.", ToastAndroid.SHORT, ToastAndroid.CENTER);
                }
            }}
            />
        </View>
      </View>
    );

    function ToggleCheckBox(id : number){
      if(checkBoxSelected.includes(id)){
          setCheckBoxSelected(checkBoxSelected.filter((item) => item != id));
      }else{
          setCheckBoxSelected([...checkBoxSelected, id]);
      }
    }
}
const styles = StyleSheet.create({
    text: {
        fontFamily: "Georgia, serif",
        fontSize:20,
        fontWeight: 'bold',
        paddingLeft: 5,
        color: Colors.LightBlack
    }
  });

export default SetupPage;