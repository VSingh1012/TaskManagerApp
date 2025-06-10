import { StatusBar } from 'expo-status-bar';
import { Animated, ImageBackground, StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import { styles, themes } from '../Styles';
import React, { useEffect, useState } from 'react';
import { registerForceUpdate } from '../App'; 

export default function SettingsScreen({ currentTheme, setTheme, currentFont, setFont }) {
    // Force update use state for dynamic font renderings after change
    const [, forceUpdate] = useState({}); 

    // Method that returns the key based on dictionary mapped version of themes object
    const getThemeKey = () => {
        for (const [key, value] of Object.entries(themes)) {
            if (value === currentTheme) {
                return key;
            }
        }
        return 'regular'; // falls back on regular 
    }

    // Register this component for force updates
    useEffect(() => {
        const unregister = registerForceUpdate(() => {
            forceUpdate({});
        });
        return unregister;
    }, []);

    return (
        <ImageBackground source={require('../assets/background-settings.jpg')}>
            <View style={styles.SettingsBox}>
                <View style={styles.featureView}>
                    <Text style={styles.settingsHeadingStyle}> Change Background Theme </Text>
                    <Picker style={styles.wallpaperPicker} value={currentTheme} selectedValue={getThemeKey()} onValueChange={(value) => setTheme(value)}> 
                        <Picker.Item label="Regular" value={"regular"}/>
                        <Picker.Item label="Spacial" value={"spacial"}/>
                        <Picker.Item label="Evening" value={"evening"}/>
                        <Picker.Item label="Futuristic" value={"futuristic"}/>
                    </Picker>
                </View>

                <View style={styles.featureView}>
                    <Text style={styles.settingsHeadingStyle}> Change Text Font </Text>
                    <Picker style={styles.fontPicker} selectedValue={currentFont} onValueChange={setFont}>
                        <Picker.Item label="Roboto" value="Roboto"/>
                        <Picker.Item label="Sans Serif" value="sans-serif"/>
                        <Picker.Item label="Serif" value="serif"/>
                        <Picker.Item label="Monospace" value="monospace"/>
                    </Picker>
                </View>
            </View>
        </ImageBackground>
    );
}