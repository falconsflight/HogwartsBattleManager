import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CheckBoxProps } from '../models/CheckBoxProps';
import * as Colors from '../lib/Colors'

const CheckBox = (props: CheckBoxProps) => {
    return (
        props.characters.map((val) => {
          return (
          <View key={val.id} style={styles.checkboxView}>
            <TouchableOpacity onPress={() => {props.toggleFn(val.id)}}>
              <View style={{
                height: 20,
                width: 20,
                borderWidth: 2,
                borderColor: '#000',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {
                  props.selectedBoxes.includes(val.id) ?
                    <View style={{
                      height: 10,
                      width: 10,
                      backgroundColor: '#000'
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
  };
    
  const styles = StyleSheet.create({
    checkboxText: {
        fontFamily: "Georgia, serif",
        fontSize: 16,
        paddingLeft: 5,
        color: Colors.LightBlack
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

export default CheckBox;