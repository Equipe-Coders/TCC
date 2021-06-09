import React, {useState} from  'react'
import {ImageBackground, View, TouchableOpacity, Image,Text,StyleSheet, TextInput} from 'react-native'
import FireStore from '@react-native-firebase/firestore'

export default ({navigation})=>{

    const [email,setEmailusuario]=useState(null)
    const [senha,setSenhaUsuario]=useState(null)


    logar=async()=>{

        try{
          navigation.reset({
              index:0,
              routes:[{name:"Menu"}]
          })
            const dados= await FireStore().collection('usuario').where('Email','==',email).where('Senha','==',senha).get()

            if(!dados.empty)
             dados.forEach(dataUser=>{
            navigation.navigate("Menu",{apelidoUser:dataUser.data().Apelido,emailUser:dataUser.data().Email,senhaUser:dataUser.data().Senha,imagem:dataUser.data().Avatar})
            })
        }catch(ex){

        }
    }

    
    return(

        <View style={{flex:1,flexDirection:'column', alignItems:'stretch'}}> 

<ImageBackground source={require('../imagens/fundo.png')} style={{width:500,height:830}}>

<View style={{width:150,height:50}}>

<TouchableOpacity onPress={()=>navigation.goBack()}>
 <Image source={require('../imagens/voltar.png')} style={{marginLeft:'10%',marginTop:'10%'}}></Image>
</TouchableOpacity>


</View>


<View style={{marginLeft:'25%'}}>

<Text style={{fontSize:30,color:'white'}}>LOGIN</Text>


        <View style={estilo.divisao}><TextInput placeholder="Email" style={estilo.dados} onChangeText={texto=>setEmailusuario(texto)}></TextInput></View>
        <View style={estilo.divisao}><TextInput placeholder="Senha" secureTextEntry={true} style={estilo.dados} onChangeText={texto=>setSenhaUsuario(texto)}></TextInput></View>
        <View style={{ width:'30%',height:40, marginLeft:'25%',marginTop:'5%',backgroundColor:'yellow', borderRadius:40}}>
        <TouchableOpacity onPress={()=>{}}>
        <Text style={{color:'black', textAlign:'center'}} onPress={()=>logar()}>Logar</Text>
        </TouchableOpacity>
 

        </View>
</View>
</ImageBackground>

        </View>
    );
}

const estilo=StyleSheet.create({
    divisao:{
        width:'60%',
        
        marginTop:'5%'
    
    },
    dados:{
    backgroundColor:'white',
    borderRadius:10
    }
})    