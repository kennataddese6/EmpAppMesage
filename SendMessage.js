/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import AttachButton from './AttachButton';
import SmsAndroid from 'react-native-get-sms-android';
import {useFocusEffect} from '@react-navigation/native';
import GetMessage from './GetMessage';

function SendMessage({route}) {
  const [Message, setMessage] = useState('');
  const [onScreen, setOnScreen] = useState(true);
  const Messages = route.params ? route.params.details : '';
  const [phoneNumber, setPhoneNumber] = useState(Messages.phoneNum);
  const [textMessages, settextMessages] = useState(Messages.messages);
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
          [{text: 'OK', onPress: () => setMessage('')}],
          {cancelable: false},
        );
        console.log('Here is the error', fail);
      },
      success => {
        Alert.alert(
          'Success',
          `Message sent to ${phoneNumber} Succesfully`,
          [{text: 'OK', onPress: () => setMessage('')}],
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
  const handleRefresh = async () => {
    try {
      const result = await GetMessage(`${phoneNumber}`);
      settextMessages(result.messages[0].body);
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      // Do something when the SendMessageScreen is focused
      setOnScreen(true);
      return () => {
        // Do something when the SendMessageScreen is blurred
        setOnScreen(false);
      };
    }, []),
  );
  useEffect(() => {
    // Refresh message list every 30 seconds
    if (onScreen) {
      const interval = setInterval(() => {
        handleRefresh();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [onScreen]);
  return (
    <View style={styles.container}>
      <Text style={styles.phoneDisplays}>
        {phoneNumber ? phoneNumber : '0991374186'}
      </Text>
      <ScrollView style={styles.scrollView}>
        {textMessages
          ? textMessages.map((sms, index) => (
              <View
                style={
                  sms.type === 'sent'
                    ? styles.sentMessages
                    : styles.inboxMessages
                }
                key={index}>
                {sms.body.trim().startsWith('data:image') ||
                sms.body.trim().startsWith('data:application/octet-stream') ? (
                  <Image
                    style={styles.image}
                    source={{uri: sms.body.trim()}}
                    resizeMode="contain"
                  />
                ) : (
                  <Text>{sms.body}</Text>
                )}
              </View>
            ))
          : console.log('something went wrong')}
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
    backgroundColor: 'silver',
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
  sentMessages: {
    backgroundColor: '#DCF8C5',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 14,
    alignSelf: 'flex-end',
  },
  inboxMessages: {
    backgroundColor: '#EAEAEA',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 14,
    alignSelf: 'flex-start',
  },
  phoneDisplays: {
    backgroundColor: '#d1f5ff',
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
  image: {
    marginTop: 20,
    width: 100,
    height: 150,
  },
});

export default SendMessage;
