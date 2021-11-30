import React, { Component } from 'react'
import {Alert, Text, TouchableOpacity, View} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default class AtividadeMat2 extends Component{

    constructor(){
        super()
        
        
        this.figura=[]
        this.pressionou=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        this.denominador=this.geraNumero(1,20)
        this.numerador=this.geraNumero(1,this.denominador)
        this.figura=this.sorteiaFigura()
        this.state={
            numIncial:this.denominador,
            numerador:this.numerador,
            denominador:this.denominador,
            icons:this.carregaIcons(this.denominador)

        }

        }

        geraNumero(min,max){

            return Math.floor(Math.random() * (max - min + 1)) + min
        }

        carregaIcons(num){
             
            let icons=[]
            for(let i=0;i<num;i++){

                icons.push(

                   this.pressionou[i] == 0
                    ?
                    <TouchableOpacity onPress={()=>{
                        this.pressionou[i]=1
                        this.setState({
                            ...this.state,
                            icons:this.carregaIcons(this.state.numIncial)
                        })
                    }} key={i}>

                        <FontAwesome5 name={this.figura[0]} size={70} color={'black'}></FontAwesome5>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={()=>{
                        this.pressionou[i]=0
                        this.setState({
                            ...this.state,
                            icons:this.carregaIcons(this.state.numIncial)
                        })
                    }} key={i}>

                        <FontAwesome5 name={this.figura[0]} size={70} color={this.figura[1]}></FontAwesome5>
                    </TouchableOpacity>



                )
            }
            return icons
        }

        verificaAcertou(){
            let count=0
            this.pressionou.map(a=>{
                if(a ==1)
                ++count
            })

            if(count == this.state.numerador){
                Alert.alert('Acertou!!')
                  this.mudaAcertou()
            }
            else Alert.alert('Errou!!')
        }

        mudaAcertou(){
            this.figura=this.sorteiaFigura()
            this.pressionou=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            this.denominador=this.geraNumero(1,20)
            this.numerador=this.geraNumero(1,this.denominador)
            this.setState({
                numIncial:this.denominador,
                numerador:this.numerador,
                denominador:this.denominador,
               icons:this.carregaIcons(this.denominador)
            })
        }
        sorteiaFigura(){
            let color
            let arrayFigura=['apple-alt','heart','cookie','basketball-ball','football-ball','volleyball-ball','cat']
            let index=this.geraNumero(0,arrayFigura.length-1)
                switch(index){
                    case 0:
                        color='red'
                        break
                    case 1:
                        color='red'
                        break
                    case 2:
                        color='brown'
                        break
                    case 3:
                        color='#cf6143'
                        break
                    case 4:
                        color='#9c5c08'
                        break
                    case 5:
                        color='#003487'
                        break
                    case 6:
                        color='orange'
                        break
                    default:
                        break
                } 

                return [arrayFigura[index],color]

        }

    render(){

        

        return(

  
            <View style={{flex:1}}>
            <View style={{flex:2, justifyContent:'center',alignItems:'center',}}>
            <View style={{flex:1,marginTop:'10%'}}>
          
          <View><Text style={{fontSize:40}}>{this.state.numerador}</Text></View>
          <View><Text>_____</Text></View>
          <View><Text style={{fontSize:40}}>{this.state.denominador}</Text></View>

            </View>
            </View>

               <View style={{flex:6, justifyContent:'center',flexDirection:'column',marginLeft:'5%'}}>

               <View style={{flexDirection:'row',flexWrap:'wrap',}}>
                   {
                    this.state.icons
                    }
               </View>
                
            </View>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <FontAwesome5 name={'check-circle'} size={80} color={'green'} onPress={()=>this.verificaAcertou()}></FontAwesome5>
            </View>
            </View>
        );
    }
}