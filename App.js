import React from 'react'
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';

import languageSelect from './reducers/language.reducer'
import exercice from './reducers/exercice.reducer'
import token from './reducers/token.reducer'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './Screens/homeScreen'
import StatScreen from './Screens/statScreen';
import CardScreen from './Screens/cardScreen';
import StartScreen from './Screens/startScreen';
import LogScreen from './Screens/logScreen';
import NotificationScreen from './Screens/notificationsScreen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const store = createStore(combineReducers({languageSelect, exercice, token}));


function BottomNavigator () {

  return (
    
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {      
        backgroundColor: '#9fa8da',
        height: '6%'
        },
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name == 'home') {
            iconName = 'md-home-sharp';
          }else if (route.name == 'stat') {
            iconName = 'stats-chart';
          }
  
          return <Ionicons name={iconName} size={22} color={color} />;
        },
        })}
      
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'white',
        
      }}
      
    >
      <Tab.Screen name="home" component={HomeScreen} />      
      <Tab.Screen name="stat" component={StatScreen} />
      
    </Tab.Navigator>
    
  );
}

export default function App() {

  return (
    
    <Provider store={store}>
      <NavigationContainer>      
        <Stack.Navigator screenOptions={{headerShown: false}}> 
          <Stack.Screen name="start" component={StartScreen} />          
          <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
          <Stack.Screen name="card" component={CardScreen} />
          <Stack.Screen name="signup" component={LogScreen} />         
        </Stack.Navigator>     
      </NavigationContainer>
    </Provider>
    
  );
}

