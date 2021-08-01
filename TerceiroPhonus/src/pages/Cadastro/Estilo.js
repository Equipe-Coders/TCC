import React from 'react'
import {StyleSheet,Dimensions} from 'react-native'

const Estilo=StyleSheet.create({

    imagemBackground:{
        flex:1,
        resizeMode: 'stretch',
        width:Dimensions.get('screen').width,
        height:Dimensions.get('screen').height+50,
        alignItems:'center',
        flexDirection:'column'
    },
    textoTitulo:{
        fontSize:45,
        color:'white',
        textAlign:'center',
        fontFamily:'ComickBook'
    },
    viewCorpo:{
        flex:2,
        alignItems:'center',
        justifyContent:'center'
    }

})

export default Estilo