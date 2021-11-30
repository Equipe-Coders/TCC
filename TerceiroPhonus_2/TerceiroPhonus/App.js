import React,{useEffect,useState} from  'react'
import {View,Text, Alert} from 'react-native'
import RNBootSplash from 'react-native-bootsplash'
import SemInternet from './src/pages/semInternet/SemInternet'
import Menu from './src/pages/Menu/Menu'
import Login from './src/pages/Login/Login'
import TelaInicial from './src/pages/Inicio/TelaInicial'
import Cadastro from './src/pages/Cadastro/Cadastro'
import MostraMariais from './src/pages/Materiais/mostraMateriais/mostraMateriais'
import AtividadePort1 from './src/pages/MenuPortugues/AtividadePort1/AtividadePort1'
import AtividadePort2 from './src/pages/MenuPortugues/AtividadePort2/AtividadePort2'
import AtividadeMat1 from './src/pages/MenuMatematica/AtividadeMat1/AtividadeMat1'
import AtividadeMat2 from './src/pages/MenuMatematica/AtividadeMat2/AtividadeMat2'
import MostraVideo from './src/pages/Materiais/MostraVideo/MostraVideo'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

export default ()=>{



  
  
//escondendo a SplashScreen
useEffect(()=>{

  setTimeout(()=>{

    RNBootSplash.hide()
    

  },500)
  
},[])


const Stack=createStackNavigator()


  return(

      <View style={{flex:1}}>

      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Menu" component={Menu} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="SemInternet" component={SemInternet} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="TelaInicial" component={TelaInicial} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="MostraMateriais" component={MostraMariais} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="AtividadePort1" component={AtividadePort1} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="AtividadePort2" component={AtividadePort2} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="AtividadeMat1" component={AtividadeMat1} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="AtividadeMat2" component={AtividadeMat2} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="MostraVideos" component={MostraVideo} options={{headerShown:false}}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
       
        
      </View>

  );
}