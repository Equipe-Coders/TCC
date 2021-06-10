/*Tela de Menu */
import React, {useState} from  'react'
import {ImageBackground, View, TouchableOpacity, Image,Text,StyleSheet, Button} from 'react-native'

//a proprieda route recebe os dados enviados
export default ({navigation,route})=>{
//vai para a tela inicial
deslogar=()=>{
    navigation.reset({
        index:0,
        routes:[{name:"Inicial"}]
    })
}
    return(
<View>

<Text>Seja Bem vindo (a) {route.params?.emailUser}</Text>
<Text></Text>
<Image source={{uri:route.params?.imagem}} style={{width:128,height:128}}></Image>

<Button title="Sair" onPress={()=>deslogar()}></Button>
</View>

    );
}