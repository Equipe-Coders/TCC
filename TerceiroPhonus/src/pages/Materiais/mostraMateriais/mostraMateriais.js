import React,{useState,useEffect} from 'react'
import {View,Text, Alert,Modal} from 'react-native'
import PDFView from 'react-native-view-pdf'
import Reanimated,{useSharedValue,useAnimatedStyle, withSpring} from 'react-native-reanimated'
import Lottie from 'lottie-react-native'

export default({navigation,route})=>{

    const [visivel,setVisivel]=useState(true)
    const popup=useSharedValue(-1000)


    const estiloPopUp=useAnimatedStyle(()=>{
        return{
            transform:[{translateY:withSpring(popup.value)}]
        }
    })

    useEffect(()=>{
        popup.value=0
    })

    return(

  <View style={{flex:1}}>
      <Modal transparent={true} style={{flex:1}} visible={visivel}>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

            <Reanimated.View style={[{backgroundColor:'#FFBF00',flexDirection:'row', height:150,width:300,borderRadius:15,borderColor:'black',borderStyle:'solid',borderWidth:15},estiloPopUp]}>
               
                <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>
                    <Lottie source={require('../../../../assets/lottie/loading.json')} loop autoPlay={true} autoSize={true}></Lottie>
                </View>
            </Reanimated.View>
        </View>

      </Modal>


    
    <PDFView
    fadeInDuration={250.0}
    style={{flex:1}}
    resource={route.params.url}
    resourceType={'url'}   
    onLoad={()=>{

        popup.value=-1000
        setTimeout(()=>{
           setVisivel(false)
        },300)
        
    }}
    >
      

    </PDFView>
   


  </View>
     
    );
}
