
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Menu from './screens/Menu'
import AtividadePort from './screens/AtividadePort';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'



export default function App(){

  const Stack=createStackNavigator()

  return(
  <View style={{flex:1}}>
   <NavigationContainer independent={true}>
     <Stack.Navigator screenOptions={{headerShown:false}}>

       <Stack.Screen name="Menu" component={Menu}></Stack.Screen>
       <Stack.Screen name="AtividadePort" component={AtividadePort}></Stack.Screen>
     </Stack.Navigator>

   </NavigationContainer>
  </View>

  );
}