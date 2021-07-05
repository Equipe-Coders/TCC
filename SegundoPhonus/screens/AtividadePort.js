import React,{Component, useState,useEffect} from 'react'
import {View,Text,Image,Button,StyleSheet,TouchableOpacity, Alert,Modal,Animated,Vibration} from 'react-native'
import Sound from 'react-native-sound'
import Lottie from 'lottie-react-native'
import Tts from 'react-native-tts'
import VerificarSilaba from './verificarSilaba'

//import { set } from 'react-native-reanimated'


export default class AtividadePort extends Component{

    
  constructor(props){

    super(props)
  Tts.setDefaultLanguage('pt-BR')
    this.offset=new Animated.ValueXY({x:1000,y:0})

    //
    Animated.spring(this.offset.x,{
        toValue:0,
        speed:0.5,
        useNativeDriver:true
    }).start()
   
    
this.acertou=false
this.errou=false

this.pressionavel=[false,false,false,false,false,false]
this.pressionado=[]
this.backgroundSilabas=['rgb(236, 255, 69)','rgb(236, 255, 69)','rgb(236, 255, 69)','rgb(236, 255, 69)','rgb(236, 255, 69)','rgb(236, 255, 69)']
  this.silabas=[]
  this.index=0
 

  this.state={
      botaoPressionado:this.pressionado,
      backgroundColor:this.backgroundSilabas,
      pressionarDesabilitado:this.pressionavel,
      palavra:this.props.route.params.content[this.index].palavra,
      imagem:this.props.route.params.content[this.index].imagem,
      numSilabas:this.props.route.params.content[this.index].numSilabas,
      silaba1:this.props.route.params.content[this.index].silaba1,
      silaba2:this.props.route.params.content[this.index].silaba2,
      silaba3:this.props.route.params.content[this.index].silaba3,
      silaba4:this.props.route.params.content[this.index].silaba4,
      silaba5:this.props.route.params.content[this.index].silaba5,
      silaba6:this.props.route.params.content[this.index].silaba6,
      silabasAux:this.silabas,
    
  }

 

 

  }


 soundCorrect = new Sound('bell.wav', Sound.MAIN_BUNDLE);
 soundIncorrect= new Sound('incorrect.wav', Sound.MAIN_BUNDLE);

  ///////////////////////////////////////////////
  
  
   mudaDados=()=>{
   this.offset=new Animated.ValueXY({x:1000,y:0})
    Animated.spring(this.offset.x,{
        toValue:0,
        speed:0.5,
        useNativeDriver:true
    }).start()

    this.index++
    this.silabas=[]

    if(typeof this.props.route.params.content[this.index] === 'undefined'){
        this.index=0
        
    }
    this.pressionado=[]
    this.pressionavel=[false,false,false,false,false,false]
    this.backgroundSilabas=['rgb(236, 255, 69)','rgb(236, 255, 69)','rgb(236, 255, 69)','rgb(236, 255, 69)','rgb(236, 255, 69)','rgb(236, 255, 69)']

    this.setState({
        botaoPressionado:this.pressionado,
      backgroundColor:this.backgroundSilabas,
      pressionarDesabilitado:this.pressionavel,
      palavra:this.props.route.params.content[this.index].palavra,
      imagem:this.props.route.params.content[this.index].imagem,
      numSilabas:this.props.route.params.content[this.index].numSilabas,
      silaba1:this.props.route.params.content[this.index].silaba1,
      silaba2:this.props.route.params.content[this.index].silaba2,
      silaba3:this.props.route.params.content[this.index].silaba3,
      silaba4:this.props.route.params.content[this.index].silaba4,
      silaba5:this.props.route.params.content[this.index].silaba5,
      silaba6:this.props.route.params.content[this.index].silaba6,
      silabasAux:this.silabas
    })

   
    
  }

  

  adicionaLetra=async(letra,index)=>{
     Vibration.vibrate(5,false)
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

  verificaAcertou=()=>{
  
let aux=''

this.state.silabasAux.forEach(silaba=>{
    aux+=silaba
})

if(aux == this.state.palavra){
    this.soundCorrect.play()
    this.acertou=true
    setTimeout(()=>this.acertou=false,500)
    setTimeout(()=>this.mudaDados(),1000)

}
    
else{
this.soundIncorrect.play()
this.mudaErrou()

}


  }
  
  mudaErrou=async()=>{
    this.silabas=[]
    this.pressionado=[]
    this.pressionavel=[false,false,false,false,false,false]
    this.backgroundSilabas=['rgb(236, 255, 69)','rgb(236, 255, 69)','rgb(236, 255, 69)','rgb(236, 255, 69)','rgb(236, 255, 69)','rgb(236, 255, 69)']
    
     
   setTimeout(()=>{
       this.setState({
          botaoPressionado:this.pressionado,
           backgroundColor:this.backgroundSilabas,
           pressionarDesabilitado:this.pressionavel,
           silabasAux:this.silabas
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

  

    render(){

        
     
        let quadrado=[]
        while(quadrado.length)quadrado.pop()
        
        for(let i=0;i<this.props.route.params.content[this.index].numSilabas;i++){
            quadrado.push(<View style={{borderColor:'black',borderStyle:'solid',borderWidth:1,width:100,height:100,margin:5,borderRadius:25}} key={i}>
      
      <Text style={{textAlign:'center',fontSize:40,textTransform:'uppercase'}}>{this.state.silabasAux[i]}</Text>
            </View>)
        
        }



        //verificar se terminou  
        if (this.state.silabasAux.length==this.state.numSilabas){
           
           

            this.verificaAcertou()

           
        }
        return(

       <View style={{flexDirection:'column'}}>

   <View style={{alignItems:'flex-end',marginRight:30,marginTop:5}}>
    <TouchableOpacity onPress={()=>Tts.speak(this.state.palavra,{
        androidParams:{
            KEY_PARAM_PAN: 1,
            KEY_PARAM_VOLUME: 1,
            KEY_PARAM_STREAM: 'STREAM_MUSIC',
        }
    })}>
  <Image source={require('../images/audio.png')} style={{width:60,height:40}}></Image>
  </TouchableOpacity>

   </View>
           <Animated.View style={[
              {
                  transform:[{
                      translateX:this.offset.x
                  }]
              }
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

         <Image source={require('../images/remove.png')} style={{width:50,height:50}}></Image>
         </TouchableOpacity>
     </View>
    </View>
            <View>

             
            </View>



   <View style={{alignItems:'center'}}>

            <View style={{flexDirection:'row',flexWrap:'wrap'}}>


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
               <Lottie source={require('../lottie/correct-animation.json')}  style={{width:350,height:350}} autoPlay loop></Lottie>
                
            </View>

        </View>
    </Modal>
   
    </Animated.View>

   </View>

        );
    }
}

const estilo=StyleSheet.create({

    silabas:{
     
        borderStyle:'solid',
        borderColor:'black',
        borderWidth:2,
        width:115,
        height:110,
        margin:10,
        borderRadius:30,
        justifyContent:"center"
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