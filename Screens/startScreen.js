import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet, Text, View, Image, Animated } from 'react-native';

export default function StartScreen (props) {

    const [isLoad, setIsLoad] = useState(false) 
    const [isToken, setIsToken] = useState(false)

   
     const fadeAnim = useRef(new Animated.Value(0)).current;

     Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    const localData = AsyncStorage.getItem("token", function(error, data) {
      if (data) {
        console.log(data)
        setIsToken(true)
      }
     });

    useEffect(()=>{      
      
      const timer = setTimeout(()=>{
        setIsLoad(true)
      }, 2000)
      return () => clearTimeout(timer);
      
    },[])

    // useEffect(()=>{      
    //   async function loadToken() {
    //     var rawResponse = await fetch(
    //       `http://192.168.0.12:3000/token`
    //     );
    //     var response = await rawResponse.json();
    //     var objectResponse = response.token;
        
    //     if (response.result) {
    //       const test = AsyncStorage.setItem("token", objectResponse)
          
    //     }         
    //   }
    //   loadToken();      
      
    // },[!isToken])
         
    useEffect(()=>{      
      
      if(isLoad) {
        props.navigation.navigate('BottomNavigator', {screen: 'home'})
        setIsLoad(false)
    }
      
    },[isLoad])    
   
     

    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#9fa8da'}}>
    <Animated.View style={{transform: [{scale: fadeAnim}], opacity: fadeAnim}}>
        <Image
        style={styles.logo}
        source={require('../assets/logo.png')}
        />
    </Animated.View>
    </View>)

}


  

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 200,        
    }
    
  });

  