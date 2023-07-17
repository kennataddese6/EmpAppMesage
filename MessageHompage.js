/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {useState, useEffect, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GetSmsAndroid from 'react-native-get-sms-android';
import {useFocusEffect} from '@react-navigation/native';

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
import GetMessage from './GetMessage';
const MessageHomepage = props => {
  const [Messages, setMessages] = useState([]);
  const [viewMessage, setViewMessage] = useState('');
  const [onScreen, setOnScreen] = useState(true);

  const filter = {
    box: '',
  };

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
  const handleRefresh = async () => {
    try {
      const result = await GetMessage();
      setMessages(result);
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      console.log('SendMessageScreen focused');
      // Do something when the SendMessageScreen is focused
      setOnScreen(true);
      return () => {
        console.log('SendMessageScreen blurred');
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
                      marginVertical: 1,
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
                    {message.body[0].trim().startsWith('data:image') ||
                    message.body[0]
                      .trim()
                      .startsWith('data:application/octet-stream') ? (
                      <Text
                        onPress={() => props.navigation.navigate('SendMessage')}
                        style={styles.italic}>
                        Photo
                      </Text>
                    ) : (
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
                    )}
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
        <Button title="Refresh" color="" onPress={handleRefresh} />
      </View>
    </View>
  );
};
export default MessageHomepage;
