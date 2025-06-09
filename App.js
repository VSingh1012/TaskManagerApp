import { StatusBar } from 'expo-status-bar';
import React, { useRef, useEffect, useState } from 'react';
import { Animated, ImageBackground, StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TaskManagerScreen from './screens/TaskManagerScreen';
import SettingsScreen from './screens/Settings';
import { styles, themes } from './Styles';

export default function App() {

  const Stack = createStackNavigator();
 
  const [currentTheme, setTheme] = useState("regular");

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Task Manager'>
        <Stack.Screen name='Task Manager' 
        children= {({ navigation }) => <TaskManagerScreen navigation={navigation} currentTheme={themes[currentTheme]}/>}
        options={{
            headerStyle: {
              backgroundColor: 'rgba(171, 151, 234, 0.8)',
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth : 0 
            },
            headerTitleStyle: {
              fontFamily: 'Roboto',
              fontSize: 20,
              fontWeight: '300',
              color: 'white',
            },
            headerTintColor: 'white', // Changed from 'transparent' to 'white'
        }}
        />
        <Stack.Screen name='Settings' 
        children={({ navigation }) => <SettingsScreen navigation={navigation} currentTheme={currentTheme} setTheme={setTheme}/>} 
        options={{
          headerStyle: {
            backgroundColor: 'rgba(45, 27, 105, 0.8)',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth : 0 
          },
          headerTitleStyle : {
            fontFamily : 'Roboto',
            fontSize : 20,
            fontWeight : '300',
            color : 'white'
          },
          headerTintColor: 'white' // Added this line for consistency
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}