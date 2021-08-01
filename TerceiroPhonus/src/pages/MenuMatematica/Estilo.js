import React from 'react'
import {StyleSheet,Dimensions} from 'react-native'

const Estilo=StyleSheet.create({

    imageBackground:{
        flex:1,
        resizeMode:'stretch',
        width:Dimensions.get('screen').width,
        height:Dimensions.get('screen').height+50,
       
    },
    textTitle:{
        textAlign:'center',
        fontSize:50,
        color:'white',
        fontFamily:'ComickBook'
    },
   
})

export default Estilo