import React, { Component } from "react";
import { View, Text } from 'react-native';
import firebase from 'react-native-firebase';




export default class Loading extends Component {
  componentDidMount() {
   this.logincheck();
}
logincheck(){
  firebase.auth().onAuthStateChanged(user => {
    this.props.navigation.navigate(user ? 'Add Notes' : 'Login')
  })

}

  render() {
    this.logincheck();
    return (
      <View style={{   flex: 1,
    justifyContent: 'center',
    alignItems: 'center'}}>
        <Text style={{color:'#e93766', fontSize: 40}}>Notes App</Text>
       
      </View>
    )
  }
}

