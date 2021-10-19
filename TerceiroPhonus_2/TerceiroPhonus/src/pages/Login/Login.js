import React,{useState} from 'react'
import {View,Text, Alert, ImageBackground,TextInput, Button,TouchableHighlight, Modal, Keyboard} from 'react-native'
import Estilo from './Estilo'
import {Hideo,Kohana,Fumi} from 'react-native-textinput-effects'
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Firestore from '@react-native-firebase/firestore'
import Reanimated,{useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated'
import Auth from '@react-native-firebase/auth'
import Storage from '@react-native-async-storage/async-storage'
import RNSmtpMailer from 'react-native-smtp-mailer'
import Lottie from 'lottie-react-native'

//import Firestore from '@react-native-firebase/firestore'
export default ({navigation})=>{

    const [email,setEmail]=useState('')
    const [senha,setSenha]=useState('')
    const [erro,setErro]=useState('none')
    const [statusErro,setStatusErro]=useState(null)
    const [modalEnviarEmail,setModalEnviarEmail]=useState(false)
    const [emailEnviar,setEmailEnviar]=useState('')
    const [enviandoEmail,setEnviandoEmail]=useState(false)
    const [sucessoEnviar,setSucessoEnviar]=useState(false)

    const styleErro=useSharedValue(1000)
    const styleEnviarEmail=useSharedValue(-1000)

    const animatedStyle=useAnimatedStyle(()=>{
        return{
            transform:[{translateX:withSpring(styleErro.value)}]
        }
    })

    const animatedEnviarEmail=useAnimatedStyle(()=>{
        return{
            transform:[{translateY: withSpring(styleEnviarEmail.value)}]
        }
    })


    const login=()=>{
       
    Firestore().collection('usuario').where('Email','==',email.trim()).where('Senha','==',senha).limit(1).get().then(dadosUsuario=>{
    if(!dadosUsuario.empty){
        dadosUsuario.forEach(dados=>{
            armazenaDados(dados.id).then(()=>{


                navigation.reset({
                    index:0,
                    routes:[{name:'TelaInicial',params:{nome:dados.data().Apelido,uid:dados.id,avatar:dados.data().Avatar,email:dados.data().Email}}]
                })

            })
         
        })
    }
})
    }

    const armazenaDados=async(dadosUsuario)=>{

        try{

            
            await Storage.setItem('@storage_key',dadosUsuario)
        }catch(ex){
           //error
        }
    }
    const recuperarSenha=()=>{

        if(emailEnviar==''){
            
            Alert.alert('Você deve preencher seu email!!')
        }else{
            Firestore().collection('usuario').where('Email','==',emailEnviar.trim()).limit(1).get().then(dadosUsuario=>{
                if(!dadosUsuario.empty){
                    setEnviandoEmail(true)
                    dadosUsuario.forEach(data=>{

                        RNSmtpMailer.sendMail({
                            mailhost:'smtp.gmail.com',
                            port:"465",
                            ssl:true,
                            username:'coders.equipe@gmail.com',
                            password:'coders123',
                            fromName:'Equipe Coders',
                            recipients:data.data().Email,
                            subject:'Sua senha',
                            htmlBody:`Olá ${data.data().Apelido}!<br>Você solicitou sua senha, aqui está:<br><b>${data.data().Senha}</b>`
                        }).then(()=>{
                            setSucessoEnviar(true)
                            setTimeout(()=>{
                               styleEnviarEmail.value=-1000
                               setModalEnviarEmail(!modalEnviarEmail)
                               setEnviandoEmail(false)
                               setSucessoEnviar(false)
                               setEmailEnviar('')
                            },1000)
                        })
                    })
                }
                else{
                    Alert.alert('Email não encontrado!!')
                }
            })
           
        }
    }

    return(

    <View style={{flex:1,flexDirection:'column'}}>
        <ImageBackground source={require('../../../assets/images/background.png')} style={Estilo.imageBackground}>
        <View style={{marginTop:15}}> 
            
        <Text style={Estilo.textTitle}>LOGIN</Text>

        </View>

        <View style={{marginTop:50,alignItems:'center',flexDirection:'column',}}>

      
        <Fumi
          label={'Email'}
          iconClass={CommunityIcons}
          iconName={'email'}
          iconColor={'#f95a25'}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          style={{width:280,borderRadius:15,shadowColor:'black',shadowOffset:{width:0,height:1},shadowOpacity:1,shadowRadius:2,elevation:5}}
          onChangeText={text=>setEmail(text)}
        />

        <Fumi
          label={'Senha'}
          iconClass={CommunityIcons}
          iconName={'key'}
          iconColor={'#f95a25'}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          style={{width:280,borderRadius:15,marginTop:25,shadowColor:'black',shadowOffset:{width:0,height:1},shadowOpacity:1,shadowRadius:2,elevation:5}}
          onChangeText={text=>setSenha(text)} 
          secureTextEntry={true}    
        />
          

        <TouchableHighlight style={{backgroundColor:'#ffff00',width:200,height:50,borderRadius:15,justifyContent:'center',marginTop:15,shadowColor:'black',shadowOffset:{width:0,height:1},shadowOpacity:1,shadowRadius:2,elevation:5}} underlayColor={'rgba(255,255,0,0.5)'} onPress={()=>login()}>
            <Text style={{textAlign:'center',fontSize:25,fontWeight:'bold'}}>LOGIN</Text>
        </TouchableHighlight>
      
      <TouchableHighlight style={{marginTop:'10%'}} onPress={()=>{
          setModalEnviarEmail(true)
          styleEnviarEmail.value=0
      }} underlayColor={'transparent'}>
          <Text style={{color:'white',fontSize:18,fontWeight:'bold',textDecorationLine:'underline'}}>Esqueceu a senha?</Text>
      </TouchableHighlight>

        <Reanimated.View style={[Estilo.erro,{display:erro},animatedStyle]}>
           <Text style={{textAlign:'center',color:'red'}}>{statusErro}</Text>
        </Reanimated.View>


        </View>

        <Modal style={{flex:1}} transparent={true} visible={modalEnviarEmail}>
 
           <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.7)'}}>

                <Reanimated.View style={[{width:'90%',height:'40%',backgroundColor:'white',borderRadius:15},animatedEnviarEmail]}>
                 <View style={{flexDirection:'row-reverse'}}><CommunityIcons name={'close-circle'} color={'black'} size={46} onPress={()=>{
                     setModalEnviarEmail(!modalEnviarEmail)
                     styleEnviarEmail.value=-1000
                     }}></CommunityIcons></View>

                     <View style={{alignItems:'center'}}>

                     <Fumi
                       label={'Email'}
                       iconClass={CommunityIcons}
                       iconName={'email'}
                       iconColor={'#f95a25'}
                       iconSize={20}
                       iconWidth={40}
                       inputPadding={16}
                       style={{width:280,borderRadius:15,shadowColor:'black',shadowOffset:{width:0,height:1},shadowOpacity:1,shadowRadius:2,elevation:5}}
                       onChangeText={text=>setEmailEnviar(text)}
                    />

                      <TouchableHighlight style={{backgroundColor:'#ffff00',width:200,height:50,borderRadius:15,justifyContent:'center',marginTop:15,shadowColor:'black',shadowOffset:{width:0,height:1},shadowOpacity:1,shadowRadius:2,elevation:5}} underlayColor={'rgba(255,255,0,0.5)'} onPress={()=>{
                          Keyboard.dismiss()
                          recuperarSenha()
                          }}>
                       <Text style={{textAlign:'center',fontSize:25,fontWeight:'bold'}}>Enviar</Text>
                      </TouchableHighlight>

                     </View>

                     <View style={{alignItems:'center',justifyContent:'center'}}>
                         {
                             !enviandoEmail
                              ?
                              null
                              :
                              sucessoEnviar
                              ?
                              <Lottie source={require('../../../assets/lottie/57137-success-tick.json')} autoPlay loop={false} style={{width:'70%',height:'70%'}}></Lottie>
                              :
                              <Lottie source={require('../../../assets/lottie/loading-paperplane.json')} autoPlay loop style={{width:'70%', height:'70%'}}></Lottie>
                         }
                     </View>

               </Reanimated.View>


               </View>

        </Modal>

      

        </ImageBackground>
    </View>

    );
}