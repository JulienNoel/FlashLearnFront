import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import ProgressCircle from "react-native-progress-circle";
import useLanguage from "../hooks/useLanguage";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export function StatScreen(props) {
  
  const [historique, setHistorique] = useState([])
  const listLanguage = ['en','it','es','th','pt']

  

  useEffect(() => {
    
    async function loadHistorique() {

    var rawResponse = await fetch(
      `https://flashlearnapp.herokuapp.com/historique/${props.token}`,
      
    );
    var response = await rawResponse.json();
    setHistorique(response.result)
    }
    loadHistorique()

  }, []);

  
  const langueUtilise = useLanguage(props.langue)

  

  

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-evenly" }}
    >
      <StatCircle compteur={count} />
      
      
    </View>
  );
}

export function StatCircle(props) {

  const [count, setCount] = useState(10);
  let pourcentageValue = 80;

  useEffect(() => {
    if (count < pourcentageValue) {
      const timer = setInterval(() => {
        setCount(count + 1);
      }, 1);

      return () => clearInterval(timer);
    }
  }, [count, pourcentageValue]);


  return (
    <View>
      <ProgressCircle
        percent={count}
        radius={100}
        borderWidth={12}
        color="#4f14b5"
        shadowColor="#9fa8da"
        bgColor="#fff"
      >
        <Text style={{ fontSize: 40 }}>{count}%</Text>
      </ProgressCircle>
      <View
        style={{
          width: "90%",
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <Image
          style={{ height: 80, width: 80 }}
          source={langueUtilise[0].image}
        />
        <Text style={{ fontSize: 30 }}>{langueUtilise[0].language}</Text>
      </View>
    </View>
  );
}



function mapStateToProps(state) {
  return { langue: state.languageSelect, token: state.token };
}

export default connect(mapStateToProps, null)(StatScreen);
