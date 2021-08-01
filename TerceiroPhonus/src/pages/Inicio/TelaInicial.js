import React,{useState,useEffect} from 'react'
import {View,Text, Button, Alert, ImageBackground} from 'react-native'
import {GoogleSignin} from  '@react-native-google-signin/google-signin'
import Auth from '@react-native-firebase/auth'
import Firestore from '@react-native-firebase/firestore'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MenuAtividades from '../Atividades/MenuAtividades'
import Perfil from '../Perfil/Perfil'
import Materiais from '../Materiais/Materiais'
import Estilo from './Estilo'
import Sound from 'react-native-sound'
import Storage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo' 
export default ({navigation,route})=>{



  let auxMusicaFundo=0
  const [nome,setNome]=useState(route.params.nome)
  const [avatar,setAvatar]=useState(route.params.avatar)
  const [id,setID]=useState(route.params.uid)
  const [musicasFundo,setMusicasFundo]=useState(['fantasy.wav','oniku.wav','patakas.wav'])

 
  
  if(!route.params.google){
 
  Firestore().collection('usuario').doc(id).onSnapshot(dadosUsuario=>{
    setAvatar(dadosUsuario.data().Avatar)
    setNome(dadosUsuario.data().Apelido)
})
  }

   

  
    

  
  const MaterialNavigator=createMaterialBottomTabNavigator()

    
   
    
    const LogOut=async()=>{

      //se estiver logado com o google
        if(route.params.google){


       
        await GoogleSignin.revokeAccess()
        await GoogleSignin.signOut()
         Auth().signOut().then(()=> navigation.reset({
          index:0,
          routes:[{name:'Menu'}]
        }))
        }else{
        Storage.removeItem('@storage_key').then(()=>{

          navigation.reset({
            index:0,
            routes:[{name:'Menu'}]
          })
        })

        }
        
        
      
    }

    const trocaMusica=()=>{
       
       if(auxMusicaFundo<musicasFundo.length-1)auxMusicaFundo++
       else auxMusicaFundo=0
       
  
       musica=new Sound(musicasFundo[auxMusicaFundo],Sound.MAIN_BUNDLE,(error)=>{
           if(!error){
             
             
             musica.setVolume(0.3)
            setTimeout(()=>{
              musica.play(sucess=>{
                trocaMusica()
              })
            },600) 
            
          }
       })
      
      
    }

    return(

      <View style={{flex:1,flexDirection:'column',backgroundColor:'#FFBF00'}}>

        
       <View>
        
        
         <Button title="LogOut" onPress={()=>LogOut()}></Button>
       </View>


      <View style={{flex:2}}>
       <MaterialNavigator.Navigator initialRouteName="MenuAtividades" barStyle={{backgroundColor:'#FFBF00'}}>


       <MaterialNavigator.Screen name="Materiais" component={Materiais} options={{
            tabBarLabel:'Materiais',
            tabBarIcon:({color})=>(
              <FontAwesome name="book" color={color} size={26}></FontAwesome>
            ),

        }}>
        </MaterialNavigator.Screen>



         <MaterialNavigator.Screen name='MenuAtividades' component={MenuAtividades} options={{
          tabBarLabel:'Atividades',
          tabBarIcon:({color})=>(
            <FontAwesome name="home" color={color} size={26}></FontAwesome>
          )  ,
          
          
           
          }}>
         </MaterialNavigator.Screen>


         <MaterialNavigator.Screen name="Perfil" component={Perfil} options={{
           tabBarLabel:'Perfil',
           tabBarIcon:({color})=>(
             <FontAwesome name="user" color={color} size={26}></FontAwesome>
           ),

         }}
         initialParams={{Avatar:avatar,Nome:nome,ID:id,Google:route.params.google}}
         >
         </MaterialNavigator.Screen>

         
       
       </MaterialNavigator.Navigator>
       </View>
       
      </View>

    );
}