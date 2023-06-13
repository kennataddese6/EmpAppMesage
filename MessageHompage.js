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
import GetSmsAndroid from 'react-native-get-sms-android';
import {DataTable} from 'react-native-paper';

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
  const [Messages, setMessages] = useState([]);
  const filter = {
    box: '',
  };
  const getMessages = async () => {
    GetSmsAndroid.list(
      JSON.stringify(filter),
      fail => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        console.log('Count: ', count);
        // console.log('List: ', smsList);
        setMessages(JSON.parse(smsList));
      },
    );
  };

  console.log('here are the messags', Messages);
  console.log('number of messages', Messages.length);
  console.log('number of messages', typeof Messages);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <ScrollView style={{position: 'relative', top: 15}}>
        {Messages
          ? Messages.map(message => (
              <>
                <Text>{message.address}</Text>
                <Text>{message.body.trim()}</Text>
              </>
            ))
          : console.log('no messages')}
      </ScrollView>
      <View
        style={[
          {
            width: '90%',
            margin: 10,
            backgroundColor: 'red',
            position: 'absolute',
            top: 450,
          },
        ]}>
        <Button title="Get Messages" color="" onPress={getMessages} />
      </View>
      <View
        style={[
          {
            width: '90%',
            margin: 10,
            backgroundColor: 'red',
            position: 'absolute',
            top: 500,
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
