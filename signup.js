import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput, Button,Image
} from 'react-native';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
  } from 'react-native-material-textfield';
import firebase,{ firestore} from 'react-native-firebase'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default class signup extends Component {
  
        state = { email: '', password: '',
         fname:' ', country:'', errorMessage: null }
        handleSignUp(){
          firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('Login'))
            .catch(error => this.setState({ errorMessage: error.message }))
        }
    render() {
        return (

            
                 <KeyboardAwareScrollView  style={{ backgroundColor: "white", flex: 1 }}> 
                    
                    <Image source={require('./logo.png')}
          style={{ height: 130, width: 130, alignSelf: "center", borderWidth: 2, margin: 25 }} />
                   

                 

                    <View style={{ alignSelf: "center" }}>

                        <OutlinedTextField label="Email Id" keyboardType="email-address"
                        inputContainerStyle={{ marginVertical: 15}}
                        containerStyle={{elevation:20}}
                        onChangeText={(text) => {  this.setState({email:text})
                    }} value={this.state.email}
                            />
                        <OutlinedTextField label="Confirm Password" secureTextEntry={true}
                     
                        onChangeText={(text) => {  this.setState({password:text})
                    }} value={this.state.password}
                         />
                             <OutlinedTextField label="Password" secureTextEntry={true}
                             inputContainerStyle={{ marginVertical: 15}}
                        onChangeText={(text) => {  this.setState({password:text})
                    }} value={this.state.password}
                             />
                    
               
                    <Button title="Create Account"
                        onPress={() => { 
                            if(this.state.email==""&&this.state.password=="")
                            {
                              alert("Please enter Email id and Password");
                            }
                            else if(this.state.email==""){alert("Please Enter your email id");}
                            else if(this.state.password=="")
                            {alert("Please Enter your password.");}
                            else
                         { this.handleSignUp();
                          this.setState=({email:"",password:""})
                         }}} />
                             <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "center" }}>
            <Text style={{ textAlign: "center", fontSize: 15, color: "grey", textAlignVertical: "center" }}>Already Have an account?</Text>
        <TouchableOpacity 
         onPress={() => {
          
               this.props.navigation.navigate('Login')
               this.setState=({email:"",password:""})
            
         
        }}
        
        style={{ alignSelf: "center", justifyContent: "center" }}>
        <Text style={{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: "black" }}
        >  Login</Text>
        </TouchableOpacity>
        </View> 
        </View>
                </ KeyboardAwareScrollView>  
            

        );
    }
}
