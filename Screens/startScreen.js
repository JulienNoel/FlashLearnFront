import React, { useEffect, useRef, useState } from "react";

import { StyleSheet, Text, View, Image, Animated } from 'react-native';

export default function StartScreen (props) {

    const [isLoad, setIsLoad] = useState(false) 

   
     const fadeAnim = useRef(new Animated.Value(0)).current;

     Animated.timing(fadeAnim, {
      toValue: 1.1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    useEffect(()=>{      
      
      const timer = setTimeout(()=>{
        setIsLoad(true)
      }, 2000)
      return () => clearTimeout(timer);
      
    },[])
         
    useEffect(()=>{      
      
      if(isLoad) {
        props.navigation.navigate('BottomNavigator', {screen: 'home'})
        setIsLoad(false)
    }
      
    },[isLoad])    
   
      

    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Animated.View style={{transform: [{scale: fadeAnim}]}}>
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

  