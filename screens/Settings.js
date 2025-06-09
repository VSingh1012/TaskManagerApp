import { StatusBar } from 'expo-status-bar';
import { Animated, ImageBackground, StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import { styles, themes } from '../Styles';
import React, { useState } from 'react';


export default function SettingsScreen({ currentTheme, setTheme }) {

    const getThemeKey = () => {

        for (const [key, value] of Object.entries(themes)) {
            if (value === currentTheme) {
                return key;
            }
        }
        return 'regular';
    }
    




    return (

        <ImageBackground source={require('../assets/background-settings.jpg')}>
        <View style={styles.SettingsBox}>

        <View style={styles.featureView}>

        <Text style={styles.headingStyle}> Change Background Theme </Text>
        <Picker style={styles.wallpaperPicker} value={currentTheme} selectedValue={getThemeKey()} onValueChange={(value) => setTheme(value)}> 
            <Picker.Item label="Regular" value={"regular"}/>
            <Picker.Item label="Spacial" value={"spacial"}/>
            <Picker.Item label="Evening" value={"evening"}/>
            <Picker.Item label="Futuristic" value={"futuristic"}/>
        </Picker>
        </View>

        </View>

        </ImageBackground>


    );
   
    


}

// const themes = {
//     regular : './background-regular',
//     spacial : './background-enchanting.jpg',
//     futuristic : './background-future.jpg',
//     evening : './background-evening.jpg'
// }