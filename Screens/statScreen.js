import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import ProgressCircle from "react-native-progress-circle";
import useLanguage from "../hooks/useLanguage";

import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export function StatScreen(props) {
  
  const [historique, setHistorique] = useState([])
  const [nbrTotalExercice, setNbrTotalExercice] = useState(0)
    

  useEffect(() => {
    
    async function loadHistorique() {

    var rawResponse = await fetch(
      `https://flashlearnapp.herokuapp.com/historique/${props.token}`,
      
    );
    var response = await rawResponse.json();
    setHistorique(response.result)
    setNbrTotalExercice(response.nbrExercice)
    }
    loadHistorique()

  }, []);

  
  
  let displayCircles = historique.map((el, i) => {
    return <StatCircle key={i} lang={el.langue} exeDone={el.nbrExercice} totalExercice={nbrTotalExercice}/>
  })

  

  return (
    <View style={{ flex: 1, justifyContent: "space-evenly", alignItems:'center', marginTop: 25}}>
      {displayCircles}
    </View>
  );
}

export function StatCircle(props) {

  const [count, setCount] = useState(0);
  let pourcentageValue = Math.floor(props.exeDone/props.totalExercice*100);
  const langueUtilise = useLanguage(props.lang)

  useEffect(() => {
    if (count < pourcentageValue) {
      const timer = setInterval(() => {
        setCount(count + 1);
      }, 1);

      return () => clearInterval(timer);
    }
  }, [count, pourcentageValue]);



  return (
    
      <View style={{width: '70%', height: 130, flexDirection:'row', alignItems:'center', justifyContent: 'center'}}>
        <View>
        <ProgressCircle
          percent={count}
          radius={60}
          borderWidth={12}
          color="#4f14b5"
          shadowColor="#9fa8da"
          bgColor="#fff"
          
        >
          <Text style={{ fontSize: 25 }}>{count}%</Text>
        </ProgressCircle>
        </View>
        <View style={{width: '70%', height: 130, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            style={{ height: 70, width: 70 }}
            source={langueUtilise[0].image}
          />
          <Text style={{ fontSize: 20 }}>{langueUtilise[0].language}</Text>
        </View>
      </View>
    
    
  );
}



function mapStateToProps(state) {
  return { langue: state.languageSelect, token: state.token };
}

export default connect(mapStateToProps, null)(StatScreen);
