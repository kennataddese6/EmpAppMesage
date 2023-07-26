import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AudioRecorder, AudioUtils } from 'react-native-audio';

export default function AttachButton({ information }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioPath, setAudioPath] = useState(AudioUtils.DocumentDirectoryPath + '/test.aac');

  const startRecording = async () => {
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
    try {
      const filePath = await AudioRecorder.stopRecording();
      setIsRecording(false);
      setAudioPath(filePath);
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
