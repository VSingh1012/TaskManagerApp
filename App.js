import { StatusBar } from 'expo-status-bar';
import React, { useRef, useEffect, useState } from 'react';
import { Animated, ImageBackground, StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function App() {
 
// use state variables and lists defined here

  const MAX_COMPLETED_TASKS = 5;

  
  const [task, setTask] = useState('');

  const [activeTasks, setActiveTasks] = useState([]);

  const [completedTasks, setCompletedTasks] = useState([]);

  const [dropDownColor, setDropDownColor] = useState('#ffb550');

  const [taskAdded, setTaskAdded] = useState(false);

  // const [messageVisible, setMessageInvisible] = useState(true);

  // const [crossOverTask, setCrossOverTask] = useState('');





  const addTask = () => {
    if (task.trim()) {
      setActiveTasks((prevTasks) => { 
        
        const newTask = { id: Math.random().toString(), value: task, color : dropDownColor };
        const newList = [...prevTasks, newTask];
        
        return newList;
      });
      setTask('');
      setDropDownColor('#ffb550');
      setTaskAdded(true); 
    }
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
            <Text style={styles.listText}> {task.value} </Text>
          </View>
          
          <TouchableOpacity style={styles.button} onPress={() => onDelete(task.id)}>
            <Text style={styles.buttonText}> Delete </Text>
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

          <Text style={styles.completedText}> {task.value} </Text>
      </Animated.View>
    );


  }





  return (
    

    <ImageBackground style={styles.screen} source={require('./assets/background-enchanting.jpg')}>
    <ScrollView contentContainerStyle={{ padding : 20 }}>
      {/* TITLE */}
      <Text style={styles.title}>Tasks Go!</Text>
      <StatusBar style="auto" /> 





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
      style={styles.input} placeholderTextColor={'grey'} placeholder="Add a new task" value={task}
      onChangeText={setTask}>
      </TextInput>

    
      {/* BUTTON */}
      <TouchableOpacity onPress={addTask} style={styles.button}>
      <Text style={styles.buttonText}> ADD </Text> 
      </TouchableOpacity>


      </View>


        
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

const styles = StyleSheet.create({
  screen : {
    // backgroundColor : '#C2E1F2',
    flex : 1,
    height : 'auto',
    width : 'auto'
  },


  title : {
    textAlign: 'left',
    fontFamily : "TamilSangamMN-Bold",
    color : 'white',
    fontWeight : 'bold',
    fontSize : 49, 
    marginBottom : 20,
  },

  promptStyle : {
    backgroundColor : "transparent", 
    flexDirection : 'row',
    justifyContent : 'space-between',
    marginBottom : 30
  },

  button : {
    borderRadius : 25,
    backgroundColor : 'white',
    textAlign : 'center',
    paddingVertical : 10
  },

  buttonText : {
    color : '#000000',
    fontWeight : 'bold',
    fontSize: 20
  },

  input : {
    backgroundColor : 'white',
    borderRadius : 20,
    padding : 10,
    flex : 1,
    marginRight : 5,
    shadowColor : 'black',
  },
  
  emptyTextStyle : {
    color : 'white',
    fontSize : 20
  },

  headingStyle : {
    color: 'white',
    marginTop : 10,
    fontFamily : 'TamilSangamMN-Bold',
    fontSize : 30,
    fontWeight : '900',
    padding : 5,
    marginLeft : 10
  },

  listStyle : {
    marginVertical : 15,
    padding : 5,
    flexGrow : 0,
    backgroundColor : 'transparent',
    marginLeft : 10,
    marginBottom : 30
  },

  checkBox : {
    backgroundColor : 'transparent',
    borderColor : '#000000',
    borderWidth : 2, 
    marginRight : 10,
    width : 24,
    height : 24
  },

  checkMark : {
    fontSize : 30,
    lineHeight : 10,
    textAlign : 'center',
    color : '#AED581'
  },

  listItem : {
    padding : 10,
    marginVertical : 5,
    borderRadius : 5,
    backgroundColor : 'green',
    flexDirection : 'row',
    justifyContent : 'flex-start',
    alignItems : 'center',
    shadowColor : 'black',
    shadowOpacity : 2
  },

  textContainer : {
    flex : 1
  },

  listText : {
    fontSize : 15,
    padding : 10
  }, 

  completedText : {
    marginRight : 50,
    fontSize : 15,
    padding : 10
  }, 

  picker : {
    backgroundColor : 'white',
    borderRadius : 6,
    marginRight : 5,
    fontSize : 25,
    width: 'auto',
    height : 40,
    marginTop : 4,
    shadowColor : 'black',
  },


});
