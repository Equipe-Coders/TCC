import React,{useState,useEffect, useRef} from 'react'
import {View,Text, Image, Alert, TouchableOpacity, Modal,FlatList,ActivityIndicator, ScrollView, ImageBackground, TextInput} from 'react-native'
import Estilo from './Estilo'
import Firestore from '@react-native-firebase/firestore'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Reanimated,{useSharedValue,useAnimatedStyle, withSpring} from 'react-native-reanimated'



export default({route})=>{
    const [avatar,setAvatar]=useState(route.params.Avatar)
    const [avatarSelecionado,setAvatarSelecionado]=useState(route.params.Avatar)
    const [nome,setNome]=useState(route.params.Nome)
    const [id,setID]=useState(route.params.ID)
    const [modal,setModal]=useState(false)
    const [avatares,setAvatares]=useState([])
    const [nomeAtual,setNomeAtual]=useState(nome)
    
useEffect(()=>{

    if(!route.params.Google){

        const atualiza=Firestore().collection('usuario').doc(id).onSnapshot(dadosUsuario=>{
            setNome(dadosUsuario.data().Apelido)
            setAvatar(dadosUsuario.data().Avatar)
        })
        
        return()=>{
            atualiza()
        }
    }else{
        return()=>{

        }
    }
},[])

 
    

   
//Firestore.FieldValue.increment(1)
    
    const rModal=useSharedValue(2000)

    const styleModal=useAnimatedStyle(()=>{
        return{
            transform:[{translateY:withSpring(rModal.value)}]
        }
    })


  const atualizaAvatar=()=>{
      Firestore().collection('usuario').doc(id).update({
           Avatar:avatarSelecionado
      })
  }
   

     const carregaAvatares=async()=>{
    
        if(!route.params.Google){
            
        
       await Firestore().collection('avatar').onSnapshot(querySnapShot=>{
           const arrayCoresAvatares=[]
           const arrayAvatares=[]
           for(let i=0;i<querySnapShot.size;i++){
              arrayCoresAvatares.push('black')
           }

           querySnapShot.forEach((documentSnapShot,index)=>{
               arrayAvatares.push(<Reanimated.View key={index} style={[{
                   borderRadius:20,
                   margin:10,
                   borderStyle:'solid',
                   borderWidth:5,
                   borderColor:'black'
                   }]}>
                       <TouchableOpacity onPress={()=>setAvatarSelecionado(documentSnapShot.data().diretorio)}>
                          <Image source={{uri:documentSnapShot.data().diretorio}} style={{width:150,height:150}}></Image>
                       </TouchableOpacity>

               </Reanimated.View>)
           })
           setAvatares(arrayAvatares)
        
         
       })
    }
    
    }

    const atualizaApelido=()=>{
        Firestore().collection('usuario').doc(id).update({
            Apelido:nomeAtual
        })
    }




    return(
    

        <View style={{flex:1,flexDirection:'column'}}>
            <ImageBackground style={Estilo.imageBackGround} source={require('../../../assets/images/background.png')}>
           
           {
              !route.params.Google
              ?
              <Modal style={{flex:1}} visible={modal} transparent={true}>
              <View style={{flex:1,flexDirection:'column',backgroundColor:'rgba(0,0,0,0.7)',alignItems:'center',justifyContent:'center'}}>
                 <Reanimated.View style={[{width:380,height:650,flexDirection:'column',backgroundColor:'white',borderRadius:15},styleModal]}>
 
                        <View style={{alignItems:'flex-end'}}>
                            <MaterialIcons name='close-circle' color={'black'} size={35} onPress={()=>{
                            rModal.value=2000
                            setTimeout(()=>{
                             setModal(!modal)
                            },300)
                          
                            
                            }}>
                            </MaterialIcons>
                         </View>
                         <View style={{alignItems:'center',backgroundColor:'#f2f2f2',borderRadius:10}}>
                              
                         <Text style={{fontSize:20,fontWeight:'bold'}}>Avatar selecionado:</Text>
                         <Image source={{uri:avatarSelecionado}} style={{width:150,height:150}}/>
 
                         </View>
                         <ScrollView style={{flex:1}}>
                             <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
                                 <View style={{flex:1,alignItems:"center"}}>
                                   <View style={{flex:1,alignItems:'center',flexDirection:'row',flexWrap:'wrap'}}>
                                    {avatares}
                                  </View>
                                 </View>
                         
                         </View>
                         </ScrollView>
 
                         <View style={{alignItems:'center'}}>
                             <MaterialIcons name='check-bold' color={'green'} size={70} onPress={()=>{
                                 atualizaAvatar()
                                 rModal.value=2000
                                 setTimeout(()=>{
                                  setModal(!modal)
                                 },300)
                                 }}></MaterialIcons>
                         </View>
                 </Reanimated.View>
              </View>
            </Modal>
            :
            null
           }
          




            <Text style={Estilo.textoTitulo}>Perfil</Text>
             
            <View style={Estilo.viewImagem}>
                {
                    route.params.Google 
                    ?
                    <Image source={{uri:avatar}} style={Estilo.imagemPerfil}></Image>
                    :
                    <TouchableOpacity onPress={()=>{
                        carregaAvatares().then(()=>{
                            setModal(!modal)
                            rModal.value=0
                        })
                       
                        }}>
                    <Image source={{uri:avatar}} style={Estilo.imagemPerfil}></Image>
                    </TouchableOpacity>
                }

            </View>

            <View style={Estilo.viewCorpo}>
                {
                    route.params.Google
                    ?
                    <View>
                    <Text style={{color:'white',textAlign:'center',fontWeight:'bold'}}>Apelido</Text>
                    <TextInput value={nome} style={{backgroundColor:'white',width:250,height:50,borderRadius:10,borderStyle:'solid',borderWidth:4,borderColor:'black'}} editable={false}></TextInput>
                    </View>
                    :
                    <View>
                    <Text style={{color:'white',textAlign:'center',fontWeight:'bold'}}>Apelido</Text>
                    <TextInput defaultValue={nome}
                               onChangeText={text=>setNomeAtual(text)}
                               value={nomeAtual}
                               onEndEditing={text=>atualizaApelido()}  
                               style={{backgroundColor:'white',width:250,height:50,borderRadius:10,borderStyle:'solid',borderWidth:4,borderColor:'black'}}                  
                    ></TextInput>
                    </View>
                }
                
               

            </View>

            </ImageBackground>
        
        </View>
    );
}