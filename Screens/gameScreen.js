import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card, Icon } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";

export function GameScreen(props) {
  const [exerciceList, setExerciceList] = useState([]);
  const [exerciceNbr, setExerciceNbr] = useState(0)

  useEffect(() => {
    setExerciceList(props.exo[0]);
    
       
  }, []);

  useEffect(() => {

    async function loadExerciceHistory() {

    if (props.token) { 
    var rawResponse = await fetch(
      `https://flashlearnapp.herokuapp.com/exercicefind/${props.token}/${props.langue}`,
      
    );
    var response = await rawResponse.json();
    response.result? setExerciceNbr(response.user[0].nbrExercice) : setExerciceNbr(0)
    
  }
    }
    loadExerciceHistory()
  
}, [props.langue]);

  let displayExercice = exerciceList.map((el, i) => {
    return <Cards exercice={el.exerciceId} key={i} navigation={props.navigation} isUnlock={exerciceNbr}/>;
  })
  

  return (
    
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>{displayExercice}</View>
    </ScrollView>
  );
}

export function Cards(props) {

  console.log(props.isUnlock)

  function goToGame() {
    if (!(props.isUnlock < props.exercice)) {
      props.navigation.navigate("play", {numeroExercice: props.exercice})
    }
  }

  return (
    <LinearGradient
      colors={["#9fa8da", "#6e7fd1", "#4f14b5"]}
      style={styles.card}
    >
      <View>
        <Text style={{ fontSize: 20, fontWeight: "300", color: "white" }}>
          {props.exercice}
        </Text>
      </View>
      <View style={{ height: "70%", justifyContent: "center" }}>
        <Icon
          raised
          name={props.isUnlock < props.exercice? "lock" : "search"}
          type="font-awesome"
          color={props.isUnlock < props.exercice? "#f50" : "green"}
          size={30}
          onPress={goToGame}
        />
      </View>
    </LinearGradient>
  );
}

function mapStateToProps(state) {
  return { langue: state.languageSelect, exo: state.exercice, token: state.token };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "15%",
    justifyContent: "center",
    
  },
  contentContainer:{
    
    paddingBottom: 50,
    
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    width: "40%",
    margin: "3%",
    borderRadius: 15,
  },
});

export default connect(mapStateToProps, null)(GameScreen);
