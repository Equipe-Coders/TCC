import React,{Component} from 'react'
import {View,Text,Image,Button,StyleSheet,TouchableOpacity, Alert,Modal,Animated,Vibration, ScrollView,ImageBackground, Dimensions,TouchableHighlight} from 'react-native'
import Sound from 'react-native-sound'
import Lottie from 'lottie-react-native'
import Tts from 'react-native-tts'
import VerificarSilaba from './verificarSilaba'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import Reanimated,{useSharedValue,useAnimatedStyle,withSpring} from 'react-native-reanimated'
import Firestore from '@react-native-firebase/firestore'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import ViewShot from 'react-native-view-shot'
import RNFS from 'react-native-fs'
import Share from 'react-native-share'

//import { set } from 'react-native-reanimated'


export default class AtividadePort extends Component{

    
  constructor(props){

    super(props)
     Tts.setDefaultLanguage('pt-BR')//configurando o idioma da voz
     
     //Animação
     this.offset=new Animated.ValueXY({x:1000,y:0})
     this.AnimModal=new Animated.ValueXY({y:-1000,x:0})
     
    Animated.spring(this.offset.x,{
        toValue:0,
        speed:0.5,
        useNativeDriver:true
    }).start()

    //Reanimated
  
  
   //const increment=Firestore.FieldValue.increment()

   ///////////////////////////////////

    this.arrayPalavras=this.embaralhaArray(this.props.route.params.content)
    
    this.acertou=false
    this.errou=false
    this.pressionavel=[false,false,false,false,false,false]
    this.pressionado=[]
    this.backgroundSilabas=['rgb(236, 255, 69)','rgb(236, 255, 69)','rgb(236, 255, 69)','rgb(236, 255, 69)','rgb(236, 255, 69)','rgb(236, 255, 69)']
    this.silabas=[]
    this.index=0
    this.modalFinalizou=false
  //this.shakeAnimation = new Animated.Value(0);

  this.state={
      id:this.props.route.params.ID,
      botaoPressionado:this.pressionado,
      backgroundColor:this.backgroundSilabas,
      pressionarDesabilitado:this.pressionavel,
      palavra:this.arrayPalavras[this.index].palavra,
      imagem:this.arrayPalavras[this.index].imagem,
      numSilabas:this.arrayPalavras[this.index].numSilabas,
      silaba1:this.arrayPalavras[this.index].silaba1,
      silaba2:this.arrayPalavras[this.index].silaba2,
      silaba3:this.arrayPalavras[this.index].silaba3,
      silaba4:this.arrayPalavras[this.index].silaba4,
      silaba5:this.arrayPalavras[this.index].silaba5,
      silaba6:this.arrayPalavras[this.index].silaba6,
      silabasAux:this.silabas,
      imgLottie:this.arrayPalavras[this.index].lottie,
      modalIdiomas:false,
      traducao:{
          fr:this.arrayPalavras[this.index].traducao[0],
          it:this.arrayPalavras[this.index].traducao[1],
          es:this.arrayPalavras[this.index].traducao[2],
          en:this.arrayPalavras[this.index].traducao[3],
        
        },
        sequencia:0,
        
    
  }

 

 

  }


 componentWillUnmount(){
    // global.som.play()
    global.somFundo(global.auxiliar)
 }
  embaralhaArray=(array)=>{

    for (let i = array.length - 1; i > 0; i--) {
        // Escolhendo elemento aleatório
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [array[i], array[j]] = [array[j], array[i]];
   }
   // Retornando array com aleatoriedade
    return array;
  }


 soundCorrect = new Sound('bell.wav', Sound.MAIN_BUNDLE);
 soundIncorrect= new Sound('incorrect.wav', Sound.MAIN_BUNDLE);

  ///////////////////////////////////////////////
  
  animModalFinalizou=()=>{
    this.AnimModal=new Animated.ValueXY({y:-1000,x:0})
    Animated.spring(this.AnimModal.y,{
        toValue:0,
        speed:0.5,
        useNativeDriver:true
    }).start()
  }
  
