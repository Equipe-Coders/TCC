import 'react-native-gesture-handler'
import React,{useEffect} from 'react'
import {View,Text,StyleSheet, LogBox} from 'react-native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {NavigationContainer} from '@react-navigation/native'
import Mat from  './Matematica'
import Port from './Portugues'



const Tab=createMaterialTopTabNavigator()


LogBox.ignoreAllLogs(true)

export default ({navigation})=>{

  

    return(

  <View style={{flex:1,flexDirection:'column'}}>

   <View>
       
    <View style={{alignItems:'flex-end'}}>   
    <Text>Perfil</Text>
    
    </View>
    </View>

    <View style={{width:'100%',height:'100%'}}>
      
       
       <Tab.Navigator initialRouteName="Port" tabBarOptions={{

           activeTintColor:'black',
           inactiveTintColor:'black',
           
        style:{
            width:250,
           marginLeft:80,
           borderTopLeftRadius:41,
           borderTopRightRadius:41,
           borderBottomLeftRadius:41,
           borderBottomRightRadius:41
        }
       }}
    
       
       tabBarPosition="top" >

           <Tab.Screen name="Port" component={Port}></Tab.Screen>
           <Tab.Screen name="Mat" component={Mat}></Tab.Screen>
       </Tab.Navigator>

      

       </View>
     </View>
    );
}


