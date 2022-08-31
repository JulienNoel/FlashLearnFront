import React, {useState, useEffect, useCallback} from "react";

import ProgressCircle from 'react-native-progress-circle'

import { StyleSheet, Text, View } from "react-native";

export default function StatScreen() {

  const [count, setCount] = useState(0)

  let pourcentageValue = 33
  

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      
      <StatCircle />

    </View>
  );
}

export function StatCircle() {
  

  return (
    <View>
      <ProgressCircle
        percent={33}
        radius={75}
        borderWidth={12}
        color="#4f14b5"
        shadowColor="#9fa8da"
        bgColor="#fff"
        
      >
        <Text style={{ fontSize: 30 }}>33%</Text>
      </ProgressCircle>
    </View>
  );
}
