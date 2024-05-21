import React, { useState } from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';

function SetupPage({ navigation }) {
    const [checkBoxSelected, setCheckBoxSelected] = useState([]);
    const [radioSelected, setRadioSelected] = useState(1);
    const charactersJson = require('../Characters.json');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Choose your characters...</Text>
        <CheckBox props={charactersJson.characters}></CheckBox>
        <Text>Choose your year...</Text>
        <RadioButton></RadioButton>
        <Button
          title="Play"
          onPress={() => navigation.popToTop()}
        />
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

    function RadioButton(){ 
        const years = [1, 2, 3, 4, 5, 6, 7];
        return (
          years.map((val) => {
            return (
                <View
            style={{flex: 1, flexWrap: "wrap", flexDirection: "row", justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity key={val} onPress={() => {setRadioSelected(val)}}>
                <View style={{
                  height: 20,
                  width: 20,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: '#000',
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'inline'
                }}>
                  {
                    val == radioSelected ?
                      <View style={{
                        height: 10,
                        width: 10,
                        borderRadius: 6,
                        backgroundColor: '#000',
                      }} />
                      : null
                  }
                </View>
              </TouchableOpacity>
              <Text key={'text'+val} style={{paddingLeft: 5}}>{val}</Text>
              </View>
            )
          })
        );
      }

      function ToggleCheckBox(id : number){
        if(checkBoxSelected.includes(id)){
            setCheckBoxSelected(checkBoxSelected.filter((item) => item != id));
        }else{
            setCheckBoxSelected([...checkBoxSelected, id]);
        }
      }

      function toast(message){
        ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.TOP);
      };
    
      function CheckBox(props){ 
        /*
            Test code for determining types and data for objects and arrays. 
            console.log("low type of variable is:"+typeof(props.props.characters));
            console.log("low data of variable is:"+JSON.stringify(props.props.characters));
            
            let test = ' ';
            props.props.characters.map((val) => {
            test += ' ' + val.name;
            });
            toast(test);
        */
        return (
          props.props.map((val) => {
            return (
                <View
            style={{flex: 1, flexWrap: "wrap", flexDirection: "row", justifyContent: 'center', alignItems: 'center'}}>
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
              <Text style={{paddingLeft: 5}}>{val.name}</Text>
              </View>
            )
          })
        );
      }
}

export default SetupPage;