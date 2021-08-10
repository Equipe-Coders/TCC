import React,{useEffect} from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import Estilo from './Estilo'
import Reanimated,{useSharedValue,useAnimatedStyle,interpolateColor,useDerivedValue, withTiming, withRepeat} from 'react-native-reanimated'
import Lottie from 'lottie-react-native'
import NetInfo from '@react-native-community/netinfo'
import Firestore from '@react-native-firebase/firestore'
import Auth from '@react-native-firebase/auth'
export default ({navigation,route})=>{



    useEffect(()=>{
     startAnimation()
     NetInfo.addEventListener(networkState=>{
        if(networkState.isConnected && networkState.type =='wifi'){
          navigation.reset({
              index:0,
              routes:[{name:'Menu'}]
          })
        
        }
    })
    },[])
    const animation=useSharedValue(0)
    const animationColor=useDerivedValue(()=>{
        return interpolateColor(animation.value,[0,1],['#ffffff','#000000'])
    })

    const animationStyle=useAnimatedStyle(()=>{
        return{
            color:animationColor.value
        }
    })
  
    const startAnimation=()=>{
     //loop
      
            
        animation.value=withRepeat(withTiming(1,{duration:10000}),-1,true)
        
       
    }
   
    return(

       <View style={{flex:1,backgroundColor:'#70e0a5',flexDirection:'column'}}>

      


        <View style={Estilo.viewCorpo}>

         <Reanimated.Text style={[Estilo.textTitulo,animationStyle]}>Sem Internet</Reanimated.Text>
           
        
         
           <Lottie source={require('../../../assets/lottie/internetError.json')} autoPlay={true} style={{width:400,height:400}} loop={false}></Lottie>

        </View>




       </View>

    );
}