import { StatusBar } from 'expo-status-bar';
import { useState,useEffect, useCallback } from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { FlatList, StyleSheet, Text, View,Image   } from 'react-native';



let limit=10
let loadmore=true
const App=()=>{
const [skip,setSkip]=useState(0)
  const [data,setData]=useState([])
 

useEffect(()=>{
  fetchdata()

},[])
  const fetchdata=()=>{
    let query=`?skip${skip}&limit=${limit}`
    fetch('https://dummyjson.com/products' +query)
.then(res => res.json())
.then(res=>{
  console.log("api data",res)
if(res.products.length==0){
  loadmore=false
}

  setData([...data,...res.products])
  setSkip(skip+10)
 
}).catch((error=>{
  console.log(("error shows",error))
}))
  }
  // console.log("products data",data)

const reanderItem=useCallback(({item})=>{
  
  return (
    <View style={styles.flatStyle}>
     <Image
     style={styles.imageStyle}
     source={{uri:item.thumbnail}}
     />
     <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:8}}>
      <Text>{item.brand}</Text>
      <Text>{item.price}</Text>
      


      </View> 
      <Text>{item.description}</Text>
    </View>
  )
},[data])

const keyExtractor=useCallback((item)=>`${item.id}`)
const onEndReached=()=>{
  // alert("end reached")
  if(loadmore){
    setShowloader(true)
    fetchdata()
  }
}





const ItemSeparatorComponent=useCallback(()=>{
return(<View style={{height:10}}/>)
},[data])
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <FlatList
      data={data}
      renderItem={reanderItem}
keyExtractor={keyExtractor}
ItemSeparatorComponent={ItemSeparatorComponent}
onEndReached={onEndReached}

      />
     
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  marginHorizontal:16
  },
  imageStyle:{
    width:'100%',
    height:200,
    borderRadius:8,
    marginTop:40
  },
  flatStyle:{
    shadowColor:"#000",
    shadowOffset:{
      width:0,
      height:1
    },
    shadowOpacity:0.20,
    shadowRadius:1.41,
    elevation:2,
    backgroundColor:'white',
    padding:8,
    margin:2,
    borderRadius:8
  }
});

export default App