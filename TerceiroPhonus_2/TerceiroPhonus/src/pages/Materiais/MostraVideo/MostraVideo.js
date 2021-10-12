import React, { useState,useRef } from 'react'
import {Alert, ImageBackground, View,Dimensions,Text,Modal,Linking} from 'react-native'
import YoutubeIframe,{getYoutubeMeta} from 'react-native-youtube-iframe';
import Lottie from 'lottie-react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'



export default({route})=>{
     const [title,setTitle]=useState()
     const [author,setAuthor]=useState()
     const [duration,setDuration]=useState()
     const [modalCarregamento,setModalCarregamento]=useState(true)
     const [modalInfo,setModalInfo]=useState(false)

     const PlayerRef=useRef()
     getYoutubeMeta(route.params.url).then(meta=>{
         setTitle(meta.title)
         setAuthor(meta.author_name)
        
     })

    //Alert.alert(route.params.url)
    return(

        <View style={{flex:1}}>
            <ImageBackground source={require('../../../../assets/images/background.png')} style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height+50}}>

          
          <Text style={{color:'white',textAlign:'auto',fontSize:25}}>{title}</Text>
          
          
           <YoutubeIframe
           height={300}
           videoId={route.params.url}
           ref={PlayerRef}
           onReady={()=>{PlayerRef.current?.getDuration().then(tempo=>{
            let minutes= Math.floor(tempo/60)   
            let seconds=tempo -minutes*60
            setDuration(`${minutes}:${seconds}`)
            setModalCarregamento(false)
          
        })}}
           >

           </YoutubeIframe>
           <FontAwesome name='info-circle' color={'black'} size={70} onPress={()=>setModalInfo(!modalInfo)}></FontAwesome>
           
           </ImageBackground>

           <Modal style={{flex:1}} transparent={false} visible={modalCarregamento}>
             <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.8)',alignItems:'center',justifyContent:'center'}}>

              <View style={{backgroundColor:'white',width:'80%',height:'40%',borderRadius:15,alignItems:'center',justifyContent:'center'}}>
            
                 <Lottie source={require('../../../../assets/lottie/loading-paperplane.json')} autoPlay loop style={{height:'90%',width:'90%'}}></Lottie>
              </View>

             </View>

           </Modal>

           <Modal style={{flex:1}} transparent={true} visible={modalInfo}>
            <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.7)',alignItems:'center',justifyContent:'center'}}>
             
             <View style={{backgroundColor:'white',height:'40%',width:'80%',borderRadius:15}}>
            <View style={{alignItems:'flex-end'}}><FontAwesome name='close' size={40} color={'black'} onPress={()=>setModalInfo(!modalInfo)}></FontAwesome></View>
           <Text style={{fontSize:20,textAlign:'center',fontWeight:'bold'}}>Mais informações</Text>
             
           <Text style={{color:'black',marginTop:10}}>Canal: {author}</Text>
           <Text style={{color:'black'}}>Duração: {duration}</Text>
           <View style={{alignItems:'center',justifyContent:'center',flex:2}}>
           <View style={{alignItems:'center',width:'20%',backgroundColor:'white',borderRadius:15,justifyContent:'center'}}>
               <Text>Abrir no Youtube</Text>
           <FontAwesome name='youtube-play' size={60} color={'red'} onPress={()=>Linking.openURL(`https://www.youtube.com/watch?v=${route.params.url}`)}></FontAwesome>
           </View>
           </View>
          

             </View>

            </View>

           </Modal>

        </View>
    );
}