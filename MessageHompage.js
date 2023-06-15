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
import SendMessage from './SendMessage';

const MessageHomepage = props => {
  const [Messages, setMessages] = useState([]);
  const [viewMessage, setViewMessage] = useState('');
  const filter = {
    box: '',
  };
  const uniqueSet = new Set();
  const duplicateItems = [];

  useEffect(() => {
    const getMessages = async () => {
      GetSmsAndroid.list(
        JSON.stringify(filter),
        fail => {
          console.log('Failed with this error: ' + fail);
        },
        (count, smsList) => {
          // console.log('Count: ', count);
          // console.log('List: ', smsList);
          const AllMessages = JSON.parse(smsList);
          const result = Object.values(
            AllMessages.reduce((acc, item) => {
              if (acc[item.address]) {
                acc[item.address].body.push(item.body);
              } else {
                acc[item.address] = {...item, body: [item.body]};
              }
              return acc;
            }, {}),
          );
          setMessages(result);
        },
      );
    };
    getMessages();
  }, []);

  const styles = StyleSheet.create({
    border: {
      textDecorationLine: 'underline',
    },
    italic: {
      fontStyle: 'italic',
      marginTop: 10,
      fontSize: 15,
    },
    bold: {
      fontStyle: 'italic',
      fontWeight: 'bold',
      marginTop: 10,
      fontSize: 20,
    },
  });
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'flex-end',
      }}>
      <ScrollView
        style={{
          position: 'relative',
          top: 10,
          left: 0,
          height: 20,
          width: '90%',
          height: '70%',
        }}>
        {Messages
          ? Messages.map(message => (
              <>
                <React.Fragment key={message._id}>
                  <View
                    onPress={() => {
                      setViewMessage(message);
                      props.navigation.navigate('SendMessage', {
                        details: message,
                      });
                    }}
                    style={{
                      width: '100%',
                      borderBottomWidth: 1,
                      borderBottomColor: 'black',
                    }}>
                    <Text
                      onPress={() => {
                        setViewMessage(message);
                        props.navigation.navigate('SendMessage', {
                          details: message,
                        });
                      }}
                      style={styles.bold}>
                      {' '}
                      {message.address}{' '}
                    </Text>
                    <Text
                      onPress={() => props.navigation.navigate('SendMessage')}
                      style={styles.italic}>
                      {message.body[0].trim().length > 30
                        ? message.body[0]
                            .trim()
                            .replace(/[\s\n]+/g, ' ')
                            .slice(0, 30)
                            .concat('...')
                        : message.body[0].trim()}{' '}
                    </Text>
                  </View>
                </React.Fragment>
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
        ]}></View>
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
