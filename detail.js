import React, { Component } from 'react';
import {
  TouchableOpacity, Text,
  View, Modal,
  Keyboard, Image, Button, ActivityIndicator

} from 'react-native';
import firebase from 'react-native-firebase'
import ImagePicker from 'react-native-image-crop-picker';

import Camera from 'react-native-camera';
import { TextInput } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import uuid from 'uuid/v4';

async function update(note, url, id) {
  if (note != "") {
    await firebase.firestore().collection(firebase.auth().currentUser.uid).doc(id).update({
      note: note,
      imageUrl: url,
      date: new Date().getTime(),
    })
  }
  else
    await firebase.firestore().collection(firebase.auth().currentUser.uid).doc(id).delete();

}
async function updateurl(imageUrl, id) {

  await firebase.firestore().collection(firebase.auth().currentUser.uid).doc(id).update({
    imageUrl: imageUrl,
    date: new Date().getTime(),
  }).catch((error) => {
    console.log("Api call error");
    alert(error.message);
  });

}


export default class detail extends Component {


  state = {
    text: this.props.route.params.note, isVisible: false, loading: false,
    imageSource: this.props.route.params.imageUrl, filename: "",
    imagefull: false
  }
  id = this.props.route.params.id;

  filename = ""
  ext = ""
  image() {

    if (this.state.imageSource != null) {
      return <View>
       
          <Image source={{ uri: this.state.imageSource }} style={{ height: 200, width: 250 }} />
        <TouchableOpacity style={{ alignSelf: "center", marginTop: 15 }} onPress={() => { this.setState({ imageSource: this.state.imageSource = null }) }}>
          <Image source={require('./delete.png')} style={{ height: 30, width: 30 }} />
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>Delete</Text></TouchableOpacity>
       </View>
       

    }
  }

  uploadImage(imageSource, id) {


    const ext = imageSource.split('.').pop(); // Extract image extension
    const filename = `${uuid()}.${ext}`; // Generate unique name
    this.setState({ filename: this.state.filename = filename })


    firebase
      .storage()
      .ref(`Notes/${filename}`)
      .putFile(imageSource)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          let state = {};
          state = {
            ...state,
            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100, // Calculate progress percentage

          };
          this.setState({ loading: this.state.loading = true })

          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            // console.log(snapshot, "snapSj")
            // alert("Image Uploaded Successfully");
            this.geturl(filename, id);
            this.setState({ loading: this.state.loading = false })
          }


          this.setState(state);
        },
        error => {
          unsubscribe();
          alert('Sorry, Try again.');
        }
      );

  }

  geturl(filename, id) {
    firebase.storage().ref(`Notes/${filename}`).getDownloadURL().then(function (url) {
      updateurl(url, id);
    }).catch((error) => {
      console.log("Api call error");
      alert(error.message);
    });
  }

  render() {

    return (
      <KeyboardAwareScrollView style={{ backgroundColor: "white", flex: 1 }}>
        <View style={{ height: 100, flexDirection: "row", backgroundColor: "lightgrey" }}>
          <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            onPress={() => {
              update(this.state.text, this.state.imageSource, this.id)
              this.props.navigation.navigate("Add Notes")
            }}>
            <Image
              source={require('./save.png')}
              style={{ width: 40, height: 40, }}
            />
            <Text>Save</Text>
          </TouchableOpacity >
          <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            onPress={() => { this.setState({ isVisible: true }) }}>
            <Image
              source={require('./upload.png')}
              style={{ width: 40, height: 40, }}
            />
            <Text>Add Photos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            onPress={() => {
              this.props.navigation.navigate("Add Notes")
            }}>
            <Image
              source={require('./cancel.png')}
              style={{ width: 40, height: 40, }}
            />
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: "white", flex: 10, borderTopColor: "black", borderTopWidth: 1 }}>
          <TextInput multiline={true} style={{ textAlignVertical: "top", margin: 10, fontSize: 20, fontWeight: "bold", backgroundColor: "white" }} defaultValue={this.state.text}
            onChangeText={(text) => {
              this.setState({ text: text })
            }} />
        </View>
        <Modal
          transparent={true}
          animationType={'none'}
          visible={this.state.loading}
          onRequestClose={() => { console.log('close modal') }}>
          <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
            <ActivityIndicator
              animating={this.state.loading}
              color="grey"
              size={100} />

          </View>
        </Modal>
        <Modal visible={this.state.isVisible}
          animationType="slide"
          transparent={true} onRequestClose={() => { this.setState({ isVisible: false }) }}  >
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <View style={{ margin: 5, elevation: 10, }}><Button title="Take  Photo" onPress={() => {
              ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
              }).then(image => {
                this.setState({ imageSource: this.state.imageSource = image.path, isVisible: this.state.isVisible = false });

                this.uploadImage(this.state.imageSource, this.id);
                this.setState({ isVisible: false });


              }).catch((error) => {
                console.log("Api call error");
                alert(error.message);
              });


            }} /></View>
            <View style={{ margin: 5, elevation: 10, }}><Button title="Upload  Photo" onPress={() => {
              ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
              }).then(image => {
                this.setState({ imageSource: this.state.imageSource = image.path, isVisible: this.state.isVisible = false });

                this.uploadImage(this.state.imageSource, this.id);
                // this.geturl(this.state.filename)
                // alert(this.state.filename)
                this.setState({ isVisible: false });
              }).catch((error) => {
                console.log("Api call error");
                alert(error.message);
              });
            }} /></View>


            <View style={{ margin: 5, elevation: 10, }}><Button title="Cancel" onPress={() => { this.setState({ isVisible: false }) }} /></View>



          </View>

        </Modal>

        <View style={{ alignSelf: "center" }}>{this.image()}</View>
      </KeyboardAwareScrollView>
    );
  }
}
