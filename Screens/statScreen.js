import React, {useState, useEffect, useCallback} from "react";

import ProgressCircle from 'react-native-progress-circle'

import { StyleSheet, Text, View } from "react-native";

export default function StatScreen(props) {

  const [count, setCount] = useState(0)

  let pourcentageValue = 80
  
  useEffect(() => {
  
    if (count < pourcentageValue) {
  
      const timer = setInterval(()=>{
        setCount(count+1)        
        }, 20)
      
      return () => clearInterval(timer); 
    }
           
  },[count, pourcentageValue])

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      
      <StatCircle compteur={count}/>

    </View>
  );
}

export function StatCircle(props) {
  

  return (
    <View>
      <ProgressCircle
        percent={props.compteur}
        radius={75}
        borderWidth={12}
        color="#4f14b5"
        shadowColor="#9fa8da"
        bgColor="#fff"
        
      >
        <Text style={{ fontSize: 30 }}>{props.compteur}%</Text>
      </ProgressCircle>
    </View>
  );
}
