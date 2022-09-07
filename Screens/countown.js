import React, {useState, useEffect} from "react";
import { Text, View } from "react-native";


export default function CountdownScreen(props) {

    const [count, setCount] = useState(3)
    const [color, setColor] = useState('orangered')
    
    
  
  useEffect(() => {
  
    if (count > 0) {
  
      const timer = setInterval(()=>{
        setCount(count-1)
        
        }, 1000)
      
      return () => clearInterval(timer); 
    }else {
      //setCount(0)
      setColor('seagreen')
      const timer2 = setTimeout(() =>{ 
        props.navigation.navigate('play',{numeroExercice: props.route.params.numeroExercice})
      },1000)
      return () => clearTimeout(timer2)
    }
           
  },[count])


  
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{fontSize: 100, color: color}}>{count === 0 ? 'Go !' : count}</Text>
      </View>
    );
  }
