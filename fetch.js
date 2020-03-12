import React from 'react';
import { FlatList, ActivityIndicator, Text, View } from 'react-native';

export default class FetchExample extends React.Component {
constructor(props){
super(props);
this.state =[{ userId:"",
id:"",
title:""
}];
}
componentDidMount(){
return fetch('https://jsonplaceholder.typicode.com/albums')
.then(response => response.json())
.then(Json =>{
this.setState({
dataSource: Json,
}, function(){});
})
.catch((error) =>{
alert(Error);
});
}
render(){
return(
<View style={{flex: 1, paddingTop:20}}>
    <Text style={{color:"red", fontSize:30,textAlign:"center"}}>Fetched Data</Text>
<FlatList
data={this.state.dataSource}
renderItem={({item}) =>
<View style={{marginTop:25, backgroundColor:"red", borderColor:"black", borderWidth:2}}>
<Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>userId:<Text>{item.userId}</Text></Text>
<Text style={{fontSize:18,color:'white',fontWeight:'600'}}>id: {item.id}</Text>
<Text style={{fontSize:18,color:'white',fontWeight:'600'}}>title:{item.title}</Text>
</View>}
keyExtractor={({id}, index) => id}
/>
</View>
);
}
}