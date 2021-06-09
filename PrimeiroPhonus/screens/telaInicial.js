import React from 'react'
import {View,ImageBackground,StyleSheet,Text, Image, TouchableOpacity} from 'react-native'
import {PanGestureHandler} from 'react-native-gesture-handler'
import Reanimated, {useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring}  from 'react-native-reanimated'
import Lottie from 'lottie-react-native'


export default ({navigation})=>{
    const posX=useSharedValue(0)
    const posY=useSharedValue(0)

    const onGestureEvent=useAnimatedGestureHandler({

        onStart(event,ctx){

            ctx.posX=posX.value
            ctx.posY=posY.value
        },
        onActive(event,ctx){
            posX.value= ctx.posX+event.translationX
            posY.value=ctx.posY+event.translationY
        },
        onEnd(){

            posX.value=withSpring(0)
            posY.value=withSpring(0)
        }

    })

    const positionStyle=useAnimatedStyle(()=>{
        return{
            transform:[

                {translateX:posX.value},
                {translateY:posY.value},
            ]
        }
    })

    return(


 <View style={estilo.container}>
  
<ImageBackground style={estilo.imagem} source={require('../imagens/fundo.png')}>
<View>
<PanGestureHandler onGestureEvent={onGestureEvent}>
<Reanimated.View style={[estilo.logo,positionStyle]}>
<Image source={require('../imagens/blackboard.png')}></Image>
</Reanimated.View>
</PanGestureHandler>

<View style={{marginLeft:'25%'}}>

<Text style={estilo.texto}>PHONUS</Text>
</View>

</View>


<View style={{marginLeft:'27%',width:130,marginTop:'10%'}}>

    <TouchableOpacity style={estilo.botao} onPress={()=>navigation.navigate('Login')}> 
        <Text style={{textAlign:'center',color:'black',fontSize:20}}>LOGIN</Text>
    
       
<Lottie style={{width:50, height:50,marginLeft:'12%'}} source={require('../lottie/letters.json')} loop autoPlay></Lottie>
    </TouchableOpacity>


    
    <TouchableOpacity style={estilo.botao} onPress={()=>navigation.navigate("Cadastro")}> 
        <Text style={{textAlign:'center',color:'black',fontSize:20}}>CADASTRO</Text>
    
        <Lottie style={{width:50, height:50,marginLeft:'20%'}} source={require('../lottie/numbers.json')} loop autoPlay></Lottie>
    </TouchableOpacity>
</View>

</ImageBackground>

</View>
    );
}

const estilo=StyleSheet.create({

    container:{
      flex:1,
      flexDirection:'row'
  
    },
    imagem:{
  width:500,
  height:830
    },
    logo:{
     width:130,
     height:130,
     marginVertical:'2%',
    marginLeft:'28%'
    
     
    },
    texto:{
        color:'white',
        fontSize:40,
        fontFamily:'Inlanders'
        
    },
    botao:{
backgroundColor:'yellow',
marginTop:'30%',
borderRadius:25
    }
  })