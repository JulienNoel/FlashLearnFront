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
      delay: 3000,
      
    }).start();
  };

  
  fadeIn()
  

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            transform:[{
                translateY: yAnim
            }               
            ]
          }
        ]}
      >
        <Text>1</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.fadingContainer1,
          {
            transform:[{
                translateY: yAnim
            }               
            ]
          }
        ]}
      >
        <Text>2</Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',    
    justifyContent: "space-evenly",
    
  },
  fadingContainer: {    
    backgroundColor: "powderblue",
    width : 120,
    height: 120,
  },
  fadingContainer1: {    
    backgroundColor: "limegreen",
    width : 120,
    height: 120,
  }
  
  
});

export default PlayScreen;