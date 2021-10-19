import React from 'react'
import {View,Text, ImageBackground, TouchableOpacity, ScrollView} from 'react-native'
import Estilo from './Estilo'
import Lottie from 'lottie-react-native'
import Firestore from '@react-native-firebase/firestore'

export default({navigation,route})=>{

    const carregaAtividade1=async()=>{
    
        await Firestore().collection('palavras').get().then(dadosPalavaras=>{
            if (!dadosPalavaras.empty){
                const arrayPalavras=[]
                dadosPalavaras.forEach(palavras=>{
                  arrayPalavras.push({imagem:palavras.data().imagem,numSilabas:palavras.data().numSilabas,palavra:palavras.data().palavra,silaba1:palavras.data().silaba1,silaba2:palavras.data().silaba2,silaba3:palavras.data().silaba3,silaba4:palavras.data().silaba4,silaba5:palavras.data().silaba5,silaba6:palavras.data().silaba6,traducao:palavras.data().Traducao,lottie:palavras.data().Lottie})
                })
                navigation.navigate('AtividadePort1',{content:arrayPalavras,ID:route.params.ID,Google:route.params.Google})
            }
        })
    }

    const carregaAtividade2=async()=>{
        
        await Firestore().collection('palavras').get().then(dadosPalavaras=>{
            if(!dadosPalavaras.empty){
                const arrayPalavras=[]
                dadosPalavaras.forEach(palavra=>{
                    arrayPalavras.push(palavra.data().palavra)
                })
                navigation.navigate('AtividadePort2',{palavras:arrayPalavras})
            }
        })
    }
    return(

        <View style={{flex:1}}>
            <ImageBackground source={require('../../../assets/images/background.png')} style={Estilo.imageBackground}>

            <Text style={Estilo.textTitle}>Português</Text>
            <ScrollView>
            <View style={Estilo.viewAtividade}>
                <TouchableOpacity onPress={()=>carregaAtividade1()}>
               <View style={{alignItems:'center'}}>
                
                <Text style={{textAlign:'center',fontWeight:'bold'}}>SILABANDO</Text>
                <Lottie source={require('../../../assets/lottie/silabando.json')} loop autoPlay style={{width:130,height:130}}></Lottie>

                </View>     
                </TouchableOpacity>      
            </View>
            <View style={Estilo.viewAtividade}>

                <TouchableOpacity onPress={()=>carregaAtividade2()}>
                  <View style={{alignItems:'center'}}>
                    <Text style={{textAlign:'center',fontWeight:'bold'}}>FALAÇÃO</Text>
                    <Lottie source={require('../../../assets/lottie/voice-bar.json')} loop autoPlay style={{width:130,height:130}}></Lottie>
                  </View>

                </TouchableOpacity>
            </View>
            </ScrollView>
            </ImageBackground>
            
            </View>
    );
}