import React,{useEffect} from 'react'
import {View,Text,Image, Alert,TouchableOpacity, Button, Modal, ImageBackground, TouchableHighlight} from 'react-native'
import Estilo from './Estilo'
import Reanimated,{useSharedValue,useAnimatedStyle, withTiming, withRepeat, withSequence, withSpring} from 'react-native-reanimated'
import NetInfo from '@react-native-community/netinfo'
import {GoogleSignin,GoogleSigninButton} from '@react-native-google-signin/google-signin'
import Auth from '@react-native-firebase/auth'
import Storage from '@react-native-async-storage/async-storage'
import Firestore from '@react-native-firebase/firestore'

export default ({navigation})=>{

  //configurando o login com o google
  useEffect(()=>{

   
    GoogleSignin.configure({

      scopes:['email'],
      webClientId: '925295944496-fbrkj7a66bpro88fcfdicd2rgjcib6i3.apps.googleusercontent.com',
      offlineAccess:true

    })
        
  
    getDadosUsuario()

    const verificaAuth= Auth().onAuthStateChanged(user=>{
     
    
         if(user){
          navigation.reset({
          index:0,
          routes:[{name:'TelaInicial',params:{nome:user.displayName,uid:user.uid,google:true,avatar:user.photoURL}}]
        })
        
    }
  })
  return()=>{verificaAuth()}
  
     
  },[])

  


 

  
const getDadosUsuario=async()=>{
  try{


     const value=await Storage.getItem('@storage_key')
     if(value != null){
       //Alert.alert(value)
       await Firestore().collection('usuario').doc(value).get().then(async dadosUsuario=>{

        await navigation.reset({
          index:0,
          routes:[{name:'TelaInicial',params:{nome:dadosUsuario.data().Apelido,uid:dadosUsuario.id,avatar:dadosUsuario.data().Avatar}}]
        })


       })
       
     }
  }catch(ex){

  }
}



  const styleImagem=useSharedValue(150)

  const animatedStyle=useAnimatedStyle(()=>{
       return{
           width:withSpring(styleImagem.value),
           height:withSpring(styleImagem.value)
       }
  })
    
styleImagem.value=withRepeat(withTiming(180,{duration:1500}),-1,true)


const verificaConexao=()=>{
NetInfo.fetch().then(netinfo=>{
  if(netinfo && netinfo.type=='wifi')navigation.navigate('Login')
  else navigation.reset({
    index:0,
    routes:[{name:'SemInternet',parmas:{rota:'Menu'}}]
  })
})
}


//Login com o Google

const googleLogin=async()=>{

   try{

      await GoogleSignin.hasPlayServices()
      const {idToken,user,accessToken}=await GoogleSignin.signIn()
      const credential=Auth.GoogleAuthProvider.credential(idToken,accessToken)
      await Auth().signInWithCredential(credential)
   }catch(ex){

   }

}





    return(
    
    <View style={{flexDirection:'column',flex:1,}}>
      <ImageBackground source={require('../../../assets/images/background.png')} style={Estilo.imagemBackground}>
     <View style={Estilo.cabecalho}>
           <Text style={Estilo.textTitle}>Phonus</Text>
           <Reanimated.Image source={require('../../../assets/images/blackboard.png')} style={[Estilo.imagem,animatedStyle]}></Reanimated.Image>
     </View>
     <View style={Estilo.corpo}>
     <TouchableHighlight style={{backgroundColor:'#ffff00',width:200,height:50,borderRadius:15,justifyContent:'center',shadowColor:'black',shadowOffset:{width:0,height:1},shadowOpacity:1,shadowRadius:2,elevation:5}} underlayColor={'rgba(255,255,0,0.5)'} onPress={()=>verificaConexao()}>
       <Text style={{textAlign:'center',fontSize:25,fontWeight:'bold'}}>LOGIN</Text>
     </TouchableHighlight>

     <TouchableHighlight style={{backgroundColor:'#ffff00',width:200,height:50,borderRadius:15,justifyContent:'center',marginTop:15,shadowColor:'black',shadowOffset:{width:0,height:1},shadowOpacity:1,shadowRadius:2,elevation:5}} underlayColor={'rgba(255,255,0,0.5)'} onPress={()=>navigation.navigate('Cadastro')}>
       <Text style={{textAlign:'center',fontSize:25,fontWeight:'bold'}}>CADASTRAR</Text>
     </TouchableHighlight>


     <GoogleSigninButton size={GoogleSigninButton.Size.Wide} style={{marginTop:10}} onPress={()=>googleLogin()}></GoogleSigninButton>
     </View>
     </ImageBackground>
    </View>
 
    );
}