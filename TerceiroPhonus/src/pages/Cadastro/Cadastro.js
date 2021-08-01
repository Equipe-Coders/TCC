import React,{useState} from 'react'
import {ImageBackground, View,Text,TouchableHighlight, Alert} from 'react-native'
import Estilo from './Estilo'
import {Fumi} from 'react-native-textinput-effects'
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Auth from '@react-native-firebase/auth'

export default()=>{

    const [email,setEmail]=useState('')
    const [senha,setSenha]=useState('')
    

    const cadastrar=()=>{

        try{
            
          
                
            }catch(ex){

            }

        
    }

    return(

        <View style={{flex:1}}> 
         <ImageBackground source={require('../../../assets/images/background.png')} style={Estilo.imagemBackground}>
          
          <View><Text style={Estilo.textoTitulo}>CADASTRO</Text></View>

          <View style={Estilo.viewCorpo}>

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


        <TouchableHighlight style={{backgroundColor:'#ffff00',width:200,height:50,borderRadius:15,justifyContent:'center',marginTop:15,shadowColor:'black',shadowOffset:{width:0,height:1},shadowOpacity:1,shadowRadius:2,elevation:5}} underlayColor={'rgba(255,255,0,0.5)'} onPress={()=>cadastrar()}>
            <Text style={{textAlign:'center',fontSize:25,fontWeight:'bold'}}>CADASTRAR</Text>
        </TouchableHighlight>
            
          </View>


         </ImageBackground>

        </View>
    );
}