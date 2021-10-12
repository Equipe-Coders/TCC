import React from 'react'
import {StyleSheet,Dimensions} from 'react-native'

const Estilo=StyleSheet.create({
   textoTitulo:{
       textAlign:'center',
       fontSize:40,
       fontFamily:'ComickBook',
       color:'white'
   },
   viewImagem:{
       flex:1,
       alignItems:'center',
       marginTop:15,
       
   },
   imagemPerfil:{
       width:120,
       height:120,
       borderRadius:10,
       borderWidth:1,
       borderColor:'black',
       shadowColor:'black',shadowOffset:{width:0,height:1},shadowOpacity:1,shadowRadius:2,
        backgroundColor:'white'
   },
   viewCorpo:{
       flex:2,
       flexDirection:'column',
       alignItems:'center'
   },
   imageBackGround:{
    flex:1,
    resizeMode:'stretch',
    width:Dimensions.get('screen').width,
    height:Dimensions.get('screen').height+50,
}
})

export default Estilo