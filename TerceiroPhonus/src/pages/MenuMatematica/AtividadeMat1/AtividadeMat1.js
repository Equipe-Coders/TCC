import React,{Component} from 'react'
import {View,Text,Alert,Modal} from 'react-native'
import Voice from '@react-native-voice/voice'
import Lottie from 'lottie-react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Sound from 'react-native-sound'

export default class extends Component{

constructor(){
    super()
    
   
     this.arrayOperacoes=['+','-','x']
     this.operacaoEscolhida=this.arrayOperacoes[Math.floor(Math.random() * this.arrayOperacoes.length)]
     this.numero1=this.gerarNumero(this.operacaoEscolhida)
     this.numero2=this.gerarNumero(this.operacaoEscolhida,1)
     this.sequenciaAcertos=0
     this.resultado=this.pegaResultado(this.operacaoEscolhida,this.numero1,this.numero2)
     this.Pressionado=false
   

    this.state={

        operacao:this.operacaoEscolhida,
        num1:this.numero1,
        num2:this.numero2,
        sequencia:this.sequenciaAcertos,
        micPressionado:this.Pressionado,
        resultadoOperacao:this.resultado,
        resultadoFalado:null,
        modalAcertou:false,
        modalErrou:false
       
    }



}

soundClaps = new Sound('bell.wav', Sound.MAIN_BUNDLE);
soundIncorrect= new Sound('incorrect.wav',Sound.MAIN_BUNDLE)

componentDidMount() {
    Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
    Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
 }
 componentWillUnmount(){
  Voice.destroy()
 }

 onSpeechStartHandler(){

    this.setState({
        ...this.state,
        micPressionado:true
    })
 }

 onSpeechEndHandler(){

    this.setState({
        ...this.state,
        micPressionado:false
    })
 }

 async onSpeechResultsHandler(result){

    let numeroFalado=result.value[0]

    this.setState({
        ...this.state,
        resultadoFalado:numeroFalado,
        
    })
    if(numeroFalado == this.state.resultadoOperacao){
      
        this.soundClaps.play()
        this.setState({
            ...this.state,
            modalAcertou:true
        })

        setTimeout(()=>  this.mudaDados(),1000)
      
    }else{
        
        this.soundIncorrect.play()
        this.sequenciaAcertos=0
        this.setState({
            ...this.state,
            sequencia:this.sequenciaAcertos,
            modalErrou:true
            
        })
        setTimeout(()=>this.someModalErrou(),1200)
    }
 }

 someModalErrou(){

    this.setState({
        ...this.state,
        modalErrou:false
    })
 }

 async mudaDados(){

     this.sequenciaAcertos++
     this.operacaoEscolhida=this.arrayOperacoes[Math.floor(Math.random() * this.arrayOperacoes.length)]
     this.numero1=this.gerarNumero(this.operacaoEscolhida)
     this.numero2=this.gerarNumero(this.operacaoEscolhida,1)
     this.resultado=this.pegaResultado(this.operacaoEscolhida,this.numero1,this.numero2)
     this.setState({
         ...this.state,
         operacao:this.operacaoEscolhida,
        num1:this.numero1,
        num2:this.numero2,
        sequencia:this.sequenciaAcertos,
        resultadoOperacao:this.resultado,
        resultadoFalado:null,
        modalAcertou:false
     })
 }

 gerarNumero(operacao,aux=0){
     
    let num
    
    if(operacao == '+' ){

        num=Math.floor(Math.random() * (20 - 1 + 1))+ 1
    }
    else if(operacao == '-'){
        if(aux == 0){
            num=Math.floor(Math.random() * (20 - 1 + 1))+ 1
        }else{

            do{
              
                num=Math.floor(Math.random() * (20 - 1 + 1))+ 1

            }while(num>this.numero1)
        }
    }
    else{

        num=Math.floor(Math.random() * (10 - 1 + 1))+ 1
    }

    return num
 }
 
