
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';

import * as firebase from 'firebase';

//initialize firebase
const firebaseConfig = {
    apiKey: "AIzaSyDyCO2E1Okmz8MYXi4hgJWFbzDV3NgfzAg",
    authDomain: "test-6ee2f.firebaseapp.com",
    databaseURL: "https://test-6ee2f.firebaseio.com",
    projectId: "test-6ee2f",
    storageBucket: "test-6ee2f.appspot.com",
};

firebase.initializeApp(firebaseConfig);

import {Container, Content, Header, Form, Input, Button, Label, Item } from 'native-base'

class LoginScreen extends React.Component {

  constructor(props){
    super(props)

    this.state = ({
        email: '',
        password: ''
    })
   }

   signUpUser = (email, password) =>{

    try{

        if(this.state.password.length<6){
            alert("Please enter atleast 6 characters")
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email,password)
    }
        
    catch(error){
        console.log(error.toString())
    }
   }

   loginUser = (email,password) =>{

        try{

            firebase.auth().signInWithEmailAndPassword(email, password).then(function (user){
                console.log(user)
            })
        } 
        catch(error){
            console.log(error.toString())
        }
   }


  render() {
    return (
      <Container style={styles.container}>
        <Form>
            <Item floatingLabel>
            <Label>Email</Label>
            <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(email) => this.setState({email})}
                />
            </Item>

            <Item floatingLabel>
            <Label>Password</Label>
            <Input
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(password) => this.setState({password})}
                />
            </Item>

            <Button style={{ marginTop: 10 }}
                full
                rounded
                success
                onPress={() => this.loginUser(this.state.email, this.state.password)}
            >
            <Text> Login</Text>
            </Button>

            <Button style={{ marginTop: 10 }}
                full
                rounded
                primary
                onPress={() => this.signUpUser(this.state.email, this.state.password)}
            >
            <Text> Sign Up </Text>
            </Button>

        </Form>
        </Container>
        
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      padding: 10
    },
  });

  export default LoginScreen;