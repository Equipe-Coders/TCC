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
    },
    botao:{
        width:200,
        height:50,
        backgroundColor:'rgb(255, 247, 20)',
        alignItems:'center',
        justifyContent:'center',
        marginTop:30,
        borderRadius:15,

        shadowColor: "#000",
        shadowOffset: {
	      width: 0,
	      height: 2,
       },
       shadowOpacity: 1,
       shadowRadius: 3.84,

       elevation: 5,
    }

})

export default Estilo