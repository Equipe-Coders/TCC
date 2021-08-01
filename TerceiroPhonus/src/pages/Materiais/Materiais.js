import { use } from 'ast-types'
import React,{useEffect,useState} from 'react'
import {View,Text,FlatList,ActivityIndicator, TouchableOpacity} from 'react-native'
import Estilo from './Estilo'
import Firestore from '@react-native-firebase/firestore'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
export default({navigation})=>{
    const [loading, setLoading] = useState(true);
    const [materiais,setMateriais]=useState([null])

    useEffect(() => {
        const subscriber = Firestore()
          .collection('materiais')
          .onSnapshot(querySnapshot => {
            const arrayMateriais = [];
      
            querySnapshot.forEach(documentSnapshot => {
              arrayMateriais.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
      
            setMateriais(arrayMateriais)
            setLoading(false)
           
          });
      
      
        return () => subscriber();
      }, []);

      if(loading){
          return <ActivityIndicator></ActivityIndicator>
      }
    return(

        <View style={{flex:1,flexDirection:'column'}}>
            
            <Text style={Estilo.textoTitulo}>Materiais</Text>

            <View style={Estilo.viewCorpo}>
               
            <FlatList
                data={materiais}
                renderItem={({ item }) => (
                <TouchableOpacity onPress={()=>{navigation.navigate('MostraMateriais',{url:item.url})}}>


 
                 <View style={{ flex: 2, alignItems: 'center',width:350,flexDirection:'row',marginTop:25,backgroundColor:'yellow',borderRadius:10, shadowColor:'black',shadowOffset:{width:0,height:1},shadowOpacity:1,shadowRadius:2,elevation:5}}>
                
                   <View style={{flex:1}}> 
                    {

                     item.tipo == 'pdf' ? <FontAwesome5 name="file-pdf" color={'black'} size={100}></FontAwesome5> : null

                    }

                   </View>
                   
                   <View style={{flex:2,alignItems:'center'}}>

                       <Text style={{textAlign:'center'}}>Disciplina:{item.disciplina}</Text>
                   </View>
               
                 </View>

                </TouchableOpacity>
               
               )}
                />
              
            </View>
            
        </View>
    );
}