import React, { useRef } from "react";
import { Animated, Text, View, StyleSheet, Button, SafeAreaView } from "react-native";

const PlayScreen = () => {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const yAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(yAnim, {
      toValue: 1000,
      duration: 5000,
      useNativeDriver: true,
      delay: 3000
    }).start();
  };

  
  fadeIn()
  

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            // Bind opacity to animated value
            transform:[{
                translateY: yAnim
            }               
            ]
          }
        ]}
      >
        <Text style={styles.fadingText}>test</Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    justifyContent: "flex-start",
    alignItems: 'center'
  },
  fadingContainer: {    
    backgroundColor: "powderblue",
    width : 190,
    height: 190,
  },
  fadingText: {
    fontSize: 28
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: "space-evenly",
    marginVertical: 16
  }
});

export default PlayScreen;