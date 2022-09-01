import React, {useState, useEffect} from "react";
import { connect } from "react-redux";

import ProgressCircle from 'react-native-progress-circle'
import useLanguage from "../hooks/useLanguage";

import { StyleSheet, Text, View, Image } from "react-native";

export function StatScreen(props) {

  const [count, setCount] = useState(10)

  let pourcentageValue = 80
  
  useEffect(() => {
  
    if (count < pourcentageValue) {
  
      const timer = setInterval(()=>{
        setCount(count+1)        
        }, 1)
      
      return () => clearInterval(timer); 
    }
           
  },[count, pourcentageValue])

  const langueUtilise = useLanguage(props.langue)
  console.log(langueUtilise)

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "space-evenly" }}>
      
      <StatCircle compteur={count}/>
      <View style={{alignItems: "center", justifyContent: "center" }}>
      <Image
              style={{ height: 80, width: 80 }}
              source={langueUtilise[0].image}
            />
            <Text style={{ fontSize: 30 }}>{langueUtilise[0].language}</Text>
      </View>

    </View>
  );
}

export function StatCircle(props) {
  

  return (
    <View >
      <ProgressCircle
        percent={props.compteur}
        radius={100}
        borderWidth={12}
        color="#4f14b5"
        shadowColor="#9fa8da"
        bgColor="#fff"
        
      >
        <Text style={{ fontSize: 40 }}>{props.compteur}%</Text>
      </ProgressCircle>
    </View>
  );
}


function mapStateToProps(state) {
  return { langue: state.languageSelect, exo: state.exercice };
}

export default connect(mapStateToProps, null)(StatScreen);
