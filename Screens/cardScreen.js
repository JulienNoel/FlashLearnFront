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
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useLanguage from "../hooks/useLanguage";

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
  const [isFinished, setIsFinished] = useState(false);
  const [notifTxt, setNotifTxt] = useState([]);
  const [filtreExercice, setFiltreExercice] = useState([]);

  async function createUser() {
    var rawResponse = await fetch(
      `https://flashlearnapp.herokuapp.com/createUser`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `exercice=${exerciceNbr}&language=${props.langue}`,
      }
    );
    var response = await rawResponse.json();
    var token = response.user.token;

    if (response.result) {
      AsyncStorage.setItem("token", token);
      props.addToken(token);
    }
  }

  useEffect(() => {
    setListExe(props.exo[0]);
    async function loadExerciceHistory() {
      if (props.token) {
        var rawResponse = await fetch(
          `https://flashlearnapp.herokuapp.com/exercicefind/${props.token}/${props.langue}`
        );
        var response = await rawResponse.json();
        response.result && setExerciceNbr(response.user[0].nbrExercice + 1);
      }
    }
    loadExerciceHistory();
  }, []);

  useEffect(() => {
    let triExercice = listExe.filter((e) => e.exerciceId == exerciceNbr);
    setFiltreExercice(triExercice[0]);
  }, [exerciceNbr]);

  useEffect(() => {
    async function recordExerciceHistory() {
      if (props.token) {
        var rawResponse = await fetch(
          `https://flashlearnapp.herokuapp.com/exercicerecord`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `exercice=${exerciceNbr + 1}&language=${props.langue}&token=${
              props.token
            }`,
          }
        );

        var response = await rawResponse.json();
      }
    }
    recordExerciceHistory();
  }, [exerciceNbr]);

  let exerciceListFR = [];

  for (let word in filtreExercice) {
    exerciceListFR.push(filtreExercice[word]);
  }
  exerciceListFR.splice(0, 1);

  useEffect(() => {
    async function loadTranslate() {
      var rawResponse = await fetch(
        "https://translation.googleapis.com/language/translate/v2/",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `q=${exerciceListFR[wordNumber]}&target=${props.langue}&format=text&source=fr&modele=base&key=${REACT_APP_KEY}`,
        }
      );
      var response = await rawResponse.json();

      if (exerciceListFR[wordNumber]) {
        setTraduction(
          response.data.translations[0].translatedText.toLowerCase()
        );
      }
    }
    loadTranslate();
  }, [wordNumber, filtreExercice]);


  const timeInterval = [600, 86400, 172800, 604800];
  const timeIntervalTest = [2, 6, 15];

  const recordTranscription = (transcription) => {
    console.log("transcription", transcription);
    setTranscripted(transcription);
  };

  const speak = () => {
    const thingToSay = traduction;
    Speech.speak(thingToSay, { language: props.langue, rate: 0.5, pitch: 0.9 });
  };

  let filtreLanguage = useLanguage(props.langue);

  let resultTranscription;
  if (transcripted == traduction) {
    resultTranscription = <Text>Excellente prononciation!</Text>;
  }

  let tradList = notifTxt.filter((el) => el != null);
  let recapNotif = exerciceListFR.reduce((acc, el, i) => {
    return [...acc, { fr: el, trad: tradList[i] }];
  }, []);

  let displayNotif = "";

  for (const element of recapNotif) {
    displayNotif += `FR: ${element.fr} ${props.langue.toUpperCase()}: ${
      element.trad
    }\n`;
  }

  async function schedulePushNotification(time) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🔍 Rappel FlashLearn !",
        body: `${displayNotif}`,
      },
      trigger: { seconds: time },
    });
  }

  exerciceNbr > 25 && setExerciceNbr(1);

  const exerciceCount = () => {
    setWordNumber(wordNumber + 1);
    setNotifTxt((arr) => {
      return [...arr, traduction];
    });

    if (wordNumber == 4) {
      setModalVisible(true);
      setIsFinished(true);
      setWordNumber(4);
      !props.token && createUser();
    }
  };

  function sendNotification () {
    for (let timeSetting of timeInterval) {
      schedulePushNotification(timeSetting);
    }
    setNotifTxt([])
  }

  const exerciceFinished = () => {
    setModalVisible(!modalVisible);
    setWordNumber(0);
    props.navigation.navigate("game");
    sendNotification()
    
  };

  const exerciceContinue = () => {
    setModalVisible(!modalVisible);
    setExerciceNbr(exerciceNbr + 1);
    setWordNumber(0);
    sendNotification()
  };

  let displayTrad;

  if (exerciceListFR[wordNumber] == null) {
    displayTrad = <ActivityIndicator size="large" color="#9fa8da" />;
  } else {
    displayTrad = traduction;
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
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity>
            <FontAwesome
              name="volume-up"
              size={40}
              color="black"
              onPress={speak}
            />
          </TouchableOpacity>
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
              source={filtreLanguage[0].image}
            />
            <Text>{filtreLanguage[0].language}</Text>
          </View>
          <Text style={{ fontSize: 28, marginBottom: 20 }}>{displayTrad}</Text>
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
          flexDirection: "column-reverse",
          width: "80%",
          height: "25%",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <View>
          <TouchableOpacity>
            <FontAwesome
              name="check-circle"
              size={100}
              color="green"
              onPress={exerciceCount}
            />
          </TouchableOpacity>
        </View>
        <RecordScreen transcriptionParent={recordTranscription} />
        {transcripted == traduction ? <Text>Bravo</Text> : null}
      </View>
      <Modal
        style={{ height: 300, width: 300 }}
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
            <Text style={styles.modalText}>Vous avez fini l'exercice !!</Text>
            <View
              style={{
                height: 150,
                width: 120,
                justifyContent: "space-evenly",
              }}
            >
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={exerciceFinished}
              >
                <Text style={styles.textStyle}>Stop</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={exerciceContinue}
              >
                <Text style={styles.textStyle}>Continuer</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addExercice: function (exe) {
      dispatch({ type: "addExercice", exercice: exe });
    },
    addToken: function (token) {
      dispatch({ type: "addToken", token: token });
    },
  };
}

function mapStateToProps(state) {
  return {
    langue: state.languageSelect,
    exo: state.exercice,
    token: state.token,
  };
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
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 15,
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
