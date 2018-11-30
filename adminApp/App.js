import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, Dimensions, Platform, TouchableHighlight, StatusBar } from 'react-native';
import { DrawerItems, createDrawerNavigator } from 'react-navigation';
import { Container, Content, Header, Body, Icon, Form, Item, Label, Input, Button} from 'native-base'
Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);

import HomeScreen from './Components/Screens/HomeScreen.js'
import GalleryScreen from './Components/Screens/GalleryScreen.js'
import AmenitiesScreen from './Components/Screens/AmenitiesScreen.js'
import GeneralInfoScreen from './Components/Screens/GeneralInfoScreen.js'
import EventsScreen from './Components/Screens/EventsScreen.js'
import ActivitiesScreen from './Components/Screens/ActivitiesScreen.js'

import Notifications from './Components/Admin Screens/typeNotification'
import editEvents from './Components/Admin Screens/editEvents'
import AdminGallery from './Components/Admin Screens/AdminGalleryScreen'

import firebase from './Components/Screens/Firebase'

export default class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      isAdmin: false,
      email: '',
      password: '',
      currentUser: '',
      loggedIn: false,
      guestUser: ''
    }
  }

  setUser(user) {
    this.setState({ currentUser: user})
  }

   loginUser = (email,password) =>{

        try{
            firebase.auth().signInWithEmailAndPassword(email,password).then(
              this.setState({ isAdmin:true, loggedIn:true })
            )} 
        catch(error){
            this.setState({ isAdmin: false, loggedIn: false })
            console.log(error.toString())
        }
   }

  render() {
    if((!this.state.loggedIn) && (!this.state.isAdmin)){
      return (
        <View style={{flex:1, alignContent:'center', marginTop:StatusBar.currentHeight}}>
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
                onPress = {()=> this.setState({ isAdmin: false, loggedIn:true })}
            >
            <Text> Continue as guest </Text>
            </Button>

        </Form>
        </View>
      );
    }
    
    else if((this.state.isAdmin)&&(this.state.loggedIn)){
    return ( 
      <AdminApp/>
    );}
    
    else{
      return(
        <MyApp/>
      )
    }
  }
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

const AdminApp = createDrawerNavigator (
  {
    AdminGallery: {
      screen: AdminGallery,
      navigationOptions: {
        drawerLabel: 'Gallery Upload'
      }
    },
    Events: {
      screen: editEvents,
      navigationOptions: {
        drawerLabel: 'Add Events'
      }
    },
    Notifications: {
      screen: Notifications
    }
  }, {
    //This styles our menu items
    initialRouteName: 'AdminGallery',
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
