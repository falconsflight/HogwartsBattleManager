import React from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';

function HomePage({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>I solemnly swear I am up to no good.</Text>
        <Button
          title="Swear"
          onPress={() => navigation.navigate('Setup')}
        />
        <Button
          title="Test"
          onPress={() => navigation.navigate('Test')}
        />
      </View>
    );
}

export default HomePage;