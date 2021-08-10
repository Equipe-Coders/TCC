import React,{useState,useEffect} from 'react'
import {View,Text, Button, Alert, ImageBackground, Image, TouchableOpacity, Modal} from 'react-native'
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
import Reanimated,{useSharedValue,useAnimatedStyle,withSpring} from 'react-native-reanimated'
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'


export default ({navigation,route})=>{




  const [nome,setNome]=useState(route.params.nome)
  const [avatar,setAvatar]=useState(route.params.avatar)
  const [id,setID]=useState(route.params.uid)
  const [sair,setSair]=useState(false)


  const rModal=useSharedValue(2000)
  const styleModal=useAnimatedStyle(()=>{
    return{
      transform:[{translateY:withSpring(rModal.value)}]
    }
  })
 
  useEffect(()=>{

    
    if(!route.params.google){
 
      const atualiza=Firestore().collection('usuario').doc(id).onSnapshot(dadosUsuario=>{
        setAvatar(dadosUsuario.data().Avatar)
        setNome(dadosUsuario.data().Apelido)
        setID(dadosUsuario.id)
    })
    return()=>{ atualiza()}
      }else{
    
       
      }
  },[])
  

   
  
    

  
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

   
      
      
    

    return(

      <View style={{flex:1,flexDirection:'column',backgroundColor:'white'}}>



       <Modal transparent={true} style={{flex:1}} visible={sair}>
         <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.6)',alignItems:'center',justifyContent:'center'}}> 
           <Reanimated.View style={[{width:250,height:150,backgroundColor:'white',borderRadius:10,},styleModal]}>
             <View style={{alignItems:'flex-end'}}><FontAwesome name='close' color={'black'} size={40} onPress={()=>{
               setSair(!sair)
               rModal.value=2000
               }}></FontAwesome></View>

                 <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                 <View style={{alignItems:'center',justifyContent:'center',borderRadius:10,backgroundColor:'#FFBF00',width:150}}>
                 <MaterialCommunity name='exit-run' color={'black'} size={70} onPress={()=>LogOut()}></MaterialCommunity>
              </View>
                 </View>
            
           </Reanimated.View>

         </View>

       </Modal>





        
       <View style={{flexDirection:'row'}}>
        
          <TouchableOpacity onPress={()=>{
            setSair(!sair)
            rModal.value=0
            }}>
         <Image source={{uri:avatar}} style={{width:60,height:60,borderRadius:40}}></Image>
         </TouchableOpacity>
         <View style={{justifyContent:'center'}}><Text style={{fontWeight:'bold',fontSize:15}}>{nome}</Text></View>
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