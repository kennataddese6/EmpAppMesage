/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SendMessage from './SendMessage';
import MessageHomepage from './MessageHompage';
const Stack = createNativeStackNavigator();
const ScreenStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MessageHompage"
        component={MessageHomepage}
        options={{title: 'Message'}}
      />
      <Stack.Screen
        name="SendMessage"
        component={SendMessage}
        options={{title: 'Send Message'}}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <ScreenStack />
    </NavigationContainer>
  );
};

export default App;
