import React, {useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default function AttachButton() {
  const [image, setImage] = useState(null);

  const pickImage = () => {
    console.log('here are the icons if any', MaterialIcons);
    ImagePicker.launchImageLibrary({}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImage(response.uri);
        console.log('Image is selceted do you want to see it', response);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <MaterialIcons name="attach-file" size={24} color="black" />
      </TouchableOpacity>
      {image && <Image source={{uri: image}} style={styles.image} />}
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
