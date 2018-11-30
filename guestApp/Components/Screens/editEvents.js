import React from 'react';
import { StyleSheet, Text, View, Image, Platform, StatusBar, ListView } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Button, Icon, Container, Input, Header, Content, Item, Left, Right, List, ListItem } from 'native-base';

import * as firebase from "firebase"
     //Initialize Firebase
    var config = {
      apiKey: "AIzaSyDyCO2E1Okmz8MYXi4hgJWFbzDV3NgfzAg",
      authDomain: "test-6ee2f.firebaseapp.com",
      databaseURL: "https://test-6ee2f.firebaseio.com",
      projectId: "test-6ee2f",
      storageBucket: "test-6ee2f.appspot.com",
      messagingSenderId: "1089375706705"
    };
    if (!firebase.apps.length){  
    firebase.initializeApp(config);
    }
    var data = []

class editEvents extends React.Component {
    constructor(props){
      super(props);

      this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            listViewData: data,
            newEvent: ""
        }
    }

    componentDidMount(){
      var that = this
        firebase.database().ref('/events').on('child_added', function(data){
          var newData = [...that.state.listViewData]
          newData.push(data)
          that.setState({listViewData : newData})
        })
      }

    addRow(data){
      var key = firebase.database().ref("/events").push().key
      firebase.database().ref('/events').child(key).set({date :data})

    }

    async deleteRow(secID, rowID, rowMap, data){
      await firebase.database().ref('events/'+data.key).set(null)

      rowMap[`${secID}${rowID}`].props.closeRow();
      var newData = [...this.state.listViewData];
      newData.splice(rowID,1)
      this.setState({listViewData: newData});

    }


    showInformation(){

    }



    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
            <Icon style={{ flex:1, alignItems: 'center', justifyContent:'center'}}/>
        )
    }

    
  render() {
      return(
        <Container>
          <Header style = {{ marginTop:StatusBar.currentHeight }}>
            <Content>
                <Item>
                  <Input
                    onChangeText = {(newEvent) => this.setState({newEvent})}
                    placeholder = "Events"
                    />
                    <Button onPress= {() => this.addRow(this.state.newEvent)}>
                      <Icon name = "add" />
                      </Button>
                  </Item>
              </Content>
            </Header>
              
              <Content>
                <List
                enableEmptySections
                dataSource = {this.ds.cloneWithRows(this.state.listViewData)}
                renderRow = {data =>
                  <ListItem>
                    <Text>{data.val().date}</Text>
                  </ListItem>

                }
                  renderLeftHiddenRow = {data =>
                    <Button full onPress = {()=> this.addRow(data)}>
                      <Icon name = "information-circle" />
                    </Button>
                    }
                  renderRightHiddenRow = {(data, secID, rowID, rowMap) =>
                    <Button full danger onPress = {() => this.deleteRow(secID, rowID, rowMap, data)}>
                      <Icon name = "trash" />
                    </Button>
                    }
                    leftOpenValue={75}
                    rightOpenValue={-75}
                    />
                  

              </Content>

        </Container>
        
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center', 
      
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
        ? 'normal'
        : 'Baskerville-Bold',
    },
  });

export default editEvents;