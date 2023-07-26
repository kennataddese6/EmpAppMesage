import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import RNFS from 'react-native-fs';
import {encode} from 'base64-js';
export default function AttachButton({information}) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioPath, setAudioPath] = useState(
    AudioUtils.DocumentDirectoryPath + '/test.aac',
  );

  const startRecording = async () => {
    console.log('start recording');
    try {
      await AudioRecorder.prepareRecordingAtPath(audioPath, {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: 'Low',
        AudioEncoding: 'aac',
        IncludeBase64: true,
      });
      await AudioRecorder.startRecording();
      setIsRecording(true);
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecording = async () => {
    console.log('stop recording');
    try {
      const filePath = await AudioRecorder.stopRecording();
      setIsRecording(false);
      setAudioPath(filePath);
      const audioData = await RNFS.readFile(filePath, 'base64');
      const blob = new Blob([audioData], {type: 'audio/aac'});
      console.log('this is the size of the blob',blob.size)
      if (blob.size <= 11800) {
        const base64String = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onerror = reject;
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(blob);
        });

        // Store the base64-encoded audio data in a state variable
        console.log('this is the base64data', base64String.length);
      } else {
        console.warn('Audio file is too large to be uploaded');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
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
