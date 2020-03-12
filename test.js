updateUser() {
    this.setState({
    isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection(firebase.auth().currentUser.uid).doc(this.getKey);
    updateDBRef.set({
    Note: this.state.Note,
    islike: this.state.islike,
    
    }).then((docRef) => {
    this.setState({
    key: this.getKey,
    Note: this.props.route.params.text,
    islike:this.props.route.params.islike,
    
    
    isLoading: false,
    });
    alert("Updated Data");
    })
    .catch((error) => {
    console.error("Error: ", error);
    this.setState({
    isLoading: false,
    });
    });
    }










import React, { Component } from 'react';
import {
Text,
View,
Image,
FlatList,
SafeAreaView,
TextInput, TouchableOpacity
} from 'react-native';
import firebase from 'react-native-firebase'
import { NavigationContainer } from '@react-navigation/native';

export default class detail extends Component {
constructor(props){
super(props);
this.ref = firebase.firestore().collection(firebase.auth().currentUser.uid)
this.unsubscribe = null;
this.state={
key: "", array: [],name: '', loading: true, getValue: ''

}
}
componentDidMount() {
this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
// alert(firebase.auth().currentUser.uid);
}

componentWillUnmount() {
this.unsubscribe();

}
getKey = ""

onCollectionUpdate = (querySnapshot) => {
// console.log(",hjjbb")
const array = [];
querySnapshot.forEach((doc) => {
const { Note } = doc.data();
array.push({
key: doc.id, // Document ID
doc,
Note, // DocumentSnapshot

});
this.getKey = doc.id
console.log(doc.data());
});

this.setState({
array,
loading: false,
key: this.getKey

});

}
addRandom = () => {
alert("vvvvvvvvvv")
this.ref.add({

Note: "scbsbcjsbcj"

});
alert("bbcmdvm")
}
deleteUser = () => {
alert(firebase.auth().currentUser.uid)

const dbRef = firebase.firestore().collection(firebase.auth().currentUser.uid).doc(this.getKey)
dbRef.delete().then((res) => {
alert('Item removed from database')
// this.props.navigation.navigate('UserScreen');
})
// .then(() => this.props.navigation.navigate("AddNotes"))
}

signOutUser = async () => {
try {
await firebase.auth().signOut();
} catch (e) {
alert(e);
}
}

render(){
return (

<View style={{flex:1, backgroundColor:"white"}}>
<View style={{flex:3, backgroundColor:"lightgrey",margin:20}}>
<Text style={{margin:10, fontSize:20, fontStyle:'italic'}}>{this.props.route.params.username}</Text>
{/* <TouchableOpacity style={{
height:40,width:"50%",backgroundColor:'orange',borderRadius:20,marginLeft:80,marginTop:70}}

onPress={() =>[this.signOutUser(),this.props.navigation.navigate("LoginForm")]} >
<Text style={{fontSize:20,color:"grey",textAlign:'center'}}>LogOut</Text>
</TouchableOpacity> */}

<View style={{flex:1,flexDirection:'row'}}>
<TouchableOpacity onPress={() => {
this.addRandom();

}} >
<Image
source={require('./add.jpeg')}
style={{ width: 50, height: 50, justifyContent: "center", marginRight: 22, marginTop:440,borderRadius:25,
marginLeft:20 }}
/></TouchableOpacity>
<TouchableOpacity onPress={() => {
this.deleteUser();

}} >
<Image
source={require('./dd.png')}
style={{ width: 50, height: 50, justifyContent: "center", marginRight: 22, marginTop:440,borderRadius:25}}
/></TouchableOpacity>
<TouchableOpacity onPress={() =>{}}

>
<Image
source={require('./up.png')}
style={{ width: 50, height: 50, justifyContent: "center", marginRight: 22, marginTop:440,borderRadius:25}}
/></TouchableOpacity>
<TouchableOpacity
onPress={() =>[this.signOutUser(),this.props.navigation.navigate("LoginForm")
]
} >
<Image
source={require('./logs.jpeg')}
style={{ width: 50, height: 50, justifyContent: "center", marginRight: 22, marginTop: 440,borderRadius:25}}
/></TouchableOpacity>


</View></View>
</View>
);
}
}