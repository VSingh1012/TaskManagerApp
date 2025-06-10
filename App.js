import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TaskManagerScreen from './screens/TaskManagerScreen';
import SettingsScreen from './screens/Settings';
import { themes } from './Styles';

// Global text rendering function and variables for font overrides
let globalFont = 'System';
let forceUpdateCallbacks = [];

// Function to register components that need to re-render when font changes
const registerForceUpdate = (callback) => {
    forceUpdateCallbacks.push(callback);
    return () => {
        forceUpdateCallbacks = forceUpdateCallbacks.filter(cb => cb !== callback);
    };
};

// Function to trigger re-render of all registered components
const triggerGlobalUpdate = () => {
    forceUpdateCallbacks.forEach(callback => callback());
};

// Rendering of the text components and adding the additional fonts globally for each element
const originalTextRender = Text.render;

Text.render = function(props, ref) {
    const fontFamily = globalFont === 'System' ? undefined : globalFont;
    const newProps = {
        ...props,
        style: [{ fontFamily }, props.style]
    };
    return originalTextRender.call(this, newProps, ref);
};

// Export these functions so other screens can use them
export { registerForceUpdate, triggerGlobalUpdate };

export default function App() {
    const Stack = createStackNavigator();
    
    const [currentTheme, setTheme] = useState("regular");
    const [currentFont, setFont] = useState('System'); // Add font state here
    const [, forceUpdate] = useState({});

    // Register App component for updates
    useEffect(() => {
        const unregister = registerForceUpdate(() => {
            forceUpdate({});
        });
        return unregister;
    }, []);

    // Update global font when changed
    useEffect(() => {
        globalFont = currentFont;
        triggerGlobalUpdate();
    }, [currentFont]);


    
    // ------------------------------------------------ JSX BEGINS HERE ------------------------------------------------------------------------
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Task Manager'>
                <Stack.Screen 
                    name='Task Manager' 
                    children={({ navigation }) => (
                        <TaskManagerScreen 
                            navigation={navigation} 
                            currentTheme={themes[currentTheme]}
                            currentFont={currentFont}
                            setFont={setFont}
                            
                        />
                    )}
                    options={{
                        headerStyle: {
                            backgroundColor: 'rgba(171, 151, 234, 0.8)',
                            elevation: 0,
                            shadowOpacity: 0,
                            borderBottomWidth: 0 
                        },
                        headerTitleStyle: {
                            fontFamily: globalFont === 'System' ? 'Roboto' : globalFont,
                            fontSize: 20,
                            fontWeight: '300',
                            color: 'white',
                        },
                        headerTintColor: 'white',
                    }}
                />
                <Stack.Screen 
                    name='Settings' 
                    children={({ navigation }) => (
                        <SettingsScreen 
                            navigation={navigation} 
                            currentTheme={currentTheme} 
                            setTheme={setTheme}
                            currentFont={currentFont}
                            setFont={setFont}
                        />
                    )} 
                    options={{
                        headerStyle: {
                            backgroundColor: 'rgba(45, 27, 105, 0.8)',
                            elevation: 0,
                            shadowOpacity: 0,
                            borderBottomWidth: 0 
                        },
                        headerTitleStyle: {
                            fontFamily: globalFont === 'System' ? 'Roboto' : globalFont,
                            fontSize: 20,
                            fontWeight: '300',
                            color: 'white'
                        },
                        headerTintColor: 'white'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}