import React from 'react'
import {StyleSheet,Dimensions} from 'react-native'

const Estilo=StyleSheet.create({

    imageBackground:{
        flex:1,
        resizeMode:'stretch',
        width:Dimensions.get('screen').width,
        height:Dimensions.get('screen').height+50,
        alignItems:'center'
       
    },
    textTitle:{
        textAlign:'center',
        fontSize:50,
        color:'white',
        fontFamily:'ComickBook'
    },
    viewAtividade:{
        width:350,
        height:200,
        backgroundColor:'yellow',
        borderRadius:10,
        borderStyle:'solid',
        borderColor:'black',
        borderWidth:3,
        marginTop:10,
        justifyContent:'center'
    }
})

export default Estilo