import React, {useState} from 'react';
import {Button, Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

export default function AttachButton() {
  const [image, setImage] = useState(null);

  const pickImage = () => {
    ImagePicker.launchImageLibrary({}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImage(response.uri);
      }
    });
  };

  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={pickImage}>
      <Text style={styles.buttonText}>Select Image</Text>
    </TouchableOpacity>
    {image && <Image source={{ uri: image }} style={styles.image} />}
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
      backgroundColor: 'grey',
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    image: {
      marginTop: 20,
      width: 200,
      height: 200,
    },
  });
