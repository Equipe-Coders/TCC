import React,{useState} from 'react'
import {ImageBackground, View,Text,TouchableHighlight, Alert,Image,TouchableOpacity,Modal,ScrollView} from 'react-native'
import Estilo from './Estilo'
import {Fumi} from 'react-native-textinput-effects'
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Firestore from '@react-native-firebase/firestore'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Reanimated,{useSharedValue,withSpring,useAnimatedStyle} from 'react-native-reanimated'
import {validate} from 'react-email-validator'


//import Auth from '@react-native-firebase/auth'

export default()=>{

    const [email,setEmail]=useState('')
    const [senha,setSenha]=useState('')
    const [apelido,setApelido]=useState('')
    const [apareceModal,setApareceModal]=useState(false)
    const [avatarEscolhido,setAvatarEscolhido]=useState('')
    const [avatar,setAvatar]=useState('')
    const [arrayAvatar,setArrayAvatar]=useState([])

    const rmodal=useSharedValue(-1000)

    const animatedModal=useAnimatedStyle(()=>{

            return{
              transform:[{translateY:withSpring(rmodal.value)}]
            }
    })
    const cadastrar=()=>{

        try{
            
          Firestore().collection('usuario').add({
            Apelido:apelido.trim(),
            Avatar:avatar,
            Email:email.trim(),
            Senha:senha,
            Pontuacao:0
          }).then(()=>{
            Alert.alert('Dados cadastrados')
           setApelido('')
           setEmail('')
           setSenha('')
           setAvatarEscolhido('')
           setAvatar('')
          })
                
            }catch(ex){

            }

        
    }

    const carregaAvatares=async()=>{
      
      let avatares=[]
      await Firestore().collection('avatar').get().then(async dados=>{
      
        dados.forEach(function(dadosAvatar){
           
           avatares.push(

               <View key={dadosAvatar.id} style={{width:140,height:140,margin:8,borderStyle:'solid',borderWidth:2,borderColor:'black',borderRadius:10}}>
                   <TouchableOpacity onPress={()=>setAvatarEscolhido(dadosAvatar.data().diretorio)}>
                     <Image  source={{uri:dadosAvatar.data().diretorio}} style={{width:130,height:130,backgroundColor:'rgb(255, 214, 255)'}}></Image>
                   </TouchableOpacity>
               </View>
           )
       })

       setArrayAvatar(avatares)
      })
   }

   const verificaEmailBanco=()=>{

    Firestore().collection('usuario').where('Email','==',email.trim()).get().then(dadosUsuario=>{
      if(dadosUsuario.empty){
    //se não encontrar -->não está cadastrado

    //verificar se o email é real
    if(validate(email)){

      cadastrar()
    }else{
      Alert.alert('Email inválido')
    }

      }else{
        Alert.alert('Esse email já está cadastrado!!')
      }
    })
   }

   const verificaCampos=()=>{

    if(email && senha && apelido && avatar){
      //todos os campos preenchidos
      verificaEmailBanco()
    }else{
      // se não
      Alert.alert('Preencha todos os campos')
    }
   }

    return(

        <View style={{flex:1}}> 
         <ImageBackground source={require('../../../assets/images/background.png')} style={Estilo.imagemBackground}>
          
          <View><Text style={Estilo.textoTitulo}>CADASTRO</Text></View>

          <View style={Estilo.viewCorpo}>

          <Fumi
          label={'Apelido'}
          iconClass={FontAwesome5}
          iconName={'user-alt'}
          iconColor={'#f95a25'}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          style={{width:280,borderRadius:15,shadowColor:'black',shadowOffset:{width:0,height:1},shadowOpacity:1,shadowRadius:2,elevation:5}}
          onChangeText={text=>setApelido(text)}
          value={apelido}        
        />

          <Fumi
          label={'Email'}
          iconClass={CommunityIcons}
          iconName={'email'}
          iconColor={'#f95a25'}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          style={{width:280,borderRadius:15,marginTop:25 ,shadowColor:'black',shadowOffset:{width:0,height:1},shadowOpacity:1,shadowRadius:2,elevation:5}}
          onChangeText={text=>setEmail(text)}
          value={email}
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
          value={senha} 
        />

        <View style={{flexDirection:'row'}}>
            <TouchableHighlight style={Estilo.botao} underlayColor={'rgba(255, 247, 20, 0.5)'} onPress={()=>{
                     carregaAvatares().then(()=>{
                        setApareceModal(!apareceModal)
                        rmodal.value=0
                     })
                     }}>
                           <Text style={{fontWeight:'bold',fontSize:25}}>AVATAR</Text>
                </TouchableHighlight>
                <View style={{justifyContent:'center',}}>

                {
                    avatar
                    ?
                    <FontAwesome name='check' size={50} color={'white'}></FontAwesome>
                    :
                    null
                }
                </View>

                </View>

        <TouchableHighlight style={{backgroundColor:'#ffff00',width:200,height:50,borderRadius:15,justifyContent:'center',marginTop:15,shadowColor:'black',shadowOffset:{width:0,height:1},shadowOpacity:1,shadowRadius:2,elevation:5}} underlayColor={'rgba(255,255,0,0.5)'} onPress={()=>verificaCampos()}>
            <Text style={{textAlign:'center',fontSize:25,fontWeight:'bold'}}>CADASTRAR</Text>
        </TouchableHighlight>
            
          </View>



    <Modal style={{flex:1}} transparent={true} visible={apareceModal}>

    <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.8)'}}>
                  <Reanimated.View style={[{width:'90%',height:'90%',backgroundColor:'white',borderRadius:20,},animatedModal]}>

                      <View style={{alignItems:'flex-end'}}><FontAwesome name='close' size={40} color={'black'} onPress={()=>{
                          setApareceModal(!apareceModal)
                          rmodal.value=-1000
                      }}></FontAwesome></View>

                    <Text style={{textAlign:'center',fontSize:20,marginTop:5,alignItems:'center'}}>Escolha um avatar</Text>
                     <View style={{alignItems:'center'}}>
                         <Image source={avatarEscolhido ? {uri:avatarEscolhido} : null} style={{width:150,height:150,backgroundColor:'rgb(89, 240, 104)',borderRadius:15}}></Image>
                     </View>
                    
                    <ScrollView>
                    <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                        {
                            arrayAvatar
                        }
                    </View>
                    </ScrollView>

                    <View style={{alignItems:'center'}}>
                        {
                            !avatarEscolhido 
                            ?
                            <FontAwesome name='check' size={50} color={'grey'}></FontAwesome>
                            :
                            <FontAwesome name='check' size={50} color={'green'} onPress={()=>{
                                setAvatar(avatarEscolhido)
                                setApareceModal(!apareceModal)
                                rmodal.value=-1000
                            }}></FontAwesome>
                        }
                    </View>
                  </Reanimated.View>

               </View>
    </Modal>

         </ImageBackground>

        </View>
    );
}