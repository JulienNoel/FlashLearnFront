import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Animated, Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity } from "react-native";
import CountdownScreen from "./countown";


export function PlayScreen(props) {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const [color1, setColor1] = useState('')
  const [color2, setColor2] = useState('')
  const [word, setWord] = useState('')
  const [randomWord, setRandomWord] = useState('')
  const [wordNbr, setWordNbr] = useState(0)
  

  const yAnim = useRef(new Animated.Value(0)).current;


  
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(yAnim, {
      toValue: 900,
      duration: 5000,
      useNativeDriver: true,
      delay: 1000,
      
    }).start(({ finished }) => {
      if (finished) {
        props.navigation.navigate('stat')
    }
    });
  };

fadeIn()

const resetAnimation = () => {
  Animated.timing(yAnim).reset()
 }

  function shuffle (arr) {
    return Math.floor(Math.random()*arr.length)
  }

  function misEnFormeArray (arr) {
    return arr.map(({exerciceId, ...rest}) => {
      return rest
    })
    .reduce(function(prev, curr) {
      return [...prev, curr.w1, curr.w2, curr.w3, curr.w4, curr.w5 ]
    },[])
    .sort(() => Math.random() - 0.5)
  }

  function isCorrect (boolean) {
    boolean? setWordNbr(wordNbr+1) : props.navigation.navigate('stat')
    resetAnimation()
  }

  const colorList = ['red','#FC600A','orange','#FCCC1A','brown','#B2D732','green','#347C98','blue','#4424D6','purple','#C21460']


  useEffect(()=>{ 
    
    let listWordsFR = misEnFormeArray(props.exo[0])      
    setRandomWord(listWordsFR[shuffle(listWordsFR)].toUpperCase())
    
    let filteredExercice = props.exo[0].filter(e => e.exerciceId == props.route.params.numeroExercice)
                                        
    let selectedExerciceArr = misEnFormeArray(filteredExercice)
    
    setWord(selectedExerciceArr[wordNbr].toUpperCase())

    const randColor = () =>  {      
      return colorList[shuffle(colorList)];
  }

  setColor1(randColor)
  setColor2(randColor)

  if (color1 === color2) {
    setColor2(randColor)
  }
     
   },[wordNbr])


  const data =[{word: randomWord,
                color: color1},
              {word: word,
              color: color2}]
              .sort(() => Math.random() - 0.5) //melange des datas pour randomiser le jeu

  
  let displaySquare = data.map((el,i) => {
    return <Square key={i} color={el.color} word={el.word} answer={word} isCorrect={isCorrect} animation={yAnim}/>
  })

  

  return (
    <SafeAreaView style={styles.container}>
      {displaySquare}
    </SafeAreaView>
  );
}

export function Square(props) {


function handleClick() {
  props.answer === props.word? props.isCorrect(true) : props.isCorrect(false)
  
  }

  return (
    <TouchableOpacity onPress={handleClick}>
      <Animated.View
        style={[
          { backgroundColor: props.color },
          styles.fadingContainer,
          {
            transform: [
              {
                translateY: props.animation,
              },
            ],
          },
        ]}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
            {props.word}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
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
    width : 135,
    height: 135,
    borderRadius: 10
  }  
  
});

export default connect(mapStateToProps, null)(PlayScreen);;