   mudaDados=()=>{
   this.offset=new Animated.ValueXY({x:1000,y:0})
    Animated.spring(this.offset.x,{
        toValue:0,
        speed:0.5,
        useNativeDriver:true
    }).start()

    this.index++
    this.silabas=[]

    if(typeof this.arrayPalavras[this.index] === 'undefined'){
        this.index=0
        
    }
    this.pressionado=[]
    this.pressionavel=[false,false,false,false,false,false]
    this.backgroundSilabas=['rgb(236, 255, 69)','rgb(236, 255, 69)','rgb(236, 255, 69)','rgb(236, 255, 69)','rgb(236, 255, 69)','rgb(236, 255, 69)']
    let seq=this.state.sequencia
    this.setState({
        sequencia:++seq,
      botaoPressionado:this.pressionado,
      backgroundColor:this.backgroundSilabas,
      pressionarDesabilitado:this.pressionavel,
      palavra:this.arrayPalavras[this.index].palavra,
      imagem:this.arrayPalavras[this.index].imagem,
      numSilabas:this.arrayPalavras[this.index].numSilabas,
      silaba1:this.arrayPalavras[this.index].silaba1,
      silaba2:this.arrayPalavras[this.index].silaba2,
      silaba3:this.arrayPalavras[this.index].silaba3,
      silaba4:this.arrayPalavras[this.index].silaba4,
      silaba5:this.arrayPalavras[this.index].silaba5,
      silaba6:this.arrayPalavras[this.index].silaba6,
      imgLottie:this.arrayPalavras[this.index].lottie,
      silabasAux:this.silabas,
      traducao:{
        fr:this.arrayPalavras[this.index].traducao[0],
        it:this.arrayPalavras[this.index].traducao[1],
        es:this.arrayPalavras[this.index].traducao[2],
        en:this.arrayPalavras[this.index].traducao[3],
      
      }
    })

   
    
  }

  

  adicionaLetra=async(letra,index)=>{
     Vibration.vibrate(5,false)
     Tts.setDefaultLanguage('pt-BR')
    await Tts.speak(VerificarSilaba(letra),{
        androidParams:{
            KEY_PARAM_PAN: 1,
            KEY_PARAM_VOLUME: 1,
            KEY_PARAM_STREAM: 'STREAM_MUSIC',
        }})
     this.pressionado.push(index)
     this.silabas.push(letra)
     this.backgroundSilabas[index]='rgb(212, 210, 207)'
     this.pressionavel[index]=true
     this.setState({
        
        botaoPressionado:this.pressionado,
        backgroundColor:this.backgroundSilabas,
        pressionarDesabilitado:this.pressionavel,   
         silabasAux:this.silabas
 })
  }

  mudaPontuacao=()=>{
      
    Firestore().collection('usuario').doc(this.state.id).update({
        Pontuacao:Firestore.FieldValue.increment(1*this.state.numSilabas)
    })
  }

  verificaAcertou=()=>{
  
let aux=''

this.state.silabasAux.forEach(silaba=>{
    aux+=silaba
})

if(aux == this.state.palavra){
    this.soundCorrect.play()
    
    
    this.acertou=true
    this.mudaPontuacao()
    setTimeout(()=>this.acertou=false,500)
    setTimeout(()=>this.mudaDados(),1000)

}
    
else{

this.soundIncorrect.play()
this.mudaErrou()
this.modalFinalizou=true

}


  }
  
  mudaErrou=async()=>{

    this.startShake()
    this.animModalFinalizou()
    this.silabas=[]
    this.pressionado=[]
    this.pressionavel=[false,false,false,false,false,false]
    this.backgroundSilabas=['rgb(236, 255, 69)','rgb(236, 255, 69)','rgb(236, 255, 69)','rgb(236, 255, 69)','rgb(236, 255, 69)','rgb(236, 255, 69)']
    
     
   setTimeout(()=>{
       this.setState({
          botaoPressionado:this.pressionado,
           backgroundColor:this.backgroundSilabas,
           pressionarDesabilitado:this.pressionavel,
           silabasAux:this.silabas,
           
       })

       
   },900)
    
  }

  

  removeSilaba=()=>{


    if(this.silabas.length>0){

        let numElementos=this.pressionado.length
        let removerIndex=this.pressionado[numElementos-1]

        this.pressionavel[removerIndex]=false
        this.backgroundSilabas[removerIndex]='rgb(236, 255, 69)'

        Vibration.vibrate(5,false)
        this.pressionado.pop()
        this.silabas.pop()
        this.setState({
            backgroundColor:this.backgroundSilabas,
            pressionarDesabilitado:this.pressionavel,
            silabasAux:this.silabas
        })
    }

  }

