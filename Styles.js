import { StyleSheet } from 'react-native';


// Every single style used is referenced in this file, in order from top down starting with the Task
// Manager screen and finishing with the Setting screen styles.

export const styles = StyleSheet.create({


  // TASK MANAGER SCREEN STYLES ----------------------------------------

  screen : {
    flex : 1,
  },

  titleView : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center'
  },


  title : {
    textAlign: 'left',
    color : 'white',
    fontWeight : '300',
    fontSize : 40, 
    marginBottom : 20,
    padding : 10
  },

  settingsButton : {
    width : 'auto',
    height : 'auto',
    paddingVertical : 5,
    marginRight : 10,
    borderRadius : 6, 
    backgroundColor : 'transparent',
    marginBottom : 15,
    marginTop : -5
  },

  settingsButtonText : {
    padding : 5,
    textAlign : 'center',
    fontWeight : '700',
    fontSize : 60
  },

  promptStyle : {
    backgroundColor : "transparent", 
    flexDirection : 'row',
    justifyContent : 'space-between',
    marginBottom : 30,
    marginLeft : 10,
    marginRight : 10
  },

  picker : {
    backgroundColor : 'white',
    borderRadius : 6,
    marginRight : 5,
    fontSize : 25,
    width: 'auto',
    height : 40,
    marginTop : 3,
    shadowColor : 'black',
  },

  taskInput : {
    backgroundColor : 'white',
    borderRadius : 20,
    width : 500,
    padding : 10,
    marginRight : 5,
    shadowColor : 'black',
  },

  descriptionInput : {
    backgroundColor : 'white',
    borderRadius : 20,
    padding : 10,
    flex : 1,
    marginRight : 5,
    shadowColor : 'black'
  },

  addButton : {
    borderRadius : 6,
    backgroundColor : 'white',
    textAlign : 'center',
    paddingVertical : 10
  },

  addButtonText : {
    color : '#000000',
    fontWeight : 'bold',
    fontSize: 20
  },

  firstPartPriorityMsg : {
    fontSize : 20,
    fontStyle : 'italic',
    color : 'white',
    shadowColor : 'black',
    shadowOpacity : 3,
    textAlign : 'center'
  },

    secondPartPriorityMsg : {
    fontSize : 20,
    color : 'white',
    shadowColor : 'black',
    shadowOpacity : 3,
    textAlign : 'center'
  },
  
  headingStyle : {
    color: 'white',
    marginTop : 5,
    fontSize : 30,
    fontWeight : '300',
    marginLeft : 10,
    marginBottom : 1
  },

  listStyle : {
    marginVertical : 15,
    padding : 5,
    flexGrow : 1,
    backgroundColor : 'transparent',
    marginLeft : 10,
    marginBottom : 30
  },

  emptyTextStyle : {
    color : 'white',
    fontSize : 20,
    marginLeft : 10
  },

  listItem : {
    padding : 10,
    borderRadius : 5,
    height : '75%',
    backgroundColor : 'green',
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center',
    shadowColor : 'black',
    shadowOpacity : 2
  },

  checkBox : {
    backgroundColor : 'transparent',
    borderColor : '#000000',
    borderWidth : 2, 
    marginRight : 10,
    width : 24,
    height : 24
  },

  textContainer : {
    flex : 1,
    paddingVertical : 1
  },

  listText : {
    color : 'black',
    fontSize : 15,
    textAlignVertical : 'auto',
    marginTop : 4
  }, 

  descriptionText : {
    color : 'black',
    fontStyle : 'italic',
    fontSize : 12,
    marginLeft : 0,
    marginTop : 0, 
    marginBottom : 3
  },

  dateText : {
    marginRight : 15,
    marginBottom : 2,
  },

  deleteButton : {
    backgroundColor : 'transparent',
    textAlign : 'right',
    padding : 5
  },

  deleteButtonText : {
    color : '#000000',
    fontWeight : 'bold',
    fontSize: 35
  },

  checkMark : {
    fontSize : 30,
    lineHeight : 10,
    textAlign : 'center',
    color : '#AED581'
  },

  completedText : {
    color : 'white',
    fontSize : 15,
    textAlignVertical : 'auto',
    marginTop : 0
  }, 

  completedDescriptionText : {
    color : 'white',
    fontStyle : 'italic',
    fontSize : 12,
    marginLeft : 0,
    marginTop : 0, 
    marginBottom : 0
  },

  completedDateText : {
    marginRight : 15,
    marginBottom : 2,
    color : 'white'
  },


  // SETTINGS SCREEN STYLES ----------------------------------------

  SettingsBox : {
    borderColor : 'black',
    width : 900,
    height : 900,
    alignContent : 'flex-start'
  },

  featureView : {
    flexDirection : 'row',
    justifyContent : 'space-evenly',
    alignContent : 'center'
  },

  settingsHeadingStyle : {
    color: 'white',
    marginTop : 18,
    fontSize : 30,
    fontWeight : '300',
    marginLeft : 10,
    marginBottom : 1
  },

  wallpaperPicker : {
    backgroundColor : 'white',
    borderRadius : 6,
    marginLeft : 5,
    fontSize : 25,
    width: 'auto',
    height : 40,
    marginTop : 20,
    shadowColor : 'black',
  },

  fontPicker : {
    backgroundColor : 'white',
    borderRadius : 6,
    marginLeft : 5,
    marginRight : 0,
    fontSize : 25,
    width: 'auto',
    height : 40,
    marginTop : 20,
    shadowColor : 'black',
  },

});

// BACKGROUND THEMES and their corresponding image addresses from ASSETS
// folder.

export const themes = {
  regular : require('./assets/background-regular.jpg'),
  spacial : require('./assets/background-enchanting.jpg'),
  futuristic : require('./assets/background-future.jpg'),
  evening : require('./assets/background-evening.jpg')
};



