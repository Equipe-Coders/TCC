import React,{useEffect,useState} from 'react'
import {View,Text,StyleSheet, ScrollView, TouchableOpacity,Button, Alert} from 'react-native'
import '@react-native-firebase/app'
import Firestore from  '@react-native-firebase/firestore'


export default ({navigation},props)=>{



   //pegar todas as palavras

const pegaDados=async ()=>{
    let todasPalavras=[]
    const dadosBanco=await Firestore().collection('palavras').get()
    await dadosBanco.forEach(palavrasBanco=>{
      todasPalavras.push({
          palavra:palavrasBanco.data().palavra,
          imagem:palavrasBanco.data().imagem,
          numSilabas:palavrasBanco.data().numSilabas,
          silaba1:palavrasBanco.data().silaba1,
          silaba2:palavrasBanco.data().silaba2,
          silaba3:palavrasBanco.data().silaba3,
          silaba4:palavrasBanco.data().silaba4,
          silaba5:palavrasBanco.data().silaba5,
          silaba6:palavrasBanco.data().silaba6,
        })
    })


  
    
     navigation.navigate('AtividadePort',{content:todasPalavras})
}
  


   
    return(
        
        <View>

         
            <ScrollView>

        <View style={{flex:1,flexDirection:'row',alignItems:"flex-start",flexWrap:'wrap'}}>
  


        <View style={estilo.categoria}>

        <TouchableOpacity style={{width:'100%',height:'100%',alignItems:'center'}} onPress={()=>pegaDados()}>

<Text>TEste</Text>
<Text></Text>
</TouchableOpacity>
           
         </View>


         <View style={estilo.categoria}>

          
           
         </View>


         <View style={estilo.categoria}>

          
           
         </View>


         <View style={estilo.categoria}>

          
           
        </View>



        <View style={estilo.categoria}>

          
           
       </View>




       <View style={estilo.categoria}>

          
           
      </View>




      <View style={estilo.categoria}>

          
           
    </View>



    <View style={estilo.categoria}>

          
           
    </View>



    <View style={estilo.categoria}>

          
           
    </View>


    <View style={estilo.categoria}>

          
           
    </View>



       


        </View>

        </ScrollView>
        </View>
    );
}

const estilo=StyleSheet.create({

    categoria:{

         borderColor:'black',
         borderStyle:'solid',
         borderWidth:1,
         width:150,
         height:150,
         marginLeft:30,
         marginTop:25,
         borderRadius:60
         

    }
})