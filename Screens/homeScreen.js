import React from 'react'
import {connect} from 'react-redux';
import {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';


import { AntDesign } from '@expo/vector-icons';



export function HomeScreen (props) {

const [nbreMots, setNbreMots] = useState(5)
const [hello, setHello] = useState('BONJOUR')
const [combiendeMots, setCombiendeMots] = useState('Combien de Mots voulez-vous apprendre ?')
const [selection, setSelection] = useState('')



var changeNbrPlus = () => {
    
    if (nbreMots == 20) {
        setNbreMots(20)
    }else{
        setNbreMots(nbreMots+5)
    }
}

var changeNbrMoins = () => {
    
    if (nbreMots == 5) {
        setNbreMots(5)
    }else{
        setNbreMots(nbreMots-5)
    }
}

var changeLangue = (langue) => {

    if (langue == 'en') {
        setHello('Welcome')
        setCombiendeMots('How many words do you want to learn ?')
    }else if (langue == 'it'){
        setHello('Buongiorno')
        setCombiendeMots('Quante parole vuoi imparare ?')
    }else if (langue == 'pt'){
        setHello('Olá')
        setCombiendeMots('Quantas palavras você quer aprender ?')
    }else if (langue == 'es'){
        setHello('Hola')
        setCombiendeMots('¿Cuántas palabras quieres aprender ?')
    }else if (langue == 'th'){
        setHello('สวัสดี')
        setCombiendeMots('คุณต้องการเรียนรู้คำศัพท์กี่คำ?')
    }
    props.selectLang(langue)
    setSelection(true)
}


var selectionMessage

if (selection === false) {
    selectionMessage = <Text style={{fontSize: 15, color: 'red'}}>Selectionner un language</Text>
}


var handlePressExercice = () => {    
    if (selection) {
        props.navigation.navigate('card', {nbrEx : nbreMots})
        setSelection('')
    }else{
        setSelection(false)
    }
    
}


var listLangues = [ {language: 'Anglais', langAbrev: 'en', image: require('../assets/royaume-uni.png')},
                    {language: 'Italien', langAbrev: 'it', image: require('../assets/italie.png')},
                    {language: 'Espagnol', langAbrev: 'es', image: require('../assets/espagne.png')},
                    {language: 'Thailandais', langAbrev: 'th', image: require('../assets/thailande.png')},
                    {language: 'Portugais', langAbrev: 'pt', image: require('../assets/le-portugal.png')}
                     ]

var displayLang = listLangues.map((lang, i) => {

    return (
        
            <TouchableOpacity key={i}
                            style={{alignItems: "center",                                    
                                    padding: 15}}
                            onPress={() => changeLangue(lang.langAbrev)}
                            >
            <Text>{lang.language}</Text>
            <Image  style={{height: 70, width: 70}}                 
                    source={lang.image}
                        />
            </TouchableOpacity>
    )

})

    return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
    
        <View style={{justifyContent: 'space-evenly', alignItems: 'center', width: '100%', height: '20%', paddingTop: 30, backgroundColor: '#9fa8da'
                        }}>
        
        <Text style={{fontSize: 35, color: 'white', fontFamily: 'Roboto'}}>{hello}</Text>
        </View>

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: '90%'}}>
        <View>{selectionMessage}</View>
            {/* <View style={{alignItems: 'center', width: '90%', marginBottom: 15}}>
                <Text style={{fontSize: 25}}>Language</Text>
            </View> */}
            <ScrollView style={{flex: 1, width: '85%'}}
                        horizontal={true}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>          
                {displayLang}
                </View>
            </ScrollView>
            
        </View>

        <View style={{alignItems: 'center', justifyContent: 'center', width: '90%', height: '10%', marginTop: 20}}>
            <Text style={{fontSize: 25, textAlign: 'center', fontWeight: '500', color: 'grey'}}>{combiendeMots}</Text>
        </View>

        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '90%'}}>
            <TouchableOpacity onPress={() => changeNbrMoins()}>
                <AntDesign name="leftcircleo" size={80} color="#9fa8da"  />
            </TouchableOpacity>
            <Text style={{fontSize: 60}}>{nbreMots}</Text>
            <TouchableOpacity onPress={() => changeNbrPlus()}>
                <AntDesign name="rightcircleo" size={80} color="#9fa8da" />
            </TouchableOpacity> 
            
        </View>

        <View style={{alignItems: 'center', justifyContent: 'center', width: '90%', height: '15%'}}>
            
            <View style={{flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 50}}>
                <TouchableOpacity
                    onPress={() => handlePressExercice()}
                    style={{width: 80,
                            height: 80,
                            justifyContent: 'center',
                            alignItems: 'center',                            
                            borderRadius: 100,
                            backgroundColor: '#dad19f',
                            }}>
                    <Text style={{fontSize: 15, color: 'white'}}>GO</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    </View>
    
    )

}

function mapDispatchToProps(dispatch) {
    return {
      selectLang: function(lang) {
          dispatch( {type: 'selectLang', language: lang} )
      }
    }
   }

export default connect(null, mapDispatchToProps)(HomeScreen);



 