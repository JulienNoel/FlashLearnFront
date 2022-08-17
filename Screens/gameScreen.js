import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Card, Icon } from "@rneui/themed";
import { LinearGradient } from 'expo-linear-gradient';

export function GameScreen(props) {
  const [exerciceList, setExerciceList] = useState([]);

  useEffect(() => {
    setExerciceList(props.exo[0]);
    console.log(props.exo[0]);
  }, []);

  const displayExercice = exerciceList.map((el, i) => {
    return (
    
        
    
    <LinearGradient        
        colors={['#9fa8da', '#6e7fd1', '#4f14b5']}
        style={styles.card}
        key={i}
        
      >
        <View>
            <Text style={{fontSize: 20, fontWeight: '300', color: 'white'}}>{el.exerciceId}</Text>
        </View>
        <View style={{height: '70%', justifyContent: 'center'}}>
        <Icon
        raised
        name='lock'
        type='font-awesome'
        color='#f50'
        size={30}
        onPress={() => props.navigation.navigate('play')}        
        />
        </View>
        </LinearGradient>       
      
       
    );
  });

  return (
    
        <ScrollView showsVerticalScrollIndicator={false}>
                    
        <View style={styles.container}>
            {displayExercice}
        </View>
        </ScrollView>
    
  );
}

function mapStateToProps(state) {
  return { langue: state.languageSelect, exo: state.exercice };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: '15%',
        justifyContent: 'center'       
    },
    card: {                                              
        alignItems: 'center',
        justifyContent: 'center',
        height: '10%',
        width: '40%',        
        margin: '3%',
        borderRadius: 15,
        
                               
    },
    
    
  });

export default connect(mapStateToProps, null)(GameScreen);
