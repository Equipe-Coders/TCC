
import React,{Component} from 'react'
import {View,Text, Modal, Alert} from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import Voice from '@react-native-voice/voice'
import Lottie from 'lottie-react-native'
export default class extends Component{
    constructor(props){
      super(props)
       this.palavras=this.misturaPalavras(props.route.params.palavras)
       this.index=0
       
       this.state={
           palavraAtual:this.palavras[this.index],
           microfonePressionado:false,
           palavraDita:null,
           acertou:false
       }
      
       
    }
    componentDidMount() {
        Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
        Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
        Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
     }
     componentWillUnmount(){
      Voice.destroy()
     }
    onSpeechResultsHandler(result){
    
        let palavra=this.separarPalavra(result.value)
        this.setState({
            ...this.state,
            palavraDita:palavra
        })

        if(palavra == this.state.palavraAtual){

           this.index++

           if(typeof this.palavras[this.index] == 'undefined'){
               this.index=0
           }
         this.setState({
             ...this.state,
             acertou:true,
             palavraAtual:this.palavras[this.index],
             
         })
        setTimeout(()=>{this.setState({
            ...this.state,
            acertou:false,
            palavraDita:''
        })},1500)
        }
    }

    onSpeechStartHandler(){
        this.setState({
            ...this.state,
            microfonePressionado:true
        })
    }
    onSpeechEndHandler(){
        this.setState({
            ...this.state,
            microfonePressionado:false
        })
    }
     
    async onButtonPress(){
       try{
          if(this.state.microfonePressionado){

            Voice.cancel()
            this.setState({
                ...this.state,
                microfonePressionado:false
            })
          }else{

            await Voice.start('pt-BR')

          }
           
            
           
          
       }catch(ex){

       }
    }
    misturaPalavras=(array)=>{


        for (let i = array.length - 1; i > 0; i--) {
            // Escolhendo elemento aleatório
        const j = Math.floor(Math.random() * (i + 1));
        // Reposicionando elemento
        [array[i], array[j]] = [array[j], array[i]];
    }
    // Retornando array com aleatoriedade
    return array;

    }

    separarPalavra(palavra){
     return palavra[0]
    }

    
     
    render(){
   
        
        return(
        
            <View style={{flex:1,flexDirection:'column'}}>

              <Modal transparent={true} style={{flex:1}} visible={this.state.acertou}>
                <View style={[{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.6)'}]}>
                   <Lottie source={require('../../../../assets/lottie/correct-animation.json')} autoPlay autoSize></Lottie>
                </View>

              </Modal>
                <View style={{marginTop:20}}>
                 
                 <Text style={{textAlign:'center'}}>Leia a palavra:</Text>

                </View>

                <View style={{justifyContent:'center',flex:2}}>

                    <Text style={{textAlign:'center',fontWeight:'bold',textTransform:'uppercase',fontSize:50}}>{this.state.palavraAtual}</Text>
                    <View style={{alignItems:'flex-end',marginTop:80,marginRight:25}}>
                        {
                            !this.state.microfonePressionado
                               ?
                            <FontAwesome5Icon name='microphone-alt' color={'black'} size={70} onPress={()=>this.onButtonPress()}></FontAwesome5Icon>
                               :
                            <FontAwesome5Icon name='microphone-alt-slash' color={'red'} size={70} onPress={()=>this.onButtonPress()}></FontAwesome5Icon>
                        }
                    </View>
                    <View style={{alignItems:'center'}}><Text>{this.state.palavraDita}</Text></View>
                    
                </View>
                  
            </View>

        );
    }
}