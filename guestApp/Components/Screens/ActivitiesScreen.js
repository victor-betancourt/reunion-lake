import React from 'react';
import { StyleSheet, Text, View, Image, Platform, ActivityIndicator, FlatList } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Button, Icon, Container, Header, Content, Left, Right } from 'native-base';

import FBData from './FBData';

import {FBKey} from './variables'

//I've disabled phone orientation for now..
Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);

class ActivitiesScreen extends React.Component {

  static navigationOptions = {
    drawerIcon: ({tintColor}) => (
        <Icon style={{ flex:1, alignItems: 'center', justifyContent:'center'}}/>
    )
}

  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      dataSource:[],
    }
  }

  getFeedData() {
    return fetch('https://graph.facebook.com/v3.1/reunionlakervresort/posts?fields=full_picture,message,created_time&access_token='+FBKey)
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        dataSource: responseJson.data,
      }, function(){

      });

    })
    .catch((error) =>{
      console.error(error);
    });
  }

  componentDidMount(){
      this.getFeedData();
    }

    render() {

      if (this.state.isLoading){
        return(
          <Content>

          <View style = {styles.navBar}> 
            {/* this is the hamburger icon */}
            <Left>
             <Icon 
                style = {styles.navBarIcon}
                name = "menu" 
                onPress = {() =>this.props.navigation.openDrawer()}
              />
             {/* this is the text in the middle of the header*/}
             </Left>
  
             <Text 
                style = {styles.navBarHeader}>
                {'Social'.toUpperCase()} 
             </Text>
   
             <Right></Right>
  
            </View>

          <View style ={{flex:1, padding: 20}}> 
            <ActivityIndicator/> 
          </View>

          </Content>
        );
      }

      return (
        <View style = {{ flex: 1}}>
            <View style = {styles.navBar}> 
            {/* this is the hamburger icon */}
            <Left>
             <Icon 
                style = {styles.navBarIcon}
                name = "menu" 
                onPress = {() =>this.props.navigation.openDrawer()}
              />
             {/* this is the text in the middle of the header*/}
             </Left>
  
             <Text 
                style = {styles.navBarHeader}>
                {'Social'.toUpperCase()} 
             </Text>
   
             <Right></Right>
  
            </View>
        
          {/*
            We can have a "card" carousel
            that displays what there is to do 
            at the resort.. Not sure what else we 
            would do with this page. 
          */}
          <FBData data={this.state.dataSource}/>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center', 
      justifyContent:'center'
    },
    //this styles the header
    navBar: {
      flexDirection: 'row',
      backgroundColor: '#184a6d',
      height: 64,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20
    },
  //this styles the hamburger icon
    navBarIcon: {
      color: '#FFFFFF',
      textAlign: 'center',
      width: 50
    },
  //this styles the text inside the header
    navBarHeader: {
     flex: 1,
     textAlign: 'center',
     color: '#FFFFFF',
     fontWeight: 'bold',
     fontSize: 15,
     fontFamily: Platform.OS === 'android'
        ? 'serif'
        : 'Baskerville-Bold',
    },
  });

export default ActivitiesScreen;