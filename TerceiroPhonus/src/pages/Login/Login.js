import React,{useState} from 'react'
import {View,Text, Alert, ImageBackground,TextInput, Button,TouchableHighlight} from 'react-native'
import Estilo from './Estilo'
import {Hideo,Kohana,Fumi} from 'react-native-textinput-effects'
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Firestore from '@react-native-firebase/firestore'
import Reanimated,{useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated'
import Auth from '@react-native-firebase/auth'
import Storage from '@react-native-async-storage/async-storage'


//import Firestore from '@react-native-firebase/firestore'
export default ({navigation})=>{

    const [email,setEmail]=useState('')
    const [senha,setSenha]=useState('')
    const [erro,setErro]=useState('none')
    const [statusErro,setStatusErro]=useState(null)
    

    const styleErro=useSharedValue(1000)

    const animatedStyle=useAnimatedStyle(()=>{
        return{
            transform:[{translateX:withSpring(styleErro.value)}]
        }
    })


    const login=()=>{
       
Firestore().collection('usuario').where('Email','==',email).where('Senha','==',senha).limit(1).get().then(dadosUsuario=>{
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
      

        <Reanimated.View style={[Estilo.erro,{display:erro},animatedStyle]}>
           <Text style={{textAlign:'center',color:'red'}}>{statusErro}</Text>
        </Reanimated.View>


        </View>

      

        </ImageBackground>
    </View>

    );
}