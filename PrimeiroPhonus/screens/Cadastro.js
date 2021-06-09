import React,{useState} from  'react'
import {View,TouchableOpacity, Image,Text,ImageBackground,TextInput, StyleSheet,Modal, ScrollView, Button} from 'react-native'
import Firestore from '@react-native-firebase/firestore'



export default ({navigation})=>{

const [avatarVisivel,setAvatarVisivel]=useState(false)
const [avatar,setAvatar]=useState(null)
const [nomeUsuario,setNomeUsuario]=useState(null)
const [emailUsuario,setEmailusuario]=useState(null)
const [senhaUsuario,setSenhaUsuario]=useState(null)
const [avatarSelecionado,setAvatarSelecionado]=useState(null)
const [avatarDiretorio,setAvatarDiretorio]=useState(null)
const [cadastrado,setCadastrado]=useState(false)
let dadosAvatar=[]
mostraAvatar=async()=>{
  
  const dados=await Firestore().collection('avatar').orderBy('nome','asc').get()
dados.forEach((data,index)=>{
   dadosAvatar.push(<View key={index} style={{borderStyle:'solid',borderWidth:1,borderColor:'green',borderRadius:100}}>
       <TouchableOpacity onPress={()=>{setAvatarSelecionado(data.data().nome)
       setAvatarDiretorio(data.data().diretorio)
    
    }}>
       <Text style={{textAlign:'center'}}>{data.data().nome}</Text>
   <Image source={{uri:data.data().diretorio}} style={{width:100,height:100,marginLeft:'30%'}}></Image>
   </TouchableOpacity>
   
   </View>)
})

setAvatar(dadosAvatar)

 //setAvatar(avatar)
 

}


cadastro=async()=>{
    try{

    
Firestore().collection('usuario').add({
    Apelido:nomeUsuario,
    Email:emailUsuario,
    Senha:senhaUsuario,
    Avatar:avatarDiretorio
})
setCadastrado(!cadastrado)
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

            <Text style={{fontSize:30,color:'white'}}>CADASTRO</Text>
        </View>
        <View style={estilo.divisao}><TextInput placeholder="Apelido" style={estilo.dados} onChangeText={texto=>setNomeUsuario(texto)}></TextInput></View>
        <View style={estilo.divisao}><TextInput placeholder="Email" style={estilo.dados} onChangeText={texto=>setEmailusuario(texto)}></TextInput></View>
        <View style={estilo.divisao}><TextInput placeholder="Senha" secureTextEntry={true} style={estilo.dados} onChangeText={texto=>setSenhaUsuario(texto)}></TextInput></View>
        <View style={{ width:'30%',height:40, marginLeft:'25%',marginTop:'5%',backgroundColor:'yellow', borderRadius:40}}>
        <TouchableOpacity onPress={()=>{
            mostraAvatar()
            setAvatarVisivel(!avatarVisivel)}}>
        <Text style={{color:'black', textAlign:'center'}}>Avatar</Text>
        </TouchableOpacity>
 

        </View>

        <View style={{ width:'30%',height:40, marginLeft:'25%',marginTop:'5%',backgroundColor:'yellow', borderRadius:40}}>
        <TouchableOpacity onPress={()=>cadastro()}>
        <Text style={{color:'black', textAlign:'center'}}>Cadastrar</Text>
        </TouchableOpacity>
 

        </View>




        <Modal transparent={true} visible={avatarVisivel}>
            <View style={{backgroundColor:"white", flex:1,flexDirection:'column'}}>
                <View style={{marginRight:0, backgroundColor:'#0c6d96'}}>

                    <TouchableOpacity onPress={()=>setAvatarVisivel(!avatarVisivel)}>

                        <Image source={require('../imagens/fechar.png')}></Image>
                    </TouchableOpacity>
                    
                </View>


                <View style={{backgroundColor:'#0c6d96'}}>

                    <Text style={{textAlign:'center',color:'white',fontSize:20}}>Personagem selecionado:{'\n'}{avatarSelecionado}</Text>
                <View style={{alignItems:'center',marginTop:'20%',height:500,backgroundColor:'white'}}>
              <ScrollView style={{width:300}}>

               
           {avatar}

              </ScrollView>
              
                </View>

                </View>
              
            </View>
        </Modal>

        <Modal transparent={true} visible={cadastrado}>

            <View style={{alignItems:'center',marginTop:'40%',backgroundColor:'white'}}>



           <Text style={{fontSize:40}}>Usuário Cadastrado</Text>

           <Button title="OK!!" onPress={()=>{
               setCadastrado(!cadastrado)
               navigation.goBack()
           }}></Button>

            </View>
        </Modal>
        </ImageBackground>
        </View>
       
    );
}

const estilo=StyleSheet.create({
divisao:{
    width:'60%',
    marginLeft:'10%',
    marginTop:'5%'

},
dados:{
backgroundColor:'white',
borderRadius:10
}

})