import React from 'react';
import {
  Text,
  View
} from 'react-native';

function GamePage({ route, navigation}) {
    const { characters, year } = route.params;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Your selected characters are: {JSON.stringify(characters)}</Text>
        <Text>Your selected year is: {year}</Text>
      </View>
    );
}

export default GamePage;