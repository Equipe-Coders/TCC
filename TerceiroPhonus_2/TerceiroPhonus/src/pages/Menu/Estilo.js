import React from 'react'
import {StyleSheet,Dimensions} from 'react-native'

const Estilo=StyleSheet.create({
    cabecalho:{
     alignItems:'center',
     height:220,
     
    },
    textTitle:{
        textAlign:'center',
        fontSize:55,
        fontFamily:'ComickBook',
        color:'white'
        
    },
    imagem:{
        width:150,
        height:150
    },
    imagemBackground:{
        flex:1,
        resizeMode:'stretch',
        width:Dimensions.get('screen').width,
        height:Dimensions.get('screen').height+50,
    },
    corpo:{
        alignItems:'center',
        marginTop:250
    }
})

export default Estilo