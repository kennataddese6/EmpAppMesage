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
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SmsAndroid from 'react-native-get-sms-android';
function App() {
  const [Message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const sendText = async () => {
    SmsAndroid.autoSend(
      phoneNumber,
      Message,
      fail => {
        console.log('Failed with this error: ' + fail);
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
      <Button title="Send" onPress={sendText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 20,
    padding: 10,
  },
});

export default App;
