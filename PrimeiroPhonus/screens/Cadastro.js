/*Tela de cadastro, utilizando os servicos do Google Firebase (Firestore)*/

import React,{useState} from  'react'
import {View,TouchableOpacity, Image,Text,ImageBackground,TextInput, StyleSheet,Modal, ScrollView, Button} from 'react-native'
import Firestore from '@react-native-firebase/firestore' //importando a biblioteca firestore


//navigation é uma propriedade do React Navigation, através dela é que navegamos entre telas
export default ({navigation})=>{

    //utilizando React Hooks, para atualizar valores em tempo real, em seguida armazenar no banco
const [avatarVisivel,setAvatarVisivel]=useState(false)  //definir se o modal de avatares está visível ou não
const [avatar,setAvatar]=useState(null) //armazenará todos os dados dos avatares
const [nomeUsuario,setNomeUsuario]=useState(null)// armazenará o apelido digitado pelo usuário
const [emailUsuario,setEmailusuario]=useState(null)//armazenará o email digitado pelo usuário
const [senhaUsuario,setSenhaUsuario]=useState(null)//armazenará a senha digitada pelo usuário
const [avatarSelecionado,setAvatarSelecionado]=useState(null) //armazenará qual o nome do usuário selecionado
const [avatarDiretorio,setAvatarDiretorio]=useState(null)//armazenará qual o diretório em que o usuário selecionado se encontra
const [cadastrado,setCadastrado]=useState(false)//verificará se o cadastro foi efetivado para apresentar um Modal
let dadosAvatar=[]//array que armazená que armazenrá elementos criados com os dados dos avatares, que em seguida serão armazenados no [avatar,setAvatar]

//Função que pegará os dados dos avatares do banco de dados e mostrará na tela
mostraAvatar=async()=>{
    try{

    
  
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
    }catch(ex)
    {
        //Possível erro
    }

 
 

}

//função que fará o cadastro
cadastro=async()=>{
    try{

    //verificar se o usuário digitou todos os dados 
        if(nomeUsuario!=null && emailUsuario!=null && senhaUsuario!=null && avatarDiretorio!=null){
            //adicionando os valores no banco
Firestore().collection('usuario').add({
    Apelido:nomeUsuario,
    Email:emailUsuario,
    Senha:senhaUsuario,
    Avatar:avatarDiretorio
})

setCadastrado(!cadastrado)
        }
        
}catch(ex){

    }

}

    return(


        <View style={{flex:1,flexDirection:'column', alignItems:'stretch'}}>
            <ImageBackground source={require('../imagens/fundo.png')} style={{width:500,height:830}}> 
        <View style={{width:150,height:50}}>

              {/*O botão no react native é muito limitado, prinicpalmente em questões gráficos, por isso, muitas vezes é utilizado o componente TouchableOpacity */}
            <TouchableOpacity onPress={()=>navigation.goBack()}>
             <Image source={require('../imagens/voltar.png')} style={{marginLeft:'10%',marginTop:'10%'}}></Image>
            </TouchableOpacity>
          

        </View>
        <View style={{marginLeft:'25%'}}>

            <Text style={{fontSize:30,color:'white'}}>CADASTRO</Text>
        </View>
        {/*Adicionando os Inputs */}
        <View style={estilo.divisao}><TextInput placeholder="Apelido" style={estilo.dados} onChangeText={texto=>setNomeUsuario(texto)}></TextInput></View>
        <View style={estilo.divisao}><TextInput placeholder="Email" style={estilo.dados} onChangeText={texto=>setEmailusuario(texto)}></TextInput></View>
        <View style={estilo.divisao}><TextInput placeholder="Senha" secureTextEntry={true} /*Secure entry criptografa os dados */ style={estilo.dados} onChangeText={texto=>setSenhaUsuario(texto)}></TextInput></View>
        <View style={{ width:'30%',height:40, marginLeft:'25%',marginTop:'5%',backgroundColor:'yellow', borderRadius:40}}>
        <TouchableOpacity onPress={()=>{
            mostraAvatar()//carrega todos os avatares
            setAvatarVisivel(!avatarVisivel) //mostra o Modal com os avaters
            }}>
        <Text style={{color:'black', textAlign:'center'}}>Avatar</Text>
        </TouchableOpacity>
 

        </View>

        <View style={{ width:'30%',height:40, marginLeft:'25%',marginTop:'5%',backgroundColor:'yellow', borderRadius:40}}>
        <TouchableOpacity onPress={()=>cadastro()}>
        <Text style={{color:'black', textAlign:'center'}}>Cadastrar</Text>
        </TouchableOpacity>
 

        </View>


              {/*Modal que mostrará as opções de avatares */}


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

        {/*Modal que notifica que o cadastro foi efetivado*/}

        <Modal transparent={true} visible={cadastrado} animationType={'fade'}>

            <View style={{alignItems:'center',marginTop:'40%',backgroundColor:'white'}}>



           <Text style={{fontSize:40}}>Usuário Cadastrado</Text>

           <Button title="OK!!" onPress={()=>{
               try{

               
               setCadastrado(!cadastrado)
               navigation.goBack()//voltar para a página inicial
               }catch(ex){
                   //Possível erro
               }
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