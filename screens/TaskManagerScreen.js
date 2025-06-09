import { StatusBar } from 'expo-status-bar';
import React, { useRef, useEffect, useState } from 'react';
import { Animated, ImageBackground, Text, TextInput, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles, themes } from '../Styles';
import { format } from 'date-fns';





export default function TaskManagerScreen( { navigation, currentTheme }) {

    const MAX_COMPLETED_TASKS = 5;
    const currentDate = new Date();
    const formattedDate = format(currentDate, "MM-dd-yyyy");
    const day = format(currentDate, "eeee");
    const month = format(currentDate, 'MMMM');
    const numDay = format(currentDate, 'd');
    const year = format(currentDate, 'yyyy');
    
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [activeTasks, setActiveTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [dropDownColor, setDropDownColor] = useState('#ffb550');
    const [taskAdded, setTaskAdded] = useState(false);
    const [messageVisible, setMessageVisible] = useState(true);
   

    

    
    const addTask = () => {
    if (task.trim() && description.trim()) {
        setActiveTasks((prevTasks) => { 
        
        const newTask = { id: Math.random().toString(), taskVal : task, descriptionVal : description, color : dropDownColor };
        const newList = [...prevTasks, newTask];
        
        return newList;
        });
        setDropDownColor('#ffb550');
        setTaskAdded(true); 
        setMessageVisible(false);
    }
    setTask('');
    setDescription('');
    };
    
    
    const deleteTask = (taskId) => {
    setActiveTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }


    const completeTask = (taskId) => {
    const completedTask = activeTasks.find((t) => taskId === t.id);
    if (!completedTask) {
        return;
    }

    deleteTask(taskId);

    setCompletedTasks((prev) => { 
        const updatedList = [...prev, completedTask]
    
        if (updatedList.length > MAX_COMPLETED_TASKS) {
        return updatedList.slice(-MAX_COMPLETED_TASKS);
        }

        return updatedList;

    });

    // console.log(completeTasks);

    };

    function ActiveTask( { task, onComplete, onDelete } ) {

    const currentOpacity = useRef(new Animated.Value(1)).current;

    
    // Function for the actual fade out animation 
    const handleTask = () => {
        Animated.timing(currentOpacity, {
        duration : 300,
        toValue : 0,
        useNativeDriver : true
        }).start(() => onComplete(task.id));
    };


    return (
        <Animated.View style={[styles.listItem, { backgroundColor : task.color, opacity : currentOpacity }]}>
            <TouchableOpacity style={styles.checkBox} onPress={handleTask}></TouchableOpacity>

            <View style={styles.textContainer}> 
            <Text style={styles.listText}> {task.taskVal} </Text> 
            <Text style={styles.descriptionText}> {task.descriptionVal} </Text>
            </View>
        
            <Text style={styles.dateText}>Date Started: {formattedDate}</Text>

            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(task.id)}>
            <Text style={styles.deleteButtonText}> ❌ </Text>
            </TouchableOpacity> 
        </Animated.View>

    );
    }


    function CompletedTask( { task } ) {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacity, {
        toValue : 1,
        duration : 300, 
        useNativeDriver : true
        }).start();
    }, []);
    
    return (
        <Animated.View style={[styles.listItem, opacity]}>
        <View style={styles.checkBox}>
                <Text style={styles.checkMark}>✓</Text>
            </View>

            <View style={styles.textContainer}>
            <Text style={styles.completedText}> {task.taskVal} </Text>
            <Text style={styles.completedDescriptionText}> {task.descriptionVal} </Text>
            </View>
        </Animated.View>
    );


    }



    // JSX Elements begin here ----------------------------------------------------------------------

    return (
    

    <ImageBackground style={styles.screen} source={currentTheme}>
    <ScrollView contentContainerStyle={{ padding : 20 }}>
        {/* TITLE */}

        <View style={styles.titleView}>
        <Text style={styles.title}>{day}, {month} {numDay}, {year}!</Text>
        <StatusBar style="auto" /> 

        <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.settingsButtonText}>⚙️</Text>
        </TouchableOpacity>

        </View>





        {/* BEGINNING OF PROMPT VIEW  */}
        <View style={styles.promptStyle}>

        {/* DROPDOWN MENU */}
        <Picker style={styles.picker} selectedValue={dropDownColor} onValueChange={(color) => setDropDownColor(color)}> 
        <Picker.Item label="🟨" value='#ffb550'/>
        <Picker.Item label="🟧" value='#fff400'/>
        <Picker.Item label="🟥" value='#d83f6c'/>
        </Picker>


        {/* TEXT INPUT FIELD */}
        <TextInput 
        style={styles.taskInput} placeholderTextColor={'grey'} placeholder="Add a new task..." value={task}
        onChangeText={setTask}>
        </TextInput>

        <TextInput style={styles.descriptionInput} placeholderTextColor={'grey'} placeholder='Add a short description for your task...' value={description}
        onChangeText={setDescription}>
        </TextInput>

    
        {/* BUTTON */}
        <TouchableOpacity onPress={addTask} style={styles.button}>
        <Text style={styles.buttonText}> Add </Text> 
        </TouchableOpacity>


        </View>
    
    {messageVisible && <>

    
        <View>
        <Text style={styles.priorityMessage}>Add a reminder with a short description to get started! Choose any of the priority colors to set 
            priorities to your alerts! </Text>
        <Text style={styles.priorityMessage}>Yellow is for low, Orange is for medium, and Red is for high priorities!</Text>
        </View>     
        </>}


        
    {/* CURRENT TASKS FLAT LIST */}

    {taskAdded && (<>

        <Text style={styles.headingStyle}> Current Tasks: </Text>
        <FlatList style={styles.listStyle} data={activeTasks} scrollEnabled={false}
        renderItem={({ item }) => (<ActiveTask 
        task={item}
        onComplete={completeTask}
        onDelete={deleteTask}
        backgroundColor={item.color}
        />)}
        keyExtractor= {(item) => item.id} 
        ListEmptyComponent={<Text style={styles.emptyTextStyle}>There are no tasks available at the moment!</Text>}        
        />



        {/* COMPLETED TASKS FLAT LIST */}

        <Text style={styles.headingStyle}> Completed Tasks: </Text>
        <FlatList
        style={styles.listStyle}
        data={completedTasks}
        scrollEnabled={false}
        renderItem={({ item }) => (<CompletedTask
        task={item}
        />)}
        keyExtractor= {(item) => item.id} 
        ListEmptyComponent={<Text style={styles.emptyTextStyle}>There are no completed tasks currently!</Text>}        
        />
    

    </>)}
    </ScrollView>

    </ImageBackground>
    );
}