import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen : {
    // backgroundColor : '#C2E1F2',
    flex : 1,
    height : 'auto',
    width : 'auto'
  },

  titleView : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center'
  },


  title : {
    textAlign: 'left',
    fontFamily : "Roboto",
    color : 'white',
    fontWeight : '300',
    fontSize : 40, 
    marginBottom : 20,
  },

  promptStyle : {
    backgroundColor : "transparent", 
    flexDirection : 'row',
    justifyContent : 'space-between',
    marginBottom : 30,
    marginLeft : 10,
    marginRight : 10
  },

  button : {
    borderRadius : 6,
    backgroundColor : 'white',
    textAlign : 'center',
    paddingVertical : 10
  },

  buttonText : {
    color : '#000000',
    fontWeight : 'bold',
    fontSize: 20
  },

  deleteButtonText : {
    color : '#000000',
    fontWeight : 'bold',
    fontSize: 35
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


  priorityMessage : {
    fontSize : 20,
    fontFamily : 'Roboto',
    fontStyle : 'italic',
    color : 'white',
    shadowColor : 'black',
    shadowOpacity : 1,
    textAlign : 'center'
  },
  
  emptyTextStyle : {
    color : 'white',
    fontSize : 20,
    marginLeft : 10
  },

  headingStyle : {
    color: 'white',
    marginTop : 10,
    fontSize : 30,
    fontWeight : '300',
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

  deleteButton : {
    backgroundColor : 'transparent',
    textAlign : 'right',
    padding : 5
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
    justifyContent : 'space-between',
    alignItems : 'center',
    shadowColor : 'black',
    shadowOpacity : 2
  },

  textContainer : {
    flex : 1,
    paddingVertical : 1
  },

  listText : {
    color : 'black',
    fontSize : 15,
    padding : 6,
    paddingBottom : 0
  }, 

  descriptionText : {
    color : 'black',
    fontStyle : 'italic',
    fontSize : 12,
    marginLeft : 8,
    marginTop : 0, 
    marginBottom : 0
  },

  dateText : {
    marginRight : 15,
    marginBottom : 2,
  },

  completedText : {
    marginRight : 50,
    fontSize : 15,
    padding : 6,
    paddingBottom : 0,
    color : 'white'
  }, 

  completedDescriptionText : {
    color : 'white',
    fontSize : 12,
    marginLeft : 8,
    marginTop : 0, 
    marginBottom : 0
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

  // SETTINGS SCREEN STYLES

  SettingsBox : {
    borderColor : 'black',
    width : 900,
    height : 900,
    alignContent : 'flex-start'
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

  featureView : {
    flexDirection : 'row',
    justifyContent : 'space-evenly',
    alignContent : 'center'
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

});

// BACKGROUND THEMES

export const themes = {
    regular : require('./assets/background-regular.jpg'),
    spacial : require('./assets/background-enchanting.jpg'),
    futuristic : require('./assets/background-future.jpg'),
    evening : require('./assets/background-evening.jpg')
};



