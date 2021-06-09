

import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import TelaInicial from './screens/telaInicial'
import Cadastro from './screens/Cadastro'
import Login from './screens/Login'
import Menu from './screens/Menu'
import {NavigationContainer} from '@react-navigation/native' 
import {createStackNavigator} from '@react-navigation/stack'


const Stack=createStackNavigator()
export default function App(){


  /*return(
<View>
<NavigationContainer>
  <Stack.Navigator>

<Stack.Screen name="Inicial" component={TelaInicial}></Stack.Screen>


  </Stack.Navigator>
</NavigationContainer>
</View>
  );*/
  return(
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Inicial" component={TelaInicial} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="Menu" component={Menu} options={{headerShown:false}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


