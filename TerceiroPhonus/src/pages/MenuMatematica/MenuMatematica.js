import React from 'react'
import {View,Text, ImageBackground,ScrollView,TouchableOpacity} from 'react-native'
import Lottie from 'lottie-react-native'
import Estilo from './Estilo';

export default({navigation})=>{
    return(

        <View style={{flex:1}}>
            <ImageBackground source={require('../../../assets/images/background.png')} style={Estilo.imageBackground}>

            <Text style={Estilo.textTitle}>Matemática</Text>

             <ScrollView>

               <View style={Estilo.viewAtividade}>

                   <TouchableOpacity onPress={()=>navigation.navigate('AtividadeMat1')}>

                   <View style={{alignItems:'center'}}>
                
                    <Text style={{textAlign:'center',fontWeight:'bold'}}>VOZ MATEMÁTICA</Text>
                    <Lottie source={require('../../../assets/lottie/matematicando.json')} loop autoPlay style={{width:130,height:130}}></Lottie>

                    </View>     
                   </TouchableOpacity>

               </View>

             </ScrollView>
          

            </ImageBackground>
            
            </View>
    );
}