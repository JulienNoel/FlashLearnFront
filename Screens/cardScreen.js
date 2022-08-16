import * as React from "react";
import * as Speech from "expo-speech";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Pressable,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import RecordScreen from "./recordScreen";
import { REACT_APP_KEY } from "@env";
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export function CardScreen(props) {
  
  const [traduction, setTraduction] = useState(null);
  const [wordNumber, setWordNumber] = useState(0);
  const [listExe, setListExe] = useState([]);
  const [exerciceNbr, setExerciceNbr] = useState(1);
  const [transcripted, setTranscripted] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isFinished, setIsFinished] = useState(false)
  const [notifTxt, setNotifTxt] = useState([])
  

  useEffect(() => {
    async function loadExercice() {
      var rawResponse = await fetch(
        `https://flashlearnapp.herokuapp.com/exercice`
      );
      var response = await rawResponse.json();
      var objectResponse = response.result;

      props.addExercice(objectResponse);
      setListExe(objectResponse);
    }
    loadExercice();
  }, [props.langue]);

  useEffect(() => {
    async function loadTranslate() {
      if (exerciceListFR.length > 0) {

        var rawResponse = await fetch(
          "https://translation.googleapis.com/language/translate/v2/",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `q=${exerciceListFR[wordNumber]}&target=${props.langue}&format=text&source=fr&modele=base&key=${REACT_APP_KEY}`,
          }
        );
        var response = await rawResponse.json();
          
        setTraduction(response.data.translations[0].translatedText.toLowerCase());
        
      }
      
    }
    loadTranslate();
  }, [wordNumber, listExe]);

  const timeInterval = [600,86400,172800,604800] 
  const timeIntervalTest = [2,6,15]

  console.log('notiftxt', notifTxt)
  
  
  const recordTranscription = (transcription) => {
    console.log("transcription", transcription);
    setTranscripted(transcription);
  };

  let filtreExercice = listExe.filter((e) => e.exerciceId == exerciceNbr);
  filtreExercice = filtreExercice[0];

  const exerciceMax = props.route.params.nbrEx / 5;
  
  let exerciceListFR = [];

  for (let word in filtreExercice) {
    exerciceListFR.push(filtreExercice[word]);
  }
  exerciceListFR.splice(0,2);
  console.log(exerciceListFR)

  const speak = () => {
    const thingToSay = traduction;
    Speech.speak(thingToSay, { language: props.langue, rate: 0.5, pitch: 0.9 });
  };

  const listLangues = [
    {
      language: "Anglais",
      langAbrev: "en",
      image: require("../assets/royaume-uni.png"),
    },
    {
      language: "Italien",
      langAbrev: "it",
      image: require("../assets/italie.png"),
    },
    {
      language: "Espagnol",
      langAbrev: "es",
      image: require("../assets/espagne.png"),
    },
    {
      language: "Thailandais",
      langAbrev: "th",
      image: require("../assets/thailande.png"),
    },
    {
      language: "Portugais",
      langAbrev: "pt",
      image: require("../assets/le-portugal.png"),
    },
  ];
  let filtreLanguage = listLangues.filter((e) => e.langAbrev === props.langue);

  let resultTranscription;
  if (transcripted == traduction) {
    resultTranscription = <Text>Bravo</Text>;
  }



  let tradList = notifTxt.filter(el => el != null)
  let recapNotif = exerciceListFR.reduce((acc, el, i) => {
    return [...acc, {fr: el, trad: tradList[i]}]
  }, [])
  
  let displayNotif = recapNotif.map((el, i) =>{
    return `FR: ${el.fr}, ${props.langue.toUpperCase()}: ${el.trad}\n`
  })
  

  async function schedulePushNotification(time) {
    
  
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🔍 Rappel FlashLearn!",
        body: `${displayNotif}`        
      },
      trigger: { seconds: time}
      
    });
    // await Notifications.dismissAllNotificationsAsync()
    // await Notifications.cancelAllScheduledNotificationsAsync()
  }
  



  const exerciceCount = () => {
    
    setWordNumber(wordNumber + 1);    
    setNotifTxt(arr => {
      return [...arr, traduction]
    })
    if (wordNumber > 4 && exerciceMax >= exerciceNbr) {
      setExerciceNbr(exerciceNbr + 1);
      setWordNumber(0);
      
    }
    if (exerciceNbr == exerciceMax && wordNumber == 4) {
      setModalVisible(true);
      setIsFinished(true)
      setWordNumber(4)
      setExerciceNbr(exerciceNbr)           
    }    
    
  };

  const exerciceFinished = () => {
      setModalVisible(!modalVisible)
      setExerciceNbr(1)
      setWordNumber(0)
    if (props.token) {      
      props.navigation.navigate('stat')
    }else {
      props.navigation.navigate('signup')
    }
    for (let timeSetting of timeIntervalTest) {
      schedulePushNotification(timeSetting)
    }
    setNotifTxt([])
  }
  
  // if(isFinished) {
  //   displayFR = exerciceList[5]
  // }
  
  

  let displayTrad;
  
  if (exerciceListFR[wordNumber] == null ) {
    displayTrad = <ActivityIndicator size="large" color="#9fa8da" />;
  } else {
    displayTrad = traduction
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View
        style={{
          width: "80%",
          height: "40%",
          justifyContent: "space-evenly",
          borderWidth: 2,
          borderRadius: 20,
          borderColor: "lightgray", 
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ marginRight: 15, marginLeft: 15 }}>
            <Image
              style={{ height: 60, width: 60 }}
              source={filtreLanguage[0].image}
            />
            <Text>{filtreLanguage[0].language}</Text>
          </View>
          <Text style={{ fontSize: 28, marginBottom: 20 }}>{displayTrad}</Text>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <FontAwesome
            name="volume-up"
            size={40}
            color="black"
            onPress={speak}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ marginRight: 15, marginLeft: 15 }}>
            <Image
              style={{ height: 60, width: 60 }}
              source={require("../assets/la-france.png")}
            />
            <Text>Français</Text>
          </View>
          <Text style={{ fontSize: 28, marginBottom: 20 }}>
            {exerciceListFR[wordNumber]}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row-reverse",
          width: "80%",
          height: "25%",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <RecordScreen transcriptionParent={recordTranscription} />
        {transcripted == traduction? <Text>Bravo</Text>:null}
        <TouchableOpacity>
          <FontAwesome
            name="check-circle"
            size={100}
            color="green"
            onPress={exerciceCount}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Bravo!</Text>
              <Text style={styles.modalText}>Vous avez fini les exercices !!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={exerciceFinished}
              >
                <Text style={styles.textStyle}>Continuer</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addExercice: function (exe) {
      dispatch({ type: "addExercice", exercice: exe });
    },
  };
}

function mapStateToProps(state) {
  return { langue: state.languageSelect, exo: state.exercice, token: state.token };
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CardScreen);
