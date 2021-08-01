import React from 'react'
import {View,Text, ImageBackground, TouchableOpacity} from 'react-native'
import Estilo from './Estilo'
import Lottie from 'lottie-react-native'
import Firestore from '@react-native-firebase/firestore'

export default({navigation})=>{

    const carregaAtividade1=async()=>{
        await Firestore().collection('palavras').get().then(dadosPalavaras=>{
            if (!dadosPalavaras.empty){
                const arrayPalavras=[]
                dadosPalavaras.forEach(palavras=>{
                  arrayPalavras.push({imagem:palavras.data().imagem,numSilabas:palavras.data().numSilabas,palavra:palavras.data().palavra,silaba1:palavras.data().silaba1,silaba2:palavras.data().silaba2,silaba3:palavras.data().silaba3,silaba4:palavras.data().silaba4,silaba5:palavras.data().silaba5,silaba6:palavras.data().silaba6})
                })
                navigation.navigate('AtividadePort1',{content:arrayPalavras})
            }
        })
    }
    return(

        <View style={{flex:1}}>
            <ImageBackground source={require('../../../assets/images/background.png')} style={Estilo.imageBackground}>

            <Text style={Estilo.textTitle}>Português</Text>
            <View style={Estilo.viewAtividade}>
                <TouchableOpacity onPress={()=>carregaAtividade1()}>
               <View style={{alignItems:'center'}}>
                
                <Text style={{textAlign:'center',fontWeight:'bold'}}>SILABANDO</Text>
                <Lottie source={require('../../../assets/lottie/silabando.json')} loop autoPlay style={{width:130,height:130}}></Lottie>

                </View>     
                </TouchableOpacity>      
            </View>

            </ImageBackground>
            
            </View>
    );
}