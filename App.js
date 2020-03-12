import React, { Component } from "react";
import {
  Image, TouchableOpacity, Alert, Text, View, PushNotificationIOS
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'react-native-firebase';
import login from './login';
import homepage from './addnotes';
import detail from './detail';
import signup from './signup.js';
import Loading from './loading.js';
import FetchExample from './fetch.js';
const Stack = createStackNavigator();

export default class MyStack extends Component {
  state = { isvisible: false }
  logout() { Alert.alert(
    'Logout',
    'Are you sure you want to Logout?',
    [
        { text: 'Yes', onPress: () =>firebase
        .auth()
        .signOut()
        .then(() => this.props.navigation.navigate('Login'))
        .catch(error => this.setState({ errorMessage: error.message })) },
        { text: 'No', onPress: () => console.log('User not exit'), style: 'cancel' },
    ],
    {
        cancelable: true
    }
);
return true;
}

 
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Loading" component={Loading} options={{
            title: null, headerStyle: {
              backgroundColor: '#f4511e',
            }
          }} />
          <Stack.Screen name="Login" component={login} options={{ headerLeft: () => (null) , headerStyle:{backgroundColor:"#2da7f0"},}} />
          <Stack.Screen name="Add Notes" component={homepage} options={{
           
            headerLeft: () => (null),
            headerRight: () => (
              <TouchableOpacity onPress={() => {
                
                this.logout();
              }}>
                <Image style={{ height: 30, width: 30, marginRight: 10, alignContent: "center" }} source={require('./logout.png')}

                /></TouchableOpacity>
            ),
          }} />
          <Stack.Screen name="Detailed Notes" component={detail} />
          <Stack.Screen name="Sign Up" component={signup} options={{ headerLeft: () => (null) }} />
          <Stack.Screen name="Fetch" component={FetchExample} />
        </Stack.Navigator>
     
      </NavigationContainer>

    );
  }
}
//options={{
          //title: null,
          //headerStyle: {
            //backgroundColor: '#f4511e',
          //},
          //headerTintColor: '#fff',
          //headerTitleStyle: {
            //fontWeight: 'bold',
          //},
        //}}
// edit login and signup page
// modal add increase width of add button in addnotes
// image not showing when first time adding photo
// take photo not working properly
