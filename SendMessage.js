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
function SendMessage({route}) {
  const [Message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const Messages = route.params ? route.params.details : '';
  const [phoneNumber, setPhoneNumber] = useState(Messages.address);

  const sendText = async () => {
    setPhoneNumber(Messages.address);
    console.log(phoneNumber, Message, 'and', SmsAndroid);
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
        console.log('Here is the error', fail);
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
      <Text style={styles.title}>{response}</Text>
      <TextInput
        style={{
          position: 'absolute',
          top: '0%',
          left: '0%',
          width: '100%',
          borderWidth: 1,
          borderBottomColor: 'black',
          borderTopColor: 'white',
          borderLeftColor: 'white',
          borderRightColor: 'white',
        }}
        placeholder={
          Messages.address ? Messages.address : 'Enter a phone number'
        }
        value={Messages.address ? Messages.address : '0991374186'}
        onChangeText={input => setPhoneNumber(Messages.address)}
      />

      <View style={styles.messagebox}>
        <TextInput
          style={styles.input}
          placeholder="Enter Message"
          value={Message}
          onChangeText={input => setMessage(input)}
        />
        <TouchableOpacity style={styles.button} onPress={sendText}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  messagebox: {
    flex: 1,
    position: 'absolute',
    bottom: '0%',
    height: '10%',
    width: '100%',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    height: 65,
    width: '80%',
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderRadius: 1,
    position: 'absolute',
    right: '0%',
    height: '100%',
    top: '0%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SendMessage;
