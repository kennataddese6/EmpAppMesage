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
import ImageResizer from 'react-native-image-resizer';
export default function AttachButton({information}) {
  const [image, setImage] = useState(null);

  const pickImage = () => {
    ImagePicker.launchImageLibrary({}, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        try {
          const imageUri = response.assets[0].uri;
          const fetched = await fetch(imageUri);
          const blob = await fetched.blob();
          console.log('step one ');
          if (blob.size <= 500) {
            const base64String = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onerror = reject;
              reader.onload = () => {
                resolve(reader.result);
              };
              reader.readAsDataURL(blob);
            });
            setImage(imageUri);
            console.log('Base64 string:', base64String.length);
            let message = {image: base64String};
            information(message);
          } else {
            console.log('step two ');
            // If the size is greater than 500 bytes, resize the image and then convert to Base64
            const resizedBlob = await ImageResizer.createResizedImage(
              imageUri,
              10,
              10,
              'PNG',
              5,
            );
            console.log('Step three', resizedBlob);
            const resizedBase64String = await new Promise((resolve, reject) => {
              fetch(resizedBlob.uri)
                .then(response => response.blob())
                .then(blob => {
                  const reader = new FileReader();
                  reader.onerror = reject;
                  reader.onload = () => {
                    resolve(reader.result);
                  };
                  reader.readAsDataURL(blob);
                })
                .catch(error => {
                  reject(error);
                });
            });
            console.log('step eight');
            setImage(resizedBlob.uri);
            console.log('step nine');
            console.log('Resized Base64 string:', resizedBase64String.length);
            let message = {image: resizedBase64String};
            information(message);
          }
        } catch (err) {
          console.warn('Error converting image to base64:', err);
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <MaterialIcons name="attach-file" size={24} color="black" />
      </TouchableOpacity>
      {/*
      // This is how to display the image
       image && <Image source={{uri: image}} style={styles.image} /> 
       */}
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
