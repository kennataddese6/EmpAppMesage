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
import AttachButton from './AttachButton';
import SmsAndroid from 'react-native-get-sms-android';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
function SendMessage({route}) {
  const [Message, setMessage] = useState('');
  const Messages = route.params ? route.params.details : '';
  const [phoneNumber, setPhoneNumber] = useState(Messages.address);
  console.log('here are the messages', Messages);
  const textMessages = Messages.body;
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
        setMessage('');
      },
    );
  };
  const handleTextChange = input => {
    // Split the input text into an array of lines
    if (input.length % 40 === 0) {
      const lines = input.split('\n');

      // Map over the lines and insert new line characters after every 40 characters
      const formattedLines = lines.map(line => {
        let formattedLine = '';
        for (let i = 0; i < line.length; i += 40) {
          formattedLine += line.slice(i, i + 40) + '\n';
        }
        return formattedLine;
      });

      // Join the formatted lines back into a single string
      const formattedText = formattedLines.join('');

      // Update the value of the TextInput
      setMessage(formattedText);
    } else {
      setMessage(input);
    }
  };
  const handleInfo = info => {
    if (info.image) {
      console.log('here is the data from button', info);
      SmsAndroid.autoSend(
        phoneNumber,
        info.image,
        fail => {
          Alert.alert(
            'Error',
            `Something Went Wrong. Please try again!${phoneNumber}`,
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
          setMessage('');
        },
      );
    } else {
      console.log('nothinggggg');
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.phoneNumberInput}
        placeholder={
          Messages.address ? Messages.address : 'Enter a phone number'
        }
        value={Messages.address ? Messages.address : '0991374186'}
        onChangeText={input => setPhoneNumber(input)}
      />
      <ScrollView style={styles.scrollView}>
        {textMessages.map(sms => (
          <View style={styles.allMessages}>
            <Text>{sms}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.messagebox}>
        <TextInput
          style={styles.input}
          placeholder="Enter Message"
          value={Message}
          onChangeText={input => handleTextChange(input)}
          multiline
        />
        <AttachButton information={handleInfo} />
        <TouchableOpacity style={styles.button} onPress={sendText}>
          <Text style={styles.text}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  phoneNumberInput: {
    width: '100%',
    borderWidth: 1,
    borderBottomColor: 'black',
    borderTopColor: 'white',
    borderLeftColor: 'white',
    borderRightColor: 'white',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'grey',
    marginHorizontal: 0,
  },
  allMessages: {
    backgroundColor: '#e5e5ea',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 14,
    alignSelf: 'flex-start',
  },
  messagebox: {
    height: 'auto',
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 'auto',
    width: '80%',
    borderColor: 'gray',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 4,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});

export default SendMessage;
