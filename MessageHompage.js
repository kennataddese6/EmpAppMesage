/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Image,
  Button,
} from 'react-native';

const MessageHomepage = props => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <View
        style={[
          {
            width: '90%',
            margin: 10,
            backgroundColor: 'red',
            position: 'absolute',
            top: 600,
          },
        ]}>
        <Button
          title="Send Message"
          color=""
          onPress={() => props.navigation.navigate('SendMessage')}
        />
      </View>
    </View>
  );
};
export default MessageHomepage;
