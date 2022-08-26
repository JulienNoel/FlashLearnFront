import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Animated, Text, View, StyleSheet, Button, SafeAreaView } from "react-native";
import { color } from "@rneui/base";

export function PlayScreen(props) {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const [color1, setColor1] = useState('')
  const [color2, setColor2] = useState('')
  const [word, setWord] = useState('')
  const [randomWord, setRandomWord] = useState('')

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

  useEffect(()=>{      
      
    const randColor = () =>  {
      return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
  }
  setColor1(randColor)
  setColor2(randColor)

  if (color1 === color2) {
    setColor2(randColor)
  }
    
  },[])

  useEffect(()=>{      
      
   let listWordsFR = props.exo[0]
        .map(({exerciceId, ...rest}) => {
          return rest
        })
        .reduce(function(prev, curr) {
          return [...prev, curr.w1, curr.w2, curr.w3, curr.w4, curr.w5 ]
        },[])
   
  const randomIndex = Math.floor(Math.random()*listWordsFR.length)
  setRandomWord(listWordsFR[randomIndex])
   console.log(randomWord)
  

    
  },[])

  

  
  fadeIn()
  

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[{backgroundColor: color1},
          styles.fadingContainer,
          {
            transform:[{
                translateY: yAnim
            }               
            ]
          }
        ]}
      >
        <Text>{word}</Text>
      </Animated.View>
      <Animated.View
        style={[{backgroundColor: color2},
          styles.fadingContainer1,
          {
            transform:[{
                translateY: yAnim
            }               
            ]
          }        

        ] }
      >
        <Text>{randomWord}</Text>
      </Animated.View>
    </SafeAreaView>
  );
}

function mapStateToProps(state) {
  return { langue: state.languageSelect, exo: state.exercice, token: state.token };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',    
    justifyContent: "space-evenly",
    
  },
  fadingContainer: {     
    width : 120,
    height: 120,
  },
  fadingContainer1: {      
    width : 120,
    height: 120,
  }
  
  
});

export default connect(mapStateToProps, null)(PlayScreen);;