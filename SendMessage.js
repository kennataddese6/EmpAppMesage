/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';

import SmsAndroid from 'react-native-get-sms-android';
function SendMessage() {
  const [Message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const sendText = async () => {
    SmsAndroid.autoSend(
      phoneNumber,
      Message,
      fail => {
        Alert.alert(
          'Error',
          `Something Went Wrong. Please try again!`,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      },
      success => {
        Alert.alert(
          'Success',
          `Message sent to ${phoneNumber} Succesfully`,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      },
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Message</Text>
      <Text style={styles.title}>{response}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChangeText={input => setPhoneNumber(input)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter a Message"
        value={Message}
        onChangeText={input => setMessage(input)}
      />
      <TouchableOpacity style={styles.button} onPress={sendText}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SendMessage;
