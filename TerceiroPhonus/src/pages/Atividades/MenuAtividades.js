import React,{useEffect} from 'react'
import {View,Text} from 'react-native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import MenuMatematica from '../MenuMatematica/MenuMatematica'
import MenuPortugues from '../MenuPortugues/MenuPortugues'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
export default()=>{
const TopNavigator=createMaterialTopTabNavigator()
  
  
  

    return(

      <View style={{flex:1,backgroundColor:'white'}}>
        
        <TopNavigator.Navigator tabBarOptions={{showIcon:true,showLabel:false,style:{
          backgroundColor:'#FFBF00',
          borderTopLeftRadius:40,borderTopRightRadius:40,borderBottomLeftRadius:40,borderBottomRightRadius:40
        }}}>
          <TopNavigator.Screen name='MenuMatematica' component={MenuMatematica} options={{
            tabBarIcon:({color})=>(
              <MaterialIcons name="numeric-1-box" color={color} size={26}></MaterialIcons>
            ),
            
          }}
          
          ></TopNavigator.Screen>
          <TopNavigator.Screen name='MenuPortugues' component={MenuPortugues} options={{
           tabBarIcon:({color})=>(

            <MaterialIcons name='format-letter-case' color={color} size={26}></MaterialIcons>
           )
          }}></TopNavigator.Screen>
        </TopNavigator.Navigator>
        </View>

    );
}