import React from 'react';
import { StyleSheet, Text, View, Image, Platform, ListView, FlatList, SectionList } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Button, Icon, Container, Header, Content, Left, Right, ListItem, List, Separator } from 'native-base';
import Moment from 'moment';
import _ from 'lodash'
//I've disabled phone orientation for now..
Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);

import firebase from './Firebase'

//getting references to points in the database
const rootRef = firebase.database().ref();
const contactRef = rootRef.child('contacts').orderByChild('date')


class SectionListItem extends React.Component {
    render() {

        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: '#9ca8bc',
            }}>
                <Text style={styles.eventTxt}>
                {this.props.item.event}
                </Text>
                <View style={{backgroundColor: '#4d788c', height: 1, margin: 4, marginLeft: 20, marginRight: 10}}>
                </View>
            </View>
        );
    }
}
class SectionHeader extends React.Component {

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#2b6187',
            }}>
                <Text style={styles.eventHeader}>
                {Moment(new Date(this.props.section.date)).format('MMMM Do')}
                </Text>
            </View>
        );
    }
}

class EventsScreen extends React.Component {

    constructor(props){
      super(props);

      this.state = {
        //instantiating variables to store data from database
        event: [],
        date: '',
        contacts: []
      }
    }

    componentDidMount() {
      contactRef.on('value', (childSnapshot) => {
        let contacts = []
        const eventRef = rootRef.child('contacts/{id}/test')
      
        //iterates through the database for each variable
        childSnapshot.forEach((doc) => {
          var x
          for (x in doc.toJSON().events) {
          contacts.push({
            key: doc.key,
            event: doc.toJSON().events[x],
            date: doc.toJSON().date,
          })
        }
        })
        console.log('original ' + JSON.stringify(contacts))
      
        contacts = _.groupBy(contacts, d => d.date)
      
        contacts = _.reduce(contacts, (acc, next, index) => {
          acc.push({
            date: index,
            data: next
          })
          return acc
        }, [])


        this.setState({contacts: Object.values(contacts)})
        console.log(JSON.stringify(Object.values(contacts)))
      })
    }


    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
            <Icon style={{ flex:1, alignItems: 'center', justifyContent:'center'}}/>
        )
    }

    render() {
      Moment.locale('en')
      return (
        <View style = {styles.container}>
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
                {'Events'.toUpperCase()} 
             </Text>
  
             <Right></Right>
  
            </View>

          <SectionList
                    renderItem={({ item, index }) => {
                        return (<SectionListItem item={item} >

                        </SectionListItem>);
                    }}
                    renderSectionHeader={({ section, index }) => {
                        return (<SectionHeader section={section} />);
                    }}
                    sections={this.state.contacts}
                    keyExtractor={(item, index) => index}
                />
          
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    eventTxt: {
      fontSize: 17,
      alignSelf: 'center',
      color: '#ffffff',
      paddingVertical: 16,
      fontFamily: Platform.OS === 'android'
        ? 'serif'
        : 'Baskerville-Bold',
    },
    eventHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      margin: 20,
      fontFamily: Platform.OS === 'android'
        ? 'serif'
        : 'Baskerville-Bold',
    }
  });

export default EventsScreen;