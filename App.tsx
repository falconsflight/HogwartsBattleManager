/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomePage from './pages/Home';
import SetupPage from './pages/Setup';
import ProjectTemplatePage from './pages/NewReactNativeTemplate';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{title: 'Hogwarts Battle Manager'}}
        />
      <Stack.Screen name="Setup" component={SetupPage} />
      <Stack.Screen name="Test" component={ProjectTemplatePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;