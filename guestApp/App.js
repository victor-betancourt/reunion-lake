import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, Dimensions, Platform, TouchableHighlight, Linking } from 'react-native';
import { DrawerItems, createDrawerNavigator } from 'react-navigation';
import { Container, Content, Header, Body, Footer, Icon} from 'native-base'

import HomeScreen from './Components/Screens/HomeScreen.js'
import GalleryScreen from './Components/Screens/GalleryScreen.js'
import AmenitiesScreen from './Components/Screens/AmenitiesScreen.js'
import GeneralInfoScreen from './Components/Screens/GeneralInfoScreen.js'
import EventsScreen from './Components/Screens/EventsScreen.js'
import ActivitiesScreen from './Components/Screens/ActivitiesScreen.js'
import Notifications from './Components/Screens/typeNotification'


export default class App extends React.Component {
  render() {
    return ( 
      <MyApp/>
    );
  }
}
pressCall=()=>{
  const url='tel://+19855206600'
  Linking.openURL(url)
}
pressMail=()=>{
  const url='mailto:info@reunionlakerv.com'
  Linking.openURL(url)
}
pressMap=()=>{
  const url = Platform.select({
    ios: 'http://maps.apple.com/?ll=30.4848417,-90.3344392',
    android: 'geo:30.4848417,-90.3344392'
  })
  Linking.openURL(url)
}

//view style changes the settings of the upper part of drawer menu
const CustomDrawerContentComponent = (props) => (
  
  <Container>
        <Header style={{height: 175, backgroundColor: '#184a6d', borderBottomColor: 'transparent'}}>
          <Body>
          <TouchableHighlight onPress ={()=> props.navigation.navigate('Notifications')}>
          <Image 
          style={styles.drawerImage}
          source = {require('./Assets/logo-white.png')}/></TouchableHighlight>
            </Body>
        </Header>
        <Content style={styles.drawerStyle}>
          <DrawerItems{...props}/>
        </Content>
        <Footer style={{backgroundColor: '#184a6d', borderColor: 'transparent', justifyContent: 'space-around'}}>
        <Icon name='ios-call' 
        onPress={() => this.pressCall()}
              style={{marginLeft: 3 + '%', marginTop: 3 + '%', color: 'white'}}
        />
         <Icon name='md-mail' 
         onPress={() => this.pressMail()}
              style={{marginLeft: 3 + '%', marginTop: 3 + '%', color: 'white'}}
        />
         <Icon name='md-map' 
          onPress={() => this.pressMap()}
              style={{marginLeft: 3 + '%', marginTop: 3 + '%', color: 'white'}}
        />

        </Footer>
  </Container>
)

const MyApp = createDrawerNavigator (
  {
    Home: {
      screen: HomeScreen
    },
    Gallery: {
      screen: GalleryScreen
    },
    Amenities: {
      screen: AmenitiesScreen
    },
    GeneralInfo: {
      screen: GeneralInfoScreen,
      navigationOptions: {
        drawerLabel: 'General Info'
      }
    },
    Events: {
      screen: EventsScreen
    },
    Social: {
    screen: ActivitiesScreen
    },
    Notifications: {
      screen: Notifications,
      navigationOptions: {
        drawerLabel: ()=> null
      }
    }
  }, {
    //This styles our menu items
    initialRouteName: 'Home',
    contentOptions: {
      inactiveTintColor: 'white',
      activeTintColor: '#051119',
      labelStyle: {
        fontFamily: Platform.OS === 'android'
        ? 'serif'
        : 'Baskerville-Bold',
        fontSize: .04 * Dimensions.get('window').width
      },
  },
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose'
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerImage: {
    height: 45,
    width: 250,
  },
  drawerStyle: {
    backgroundColor: '#184a6d',
    marginTop: 0,
  }
});
