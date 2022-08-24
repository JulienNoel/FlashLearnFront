import * as React from "react";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";

import { connect } from "react-redux";
import { getNativeSourceAndFullInitialStatusForLoadAsync } from "expo-av/build/AV";

export function RecordScreen(props) {
  
  const [recording, setRecording] = useState();
  const [sound, setSound] = useState()
  const [RecordedURI, SetRecordedURI] = useState('')

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const options = {
        android: {
          extension: ".3gp",
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_AMR_WB,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_WB,
          sampleRate: 16000,
          numberOfChannels: 1,
          bitRate: 128000,
        },
        ios: {
          extension: ".3gp",
          outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_AMR_WB,
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          sampleRate: 16000,
          numberOfChannels: 1,
          bitRate: 128000,
        },
      };
      const { recording } = await Audio.Recording.createAsync(options);
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }


  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    SetRecordedURI(uri)
    
    console.log("Recording stopped and stored at", uri);

    const data = new FormData();
    data.append("audio", {
      uri: uri,
      type: "audio/3gp",
      name: "audio.3gp",
    });

    var rawResponse = await fetch(
      `https://flashlearnapp.herokuapp.com/upload/${props.langue}`,
      {
        method: "POST",
        body: data,
      }
    );
    var response = await rawResponse.json();
    if (response.result) {
      props.transcriptionParent(response.transcription);
    }
    
    

  }


  const playSound = async() => {

    const { sound } = await Audio.Sound.createAsync(
      { uri: RecordedURI },
      { shouldPlay: true }
    );
    setSound(sound);
    console.log("Playing Sound");
    await sound.playAsync();
  }
  
  

  return (
    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
      <TouchableOpacity>
        <FontAwesome
          name="microphone"
          size={80}
          color={recording ? "green" : "black"}
          onPress={recording ? stopRecording : startRecording}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome
          name="play"
          size={80}
          color={"black"}
          onPress={playSound}
        />
      </TouchableOpacity>
      
    </View>
  );
}

function mapStateToProps(state) {
  return { langue: state.languageSelect };
}

export default connect(mapStateToProps, null)(RecordScreen);
