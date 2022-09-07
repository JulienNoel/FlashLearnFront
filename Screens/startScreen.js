import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

import { StyleSheet, Image, Animated } from 'react-native';

export function StartScreen (props) {

    const [isLoad, setIsLoad] = useState(false) 
    const [isToken, setIsToken] = useState(false)

   
     const fadeAnim = useRef(new Animated.Value(0)).current;

     Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();


    useEffect(()=>{      
      
      const timer = setTimeout(()=>{
        setIsLoad(true)
      }, 2000)
      return () => clearTimeout(timer);
      
    },[])

    useEffect(() => {
      async function loadExercice() {
        var rawResponse = await fetch(
          `https://flashlearnapp.herokuapp.com/exercice`
        );
        var response = await rawResponse.json();
        var objectResponse = response.result;
  
        props.addExercice(objectResponse);
        
      }
      loadExercice();
    }, []);

    
    AsyncStorage.getItem("token", function(error, data) {
      if (data) {
        console.log(data)
        setIsToken(true)
        props.addToken(data)
      }
     });
      
    
    useEffect(()=>{      
      
      if(isLoad) {
        props.navigation.navigate('BottomNavigator', {screen: 'home'})
        setIsLoad(false)
    }
      
    },[isLoad])    
   
     

    return (
      <LinearGradient
        colors={["#9fa8da", "#6e7fd1", "#4f14b5"]}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Animated.View
          style={{ transform: [{ scale: fadeAnim }], opacity: fadeAnim }}
        >
          <Image style={styles.logo} source={require("../assets/logo.png")} />
        </Animated.View>
      </LinearGradient>
    );

}

function mapDispatchToProps(dispatch) {
  return {
    addExercice: function (exe) {
      dispatch({ type: "addExercice", exercice: exe });
    },
    addToken: function(token) {
      dispatch({ type: 'addToken', token: token})
    }
  };
}
  

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 200,        
    }
    
  });

  export default connect(null, mapDispatchToProps)(StartScreen); 