    startShake = () => {
      Animated.sequence([
      Animated.timing(this.offset.x, { toValue: 50, duration: 100, useNativeDriver: true }),
      Animated.timing(this.offset.x, { toValue: -50, duration: 100, useNativeDriver: true }),
      Animated.timing(this.offset.x, { toValue: 50, duration: 100, useNativeDriver: true }),
      Animated.timing(this.offset.x, { toValue: 0, duration: 100, useNativeDriver: true })
    ]).start();
 }

 falaTraducao=(siglaIdioma)=>{

    
    switch(siglaIdioma){
        case 'fr':
            Tts.setDefaultLanguage('fr-FR')
            Tts.speak(this.state.traducao.fr)
            break
        case 'it':
            Tts.setDefaultLanguage('it-IT')
            Tts.speak(this.state.traducao.it)
            break
        case 'es':
            Tts.setDefaultLanguage('es-ES')
            Tts.speak(this.state.traducao.es)
            break
        case 'en':
            Tts.setDefaultLanguage('en-GB')
            Tts.speak(this.state.traducao.en)
            break
        default:
            break
    }
    

 }

 ScreenShotAndShare=()=>{

    this.refs.viewShot.capture().then((uri)=>{
        RNFS.readFile(uri,'base64').then((res)=>{
            let urlString='data:image/jpeg;base64,'+res
            let options={
                title:'Minha Potuação - Phonus',
                message:'Olhe minha pontuação!!!',
                url:urlString,
                type:'image/jpeg',
            };
            Share.open(options)
        })
    })
 }
 

