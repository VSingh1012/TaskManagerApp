import { StatusBar } from 'expo-status-bar';
import React, { useRef, useEffect, useState } from 'react';
import { Animated, ImageBackground, Text, TextInput, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles, themes } from '../Styles'; // Importing styles and themes
import { format } from 'date-fns'; // Import date-fns for date formatting
import { registerForceUpdate } from '../App'; // Register function for font updates

export default function TaskManagerScreen( { navigation, currentTheme }) {
    const MAX_COMPLETED_TASKS = 3; // Maximum completed tasks allowed
    const [, forceUpdate] = useState({}); // Force re-render state

    // Date formatting using date-fns
    const currentDate = new Date();
    const day = format(currentDate, "eeee");
    const month = format(currentDate, 'MMMM');
    const numDay = format(currentDate, 'd');
    const year = format(currentDate, 'yyyy');

    // State hooks for managing tasks, descriptions, and other UI elements
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [activeTasks, setActiveTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [dropDownColor, setDropDownColor] = useState('#fff400'); 
    const [taskAdded, setTaskAdded] = useState(false);
    const [messageVisible, setMessageVisible] = useState(true); 

    // Register this component for font updates
    useEffect(() => {
        const unregister = registerForceUpdate(() => {
            forceUpdate({});
        });
        return unregister;
    }, []); // Run only on initial render

    // Function to add a new task to active tasks list
    const addTask = () => {
        if (task.trim() || (task.trim() && description.trim())) { // Check if task and description are not empty
            setActiveTasks((prevTasks) => { 
                const newTask = { 
                    id: Math.random().toString(), 
                    taskVal: task, 
                    descriptionVal: description, 
                    color: dropDownColor, 
                    startDate: format(new Date(), "MM/dd/yyyy") // Save the start date of the task
                };
                const newList = [...prevTasks, newTask]; // Add new task to list
                if (newList.length > MAX_COMPLETED_TASKS) {
                    return newList.slice(-MAX_COMPLETED_TASKS); // Limit the number of active tasks
                }
                return newList;
            });
            setDropDownColor('#fff400'); 
            setTaskAdded(true); 
            setMessageVisible(false);
        }
        // Reset inputs
        setTask('');
        setDescription('');
    };

    // Function to delete a task from active tasks
    const deleteTask = (taskId) => {
        setActiveTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }

    // Function to delete a task from completed tasks
    const deleteCompletedTask = (taskId) => {
        setCompletedTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }

    // Function to mark a task as completed
    const completeTask = (taskId) => {
        const completedTask = activeTasks.find((t) => taskId === t.id);
        if (!completedTask) return;

        deleteTask(taskId); // Remove from active tasks
        setCompletedTasks((prev) => {
            const updatedList = [...prev, completedTask];
            if (updatedList.length > MAX_COMPLETED_TASKS) {
                return updatedList.slice(-MAX_COMPLETED_TASKS); // Limit completed tasks
            }
            return updatedList;
        });
    };

    // Animated button for handling task interactions
    function AnimatedButtonWithOpacity({ onPress, style, children }) {
        const scaleValue = useRef(new Animated.Value(1)).current;
        const opacityValue = useRef(new Animated.Value(1)).current;

        const handlePressIn = () => {
            Animated.parallel([
                Animated.timing(scaleValue, {
                    toValue: 0.9,
                    duration: 35,
                    useNativeDriver: true
                }),
                Animated.timing(opacityValue, {
                    toValue: 0.7,
                    duration: 35,
                    useNativeDriver: true
                })
            ]).start();
        };

        const handlePressOut = () => {
            Animated.parallel([
                Animated.timing(scaleValue, {
                    toValue: 1,
                    duration: 35,
                    useNativeDriver: true
                }),
                Animated.timing(opacityValue, {
                    toValue: 1,
                    duration: 35,
                    useNativeDriver: true
                })
            ]).start();
        };

        return (
            <TouchableOpacity
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={1}
            >
                <Animated.View style={[style, { transform: [{ scale: scaleValue }], opacity: opacityValue }]}>
                    {children}
                </Animated.View>
            </TouchableOpacity>
        );
    }

    // Render ActiveTask component with animation and task details
    function ActiveTask({ task, onComplete, onDelete }) {
        const currentOpacity = useRef(new Animated.Value(1)).current;

        // Handle task fade out animation
        const handleTask = () => {
            Animated.timing(currentOpacity, {
                duration: 300,
                toValue: 0,
                useNativeDriver: true
            }).start(() => onComplete(task.id));
        };

        return (
            <Animated.View style={[styles.listItem, { backgroundColor: task.color, opacity: currentOpacity }]}>
                <TouchableOpacity style={styles.checkBox} onPress={handleTask}></TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.listText}>{task.taskVal}</Text>
                    <Text style={styles.descriptionText}>{task.descriptionVal}</Text>
                </View>
                <Text style={styles.dateText}>Date Started: {task.startDate}</Text>
                <AnimatedButtonWithOpacity style={styles.deleteButton} onPress={() => onDelete(task.id)}>
                    <Text style={styles.deleteButtonText}> ❌ </Text>
                </AnimatedButtonWithOpacity>
            </Animated.View>
        );
    }

    // Render CompletedTask component
    function CompletedTask({ task, onDelete }) {
        return (
            <Animated.View style={styles.listItem}>
                <View style={styles.checkBox}>
                    <Text style={styles.checkMark}>✓</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.completedText}>{task.taskVal}</Text>
                    <Text style={styles.completedDescriptionText}>{task.descriptionVal}</Text>
                </View>
                <Text style={styles.completedDateText}>Date Completed: {format(new Date(), "MM/dd/yyyy")}</Text>
                <AnimatedButtonWithOpacity style={styles.deleteButton} onPress={() => onDelete(task.id)}>
                    <Text style={styles.deleteButtonText}> ❌ </Text>
                </AnimatedButtonWithOpacity>
            </Animated.View>
        );
    }

    // JSX Elements for rendering
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={styles.screen} source={currentTheme}>
                <ScrollView contentContainerStyle={{ padding: 10, flexGrow: 1 }} style={{ flex: 1 }}>
                    {/* Title */}
                    <View style={styles.titleView}>
                        <Text style={styles.title}>{day}, {month} {numDay}, {year}!</Text>
                        <StatusBar style="auto" />
                        <AnimatedButtonWithOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
                            <Text style={styles.settingsButtonText}>⚙️</Text>
                        </AnimatedButtonWithOpacity>
                    </View>

                    {/* Prompt View */}
                    <View style={styles.promptStyle}>
                        {/* Dropdown Menu for Task Priority */}
                        <Picker style={styles.picker} selectedValue={dropDownColor} onValueChange={(color) => setDropDownColor(color)}>
                            <Picker.Item label="🟨" value='#fff400' />
                            <Picker.Item label="🟧" value='#ffb550' />
                            <Picker.Item label="🟥" value='#d83f6c' />
                        </Picker>

                        {/* Task Input Field */}
                        <TextInput style={styles.taskInput} placeholderTextColor={'grey'} placeholder="Add a new task..." value={task} onChangeText={setTask} />

                        {/* Description Input Field */}
                        <TextInput style={styles.descriptionInput} placeholderTextColor={'grey'} placeholder='Add a short description for your task...' value={description} onChangeText={setDescription} />

                        {/* Add Task Button */}
                        <AnimatedButtonWithOpacity onPress={addTask} style={styles.addButton}>
                            <Text style={styles.addButtonText}> Add </Text>
                        </AnimatedButtonWithOpacity>
                    </View>

                    {/* Message for first-time task creation */}
                    {messageVisible && (
                        <View style={styles.priorityView}>
                            <Text style={styles.firstPartPriorityMsg}>Add a reminder with a short description to get started! Choose any of the priority colors to set priorities to your alerts!</Text>
                            <Text style={styles.secondPartPriorityMsg}>🟨 is for low, 🟧 is for medium, and 🟥 is for high priorities!</Text>
                        </View>
                    )}

                    {/* Current Tasks List */}
                    {taskAdded && (
                        <>
                            <Text style={styles.headingStyle}> Current Tasks: </Text>
                            <FlatList
                                style={styles.listStyle}
                                data={activeTasks}
                                scrollEnabled={false}
                                renderItem={({ item }) => (
                                    <ActiveTask task={item} onComplete={completeTask} onDelete={deleteTask} backgroundColor={item.color} />
                                )}
                                keyExtractor={(item) => item.id}
                                ListEmptyComponent={<Text style={styles.emptyTextStyle}>There are no tasks available at the moment!</Text>}
                            />

                            {/* Completed Tasks List */}
                            <Text style={styles.headingStyle}> Completed Tasks: </Text>
                            <FlatList
                                style={styles.listStyle}
                                data={completedTasks}
                                scrollEnabled={false}
                                renderItem={({ item }) => (
                                    <CompletedTask task={item} onDelete={deleteCompletedTask} />
                                )}
                                keyExtractor={(item) => item.id}
                                ListEmptyComponent={<Text style={styles.emptyTextStyle}>There are no completed tasks currently!</Text>}
                            />
                        </>
                    )}
                </ScrollView>
            </ImageBackground>
        </View>
    );
}
