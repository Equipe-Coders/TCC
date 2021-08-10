import React from 'react'
import {StyleSheet,Dimensions} from 'react-native'

const Estilo=StyleSheet.create({

    textoTitulo:{
        textAlign:'center',
        fontSize:45,
        fontFamily:'ComickBook',
        color:'white'
    },
    viewCorpo:{
        alignItems:'center',
        flex:1
    },
    imageBackGround:{
        flex:1,
        resizeMode:'stretch',
        width:Dimensions.get('screen').width,
        height:Dimensions.get('screen').height+50,
    }
})

export default Estilo