    render(){

        

        
     
        let quadrado=[]
        while(quadrado.length)quadrado.pop()
        
        for(let i=0;i<this.arrayPalavras[this.index].numSilabas;i++){
            quadrado.push(<View style={{borderColor:'black',borderStyle:'solid',borderWidth:1,width:100,height:100,margin:5,borderRadius:25,justifyContent:'center', backgroundColor:'rgba(255,255,255,0.7)'}} key={i}>
      
                 <Text style={{textAlign:'center',fontSize:40,textTransform:'uppercase'}}>{this.state.silabasAux[i]}</Text>
            </View>)
        
        }



        //verificar se terminou  
        if (this.state.silabasAux.length==this.state.numSilabas){
           
           

            this.verificaAcertou()

           
        }


        return(






       <View>
         
       <ImageBackground style={{flexDirection:'column',width:Dimensions.get('screen').width,height:Dimensions.get('screen').height+50}} source={require('../../../../assets/images/background.png')}>  

       <Modal style={{flex:1}} transparent={true} visible={this.state.modalIdiomas}>

           <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.7)',alignItems:'center',justifyContent:'center'}}>
              
              <Reanimated.View style={[{height:'90%',width:'90%',backgroundColor:'white',borderRadius:15},]}>
   
                <View style={{flexDirection:'row-reverse'}}><AntDesign name='closecircle' color={'black'} size={46} onPress={()=>this.setState({...this.state,modalIdiomas:!this.state.modalIdiomas})}></AntDesign></View>

                    
                 <ScrollView style={{flex:1}}>
                      
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                   
                      <View style={{width:'100%',marginTop:20,borderBottomColor:'black',borderBottomWidth:1,flexDirection:'row'}}>
                          <TouchableOpacity onPress={()=>this.falaTraducao('fr')} style={{marginLeft:100}}><Image source={require('../../../../assets/images/flags/france.png')}></Image></TouchableOpacity><Text style={{textTransform:'uppercase',fontWeight:'bold',marginLeft:15,textAlignVertical:'center'}}>{this.state.traducao.fr}</Text>
                      </View>
                      <View style={{width:'100%',marginTop:20,borderBottomColor:'black',borderBottomWidth:1,flexDirection:'row'}}>
                          <TouchableOpacity onPress={()=>this.falaTraducao('it')} style={{marginLeft:100}}><Image source={require('../../../../assets/images/flags/italy.png')}></Image></TouchableOpacity><Text style={{textTransform:'uppercase',fontWeight:'bold',marginLeft:15,textAlignVertical:'center'}}>{this.state.traducao.it}</Text>
                      </View>
                      <View style={{width:'100%',marginTop:20,borderBottomColor:'black',borderBottomWidth:1,flexDirection:'row'}}>
                          <TouchableOpacity onPress={()=>this.falaTraducao('es')} style={{marginLeft:100}}><Image source={require('../../../../assets/images/flags/spain.png')}></Image></TouchableOpacity><Text style={{textTransform:'uppercase',fontWeight:'bold',marginLeft:15,textAlignVertical:'center'}}>{this.state.traducao.es}</Text>
                       </View>
                      <View style={{width:'100%',marginTop:20,borderBottomColor:'black',borderBottomWidth:1,flexDirection:'row'}}>
                          <TouchableOpacity onPress={()=>this.falaTraducao('en')} style={{marginLeft:100}}><Image source={require('../../../../assets/images/flags/united-kingdom.png')}></Image></TouchableOpacity><Text style={{textTransform:'uppercase',fontWeight:'bold',marginLeft:15,textAlignVertical:'center'}}>{this.state.traducao.en}</Text>
                     </View>
                     
                   </View>

                 </ScrollView>

              </Reanimated.View>

           </View>


       </Modal>






       <View style={{marginRight:30,marginTop:5,flexDirection:'row-reverse'}}>
       <TouchableOpacity onPress={()=>{
           
           Tts.setDefaultLanguage('pt-BR')
           Tts.speak(this.state.palavra,{
            androidParams:{
            KEY_PARAM_PAN: 1,
            KEY_PARAM_VOLUME: 1,
            KEY_PARAM_STREAM: 'STREAM_MUSIC',
       }
       })}}>

     <AntDesign name='sound' color={'black'} size={46}></AntDesign>
  </TouchableOpacity>
  <TouchableOpacity style={{marginRight:20}} onPress={()=>this.setState({...this.state,modalIdiomas:!this.state.modalIdiomas})}>

      <Entypo name='info-with-circle' color={'black'} size={46}></Entypo>
  </TouchableOpacity>

   </View>
           <Animated.View style={[
              {
                  transform:[{
                      translateX:this.offset.x,
                  }]
              },
              //{transform:[{translateX:this.shakeAnimation}]}
           ]}>

          
          
           <View style={{alignItems:'center'}}>
            <Image style={{width:256,height:256}} source={{uri:this.state.imagem}}></Image>
            </View>

    <View style={{alignItems:"center"}}>
     <View style={{flexDirection:'row',marginTop:10,marginBottom:10}}>
  
     {quadrado}
     
     </View>

     <View style={{marginLeft:250}}>
         <TouchableOpacity onPress={()=>this.removeSilaba()}>

        <AntDesign name='delete' color={'black'} size={46}></AntDesign>
         </TouchableOpacity>
     </View>
    </View>
           


   <View style={{alignItems:'center',width:'100%',height:'100%'}}>

            <View style={{flexDirection:'row',flexWrap:'wrap',width:'100%',height:'100%'}}>


           <View><TouchableOpacity style={[estilo.silabas,{backgroundColor:this.state.backgroundColor[0]}]} onPress={()=>this.adicionaLetra(this.state.silaba1,0)} disabled={this.state.pressionarDesabilitado[0]} ><Text style={estilo.textoSilabas}>{this.state.silaba1}</Text></TouchableOpacity></View>
           <View><TouchableOpacity style={[estilo.silabas,{backgroundColor:this.state.backgroundColor[1]}]} onPress={()=>this.adicionaLetra(this.state.silaba2,1)} disabled={this.state.pressionarDesabilitado[1]}><Text style={estilo.textoSilabas}>{this.state.silaba2}</Text></TouchableOpacity></View>
           <View><TouchableOpacity style={[estilo.silabas,{backgroundColor:this.state.backgroundColor[2]}]} onPress={()=>this.adicionaLetra(this.state.silaba3,2)} disabled={this.state.pressionarDesabilitado[2]}><Text style={estilo.textoSilabas}>{this.state.silaba3}</Text></TouchableOpacity></View>
           <View><TouchableOpacity style={[estilo.silabas,{backgroundColor:this.state.backgroundColor[3]}]} onPress={()=>this.adicionaLetra(this.state.silaba4,3)} disabled={this.state.pressionarDesabilitado[3]}><Text style={estilo.textoSilabas}>{this.state.silaba4}</Text></TouchableOpacity></View>
           <View><TouchableOpacity style={[estilo.silabas,{backgroundColor:this.state.backgroundColor[4]}]} onPress={()=>this.adicionaLetra(this.state.silaba5,4)} disabled={this.state.pressionarDesabilitado[4]}><Text style={estilo.textoSilabas}>{this.state.silaba5}</Text></TouchableOpacity></View>
           <View><TouchableOpacity style={[estilo.silabas,{backgroundColor:this.state.backgroundColor[5]}]} onPress={()=>this.adicionaLetra(this.state.silaba6,5)} disabled={this.state.pressionarDesabilitado[5]}><Text style={estilo.textoSilabas}>{this.state.silaba6}</Text></TouchableOpacity></View>

            </View>

    </View>



    <Modal transparent={true} animationType='fade' visible={this.acertou}>
        <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)'}}>
            
            
            <View style={{alignItems:'center'}}>
               <Lottie source={require('../../../../assets/lottie/correct-animation.json')}  style={{width:350,height:350}} autoPlay loop></Lottie>
                
