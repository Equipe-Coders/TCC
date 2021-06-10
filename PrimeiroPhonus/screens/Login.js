//Tela de Login

import React, {useState} from  'react'
import {ImageBackground, View, TouchableOpacity, Image,Text,StyleSheet, TextInput, Alert, Modal} from 'react-native'
import FireStore from '@react-native-firebase/firestore'

export default ({navigation})=>{

    const [email,setEmailusuario]=useState(null)//armazenar o email digitado
    const [senha,setSenhaUsuario]=useState(null)//armazenar a senha digitada
    const [logado,setLogado]=useState(false)//armazenará true or false, para mostrar ou não o Modal de 'usuário não encontrado


    logar=async()=>{

        try{
         
            const dados= await FireStore().collection('usuario').where('Email','==',email).where('Senha','==',senha).get()

              //se encontar o usuário no banco de dados
              //navega para a tela Menu, a define como inicial e envia os dados do usuário
            if(!dados.empty){
            navigation.reset({
            index:0,
             routes:[{name:"Menu"}]
            })
             dados.forEach(dataUser=>{
            navigation.navigate("Menu",{apelidoUser:dataUser.data().Apelido,emailUser:dataUser.data().Email,senhaUser:dataUser.data().Senha,imagem:dataUser.data().Avatar})
            })
        }else{//caso contrário
           
            //Mostrar o Modal de 'usuário não encontrado' e depois esconder

            setLogado(true)

            setTimeout(()=>{
                setLogado(false)
            },1500)
            
           
        }
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
        <View style={{ width:'30%',height:40, marginLeft:'5%',marginTop:'5%',backgroundColor:'yellow', borderRadius:40}}>
        <TouchableOpacity onPress={()=>{}}>
        <Text style={{color:'black', textAlign:'center'}} onPress={()=>logar()}>Logar</Text>
        </TouchableOpacity>
 

        </View>
</View>




<Modal visible={logado} transparent={true} animationType={'slide'} style={{}}>
    <View style={{backgroundColor:'white',height:50}}>
<Text style={{textAlign:'center',fontSize:20,color:'red'}}>Email ou senha incorretos!!</Text>
    </View>

    
</Modal>
</ImageBackground>

        </View>
    );
}

const estilo=StyleSheet.create({
    divisao:{
        width:'60%',
        marginLeft:'-10%',
        marginTop:'5%'
    
    },
    dados:{
    backgroundColor:'white',
    borderRadius:10
    }
})    