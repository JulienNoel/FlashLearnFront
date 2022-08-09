import React, {useState} from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Image, KeyboardAvoidingView, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LogScreen () {

    const [pseudo, setPseudo] = useState('')
    const [mail, setMail] = useState ('')
    const [password, setPassword] = useState('')

    useEffect(()=>{      
       async function registerUser() {
         var rawResponse = await fetch(
           `http://192.168.0.12:3000/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `pseudoFromFront=${pseudo}&mailFromFront=${mail}&passwordFromFront=${password}`,
        }
         );
         var response = await rawResponse.json();
         var objectResponse = response.result;
         var objectUser = response.user
        
          if (response.result) {
            const localStorageToken = AsyncStorage.setItem("token", objectUser.token)
          
          }         
       }
       registerUser();      
      
     },[]) 
   

    return (
        
    
    <LinearGradient        
        colors={['#9fa8da', '#6e7fd1', '#4f14b5']}
        style={styles.container}
      >
    
        <View style={{justifyContent: 'center', alignItems: 'center' }}>
            <Image
            style={styles.logo}
            source={require('../assets/logo.png')}
            />
        
           
        <TextInput
            style={styles.input}
            onChangeText={setPseudo}
            value={pseudo}
            placeholder="Pseudo"
            />      
      
      <TextInput
        style={styles.input}
        onChangeText={setMail}
        value={mail}
        placeholder="Mail"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"        
        secureTextEntry={true}
      />
      
      <TouchableOpacity onPress={() => console.log('ok')} style={styles.btn}>
            <Text style={styles.btnTxt}>SIGN UP</Text>
        </TouchableOpacity>
    </View> 
    </LinearGradient>
    
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center',        
    },
    input: {
      height: 50,
      width: 300,      
      borderWidth: 1,
      margin: 15,
      padding: 10,
      borderRadius: 10,
      backgroundColor: 'white'
    },
    btn: {
        height: 50,
        width: 300,
        margin: 15,        
        borderRadius: 10,
        backgroundColor: '#9fa8da',
         
    },
    btnTxt: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white'
        
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 50              
    }
    
  });