            </View>

        </View>
    </Modal>
   
    </Animated.View>

    <Modal style={{flex:1}} transparent={true} visible={this.modalFinalizou}>
     <ViewShot  ref={'viewShot'} options={{format:'jpg', quality:0.9}} style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.7)'}}>
     
         <Animated.View style={[{width:'90%',height:'70%',backgroundColor:'white',borderRadius:15},{transform:[{translateY:this.AnimModal.y}]}]}>
         <ImageBackground source={require('../../../../assets/images/background-modal.png')} style={{flex:1,borderRadius:15}}>
              <View><Text style={{fontSize:30,textAlign:'center'}}>Sequência: {this.state.sequencia}</Text></View>
              
              
              <View style={{flex:4,alignItems:'center',justifyContent:'center'}}>
                 <Lottie source={require('../../../../assets/lottie/48530-prize-podium.json')} loop={false} autoPlay style={{width:'100%',height:'100%'}}></Lottie>
              </View>
              <View style={{flexDirection:'row',flex:2,alignItems:'center',justifyContent:'center'}}>
                  <View style={{flex:1,flexDirection:"row",justifyContent:'space-between'}}>


                 <TouchableHighlight style={{backgroundColor:'#ffff00',width:'40%',height:50,borderRadius:15,alignItems:'center',justifyContent:'center',marginTop:15,shadowColor:'black',shadowOffset:{width:0,height:1},shadowOpacity:1,shadowRadius:2,elevation:5}} underlayColor={'rgba(255,255,0,0.5)'} onPress={()=>this.ScreenShotAndShare()}>
                    <FontAwesome name='share-alt' size={46} color={'black'}></FontAwesome>
                 </TouchableHighlight>   

                <TouchableHighlight style={{backgroundColor:'#ffff00',width:'40%',height:50,borderRadius:15,alignItems:'center',justifyContent:'center',marginTop:15,shadowColor:'black',shadowOffset:{width:0,height:1},shadowOpacity:1,shadowRadius:2,elevation:5}} underlayColor={'rgba(255,255,0,0.5)'} onPress={()=>{
                    this.setState({
                        ...this.state,
                        sequencia:0,
                    })
                    this.modalFinalizou=false
                
                }}>
                   <FontAwesome name='arrow-right' size={46} color={'black'}></FontAwesome>
                </TouchableHighlight>     
                  </View>
              </View>
              </ImageBackground>
         </Animated.View>
        
     </ViewShot>
    </Modal>

    </ImageBackground>

   </View>

        );
    }
}

const estilo=StyleSheet.create({

    silabas:{
     
        borderStyle:'solid',
        borderColor:'black',
        borderWidth:2,
        width:95,
        height:'25%',
        margin:10,
        borderRadius:30,
        justifyContent:"center",
    
        //backgroundColor:'rgb(236, 255, 69)'
   
        
    },
    textoSilabas:{
textTransform:'uppercase',     
  textAlign:'center',
  fontSize:40
    },
    viewSilabas:{
    
    
    }
})