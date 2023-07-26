import React, {useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default function AttachButton({information}) {


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={null}>
        <MaterialIcons name="mic" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 5,
    color: 'green',
  },
  image: {
    marginTop: 20,
    width: 200,
    height: 200,
  },
});
