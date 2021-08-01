import React from 'react'
import {View,Text, ImageBackground} from 'react-native'
import Estilo from './Estilo';

export default()=>{
    return(

        <View style={{flex:1}}>
            <ImageBackground source={require('../../../assets/images/background.png')} style={Estilo.imageBackground}>

            <Text style={Estilo.textTitle}>Matemática</Text>

            </ImageBackground>
            
            </View>
    );
}