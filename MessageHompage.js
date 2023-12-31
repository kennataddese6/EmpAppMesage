/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ScrollView, StyleSheet, Text, View, Button} from 'react-native';
import GetMessage from './GetMessage';
const MessageHomepage = props => {
  const [Messages, setMessages] = useState([]);
  const [viewMessage, setViewMessage] = useState('');
  const [onScreen, setOnScreen] = useState(true);

  const filter = {
    box: '',
  };

  useEffect(() => {
    handleRefresh();
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
      console.log('here is the another result', result.length);
      setMessages(result);
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
                        details: message.phoneNum,
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
                      {message.phoneNum}{' '}
                    </Text>
                    {message.messages[0].body.trim().startsWith('data:image') ||
                    message.messages[0].body
                      .trim()
                      .startsWith('data:application/octet-stream') ? (
                      <Text style={styles.italic}>Photo</Text>
                    ) : (
                      <Text style={styles.italic}>
                        {message.messages[0].body.trim().length > 30
                          ? message.messages[0].body
                              .trim()
                              .replace(/[\s\n]+/g, ' ')
                              .slice(0, 30)
                              .concat('...')
                          : message.messages[0].body.trim()}{' '}
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
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#2196F3',
            borderRadius: 30,
            width: 60,
            height: 60,
            alignSelf: 'flex-start',
            margin: 20,
          },
        ]}>
        <MaterialIcons name="mode-edit" size={30} color="#fff" />
      </View>
    </View>
  );
};
export default MessageHomepage;
