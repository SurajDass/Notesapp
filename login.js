import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput, Modal,
  Button, Image, ActivityIndicator, Alert
} from 'react-native';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'react-native-firebase'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default class login extends Component {

  state = { email: '', password: '', errorMessage: null, visible: false }
  handleLogin() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Add Notes'))
      .catch(() => { alert("Wrong Email or Password") })     
    this.setState({ email:this.state.email= "", password: this.state.password="" , visible:this.state.visible=false})
  }
  render() {
    return (
      <KeyboardAwareScrollView style={{ backgroundColor: "white" , flex:1}}>
        <Image source={require('./logo.png')}
          style={{ height: 130, width: 130, alignSelf: "center", borderWidth: 2, margin: 50 }} />
        <View style={{ marginHorizontal: 45, marginTop: 10,}}>

          <FilledTextField keyboardType="email-address" label="Enter Email"
            inputContainerStyle={{ marginBottom: 15, borderColor: "lightgrey", borderWidth: 1, backgroundColor: "white", elevation: 10 }}

            onChangeText={(text) => {
              this.setState({ email: text })
            }} value={this.state.email} />

          <FilledTextField onChangeText={(text) => {
            this.setState({ password: text })
          }}
            inputContainerStyle={{ marginBottom: 35, borderColor: "lightgrey", borderWidth: 1, backgroundColor: "white", elevation: 10 }}
            value={this.state.password}
            secureTextEntry={true} label="Enter Password" />

          <Button title="Login"
            onPress={() => {
              this.setState({ visible: this.state.visible = true })
              setTimeout(()=>{
                if (this.state.email == "" && this.state.password == "") {
                  this.setState({ visible: this.state.visible = false})
                  Alert.alert("Please enter Email id and Password");}
                
                else if (this.state.email == "") { this.setState({ visible: this.state.visible = false});alert("Please Enter your email id"); }
                else if (this.state.password == "") { this.setState({ visible: this.state.visible = false});alert("Please Enter your password.");  }
                else {
                  this.handleLogin();      
                }
              },2000)
              
              
            }
            
          }
          />
          <Modal
            transparent={true}
            animationType={'none'}
            visible={this.state.visible}
            onRequestClose={() => { console.log('close modal') }}>
            <View style={{
              flex: 1,
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'space-around',
              backgroundColor: '#00000040'
            }}>
              <View style={{
                 backgroundColor: '#FFFFFF',
                 height: 100,
                 width: 100,
                 borderRadius: 10,
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'space-around'
   }}>
                <ActivityIndicator
                  animating={this.state.visible} />
              </View>
            </View>
          </Modal>

          <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "center" }}>
            <Text style={{ textAlign: "center", fontSize: 15, color: "grey", textAlignVertical: "center" }}>Don't Have an account?</Text>
            <TouchableOpacity
              onPress={() => {

                this.props.navigation.navigate('Sign Up')
                this.setState({ email: "", password: "" })


              }}

              style={{ alignSelf: "center", justifyContent: "center" }}>
              <Text style={{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: "black" }}
              >   Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>

    );
  }
}