 pegaResultado(operacao,num1,num2){

    let resultado
    if(operacao == '+'){

     resultado=num1+num2

    }else if(operacao == '-'){

      resultado = num1-num2

    }else if(operacao == 'x'){

      resultado=num1*num2

    }

    return resultado
 }

 async onButtonPress(){

    try{

        if(this.state.micPressionado){
            Voice.cancel()
            this.setState({
                ...this.state,
                micPressionado:false
            })
        }
        else{
            await Voice.start('pt-BR')
        }
    }catch(ex){

    }
 }

render(){

    

    return(

        <View style={{flex:1,flexDirection:'column'}}>

    
         <View style={{flex:1,flexDirection:'row',}}>

             <View style={{flex:2,alignItems:'center',justifyContent:'center',}}>

               <Text style={{fontSize:55}}>{this.state.num1}</Text>

             </View>

             <View style={{flex:1,alignItems:'center',justifyContent:'center',}}>

               <Text style={{fontSize:50}}>{this.state.operacao}</Text>

             </View>

             <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>

               <Text style={{fontSize:55}}>{this.state.num2}</Text>

             </View>
         </View>

         <View style={{flex:4,}}>

          <View style={{flex:1,justifyContent:'center', alignItems:'center',}}>
               
               <Text style={{fontSize:70,fontWeight:'bold'}}>=</Text>

          </View>

          <View style={{flex:1,flexDirection:'row-reverse',}}>

              <View style={{width:'25%',}}>
                {
                    this.state.sequencia >= 0 && this.state.sequencia<= 3 
                    ?
                    <View style={{flex:1, backgroundColor:'#abedec',borderRadius:15,borderStyle:'solid',borderColor:'black',borderWidth:3}}>
                    <Lottie source={require('../../../../assets/lottie/cold.json')} autoPlay loop></Lottie>
                    </View>
                    :
                    this.state.sequencia >3 && this.state.sequencia <=6
                    ?
                    <View style={{flex:1,backgroundColor:'#119c99',borderRadius:15,borderStyle:'solid',borderColor:'black',borderWidth:3}}>
                    <Lottie source={require('../../../../assets/lottie/wind.json')} autoPlay loop></Lottie>
                    </View>
                    :
                    this.state.sequencia >6
                    ?
                    <View style={{flex:1,backgroundColor:'#ed8a2d', borderRadius:15,borderStyle:'solid',borderColor:'black',borderWidth:3}}>
                    <Lottie source={require('../../../../assets/lottie/hot.json')} autoPlay loop></Lottie>
                    </View>
                    :
                    null
                }
              </View>

          </View>

          <View style={{flex:4,}}>

           <View style={{flex:4,alignItems:'center',justifyContent:'center'}}>

             <Text style={{fontSize:80}}>{this.state.resultadoFalado}</Text>

           </View>

           <View style={{flex:2,flexDirection:'row-reverse'}}>

              <View style={{height:'100%',justifyContent:'center'}}>
                 {
                     !this.state.micPressionado
                     ?
                     <FontAwesome5 name='microphone-alt' color={'black'} size={80} onPress={()=>this.onButtonPress()}></FontAwesome5>
                     :
                     <FontAwesome5 name='microphone-alt-slash' color={'red'} size={80} onPress={()=>this.onButtonPress()}></FontAwesome5>
                 }
              </View>

           </View>

          </View>



         </View>


        <Modal transparent={true} visible={this.state.modalAcertou}>
            <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.7)',alignItems:'center',justifyContent:'center'}}>

              <Lottie source={require('../../../../assets/lottie/correct-animation.json')} autoPlay autoSize></Lottie>
               
            </View>

        </Modal>

        <Modal transparent={true} visible={this.state.modalErrou}>
            <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.7)',alignItems:'center',justifyContent:'center'}}>

              <Lottie source={require('../../../../assets/lottie/incorrect.json')} autoPlay speed={2}></Lottie>
               
            </View>

        </Modal>



        </View>

    )
}

}