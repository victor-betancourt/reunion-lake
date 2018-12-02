import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableHighlight,
  Platform,
  Dimensions,
  ScrollView
} from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Button, Icon, Container, Header, Content, Left, Right } from 'native-base';
import { Permissions, Notifications } from 'expo'

import firebase from './Firebase'

//I've disabled phone orientation for now..
Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);

const window = Dimensions.get('window');

class HomeScreen extends React.Component {

  componentDidMount() {
        this.registerForPushNotificationsAsync()
  }

  //from expo's documentationss
  //see: https://docs.expo.io/versions/latest/guides/push-notifications
  //on IOS this will ask for permission and send expo token to Firebase
  //on Android this does not prompt for permission but still sends expo token to Firebase
  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
    
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync()
    var id = token.replace(/ExponentPushToken|[[\]]/g, '')
    
    firebase.database().ref('tokens').child(id).update({ token: token })

  }

  updateModal() {
  }

  //these two functions are called by the touchable highlight to click to screens
  goToAmmenities() {
    this.props.navigation.navigate('Amenities');
  }
  goToEvents() {
    this.props.navigation.navigate('Events')
  }
  goToActivities() {
    this.props.navigation.navigate('Social')
  }
  goToGallery() {
    this.props.navigation.navigate('Gallery')
  }
  goToGeneralInfo() {
    this.props.navigation.navigate('GeneralInfo')
  }
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Icon style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} />
    )
  }


  render() {
    return (

      <View style={styles.container}>
        <View style={styles.navBar}>
          {/* this is the hamburger icon */}
          <Left>
            <Icon
              style={styles.navBarIcon}
              name="menu"
              onPress={() => this.props.navigation.openDrawer()}
            />
            {/* this is the text in the middle of the header*/}
          </Left>

          <Text
            style={styles.navBarHeader}>
            {'Home'.toUpperCase()}
          </Text>

          <Right></Right>

        </View>

        {/* 
              this is the full width image at the top. 
              we need to change it to a slideshow
          */}
        <ScrollView>

          <ImageBackground style={styles.imgBackground}
            resizeMode='cover'
            //we need to replace local image with database path
            source={require('./Assets/lazyriver.jpg')} //replace image url with database path
          >
            <View style={styles.overlay}>
              <Text style={styles.textStyle}>
                {`Welcome to \n Reunion Lake\u00AE!`.toUpperCase()}
              </Text>
              <Text style={styles.welcomeText}>
                {'Located right off I-12 in Robert,'}
                {'\n Louisiana, Reunion Lake® is'}
                {'\n the latest and greatest campground'}
                {'\n that combines the outdoor fun of'}
                {'\n a lakeside park with the high-end'}
                {'\n amenities of a luxury resort. Family-'}
                {'\n friendly, quiet, and conveniently-'}
                {'\n located, you won\'t find a better getaway'}
                {'\n anywhere else in the south.'}
              </Text>
            </View>
          </ImageBackground>


          {/* this is the start of the image grid */}



          <TouchableHighlight style={styles.gridItem} onPress={() => this.goToAmmenities()}>

            <ImageBackground
              style={[styles.gridItem, styles.gridItemImg]}
              blurRadius={2}
              source={require('./Assets/pool.jpg')} //replace image url with database path
            >
              <View style={styles.overlayChild}>
                <Text style={styles.gridItemText}>
                  {'Amenities'.toUpperCase()}
                </Text>
              </View>
            </ImageBackground>

          </TouchableHighlight>

          <TouchableHighlight style={styles.gridItem} onPress={() => this.goToEvents()}>
            <ImageBackground
              style={[styles.gridItem, styles.gridItemImg]}
              blurRadius={2}
              source={require('./Assets/lazyriver.jpg')} //replace image url with database path
            >
              <View style={styles.overlayChild}>
                <Text style={styles.gridItemText}>
                  {'Events'.toUpperCase()}
                </Text>
              </View>
            </ImageBackground>
          </TouchableHighlight>

          <TouchableHighlight style={styles.gridItem} onPress={() => this.goToActivities()}>
            <ImageBackground
              style={[styles.gridItem, styles.gridItemImg]}
              blurRadius={2}
              source={require('./Assets/events.jpg')} //replace image url with database path
            >
              <View style={styles.overlayChild}>
                <Text style={styles.gridItemText}>
                  {'Social'.toUpperCase()}
                </Text>
              </View>
            </ImageBackground>
          </TouchableHighlight>
          <TouchableHighlight style={styles.gridItem} onPress={() => this.goToGallery()}>
            <ImageBackground
              style={[styles.gridItem, styles.gridItemImg]}
              blurRadius={2}
              source={require('./Assets/drone9.jpg')} //replace image url with database path
            >
              <View style={styles.overlayChild}>
                <Text style={styles.gridItemText}>
                  {'Gallery'.toUpperCase()}
                </Text>
              </View>
            </ImageBackground>
          </TouchableHighlight>
          <TouchableHighlight style={styles.gridItem} onPress={() => this.goToGeneralInfo()}>
            <ImageBackground
              style={[styles.gridItem, styles.gridItemImg]}
              blurRadius={2}
              source={require('./Assets/drone14.jpg')} //replace image url with database path
            >
              <View style={styles.overlayChild}>
                <Text style={styles.gridItemText}>
                  {'General Info'.toUpperCase()}
                </Text>
              </View>
            </ImageBackground>
          </TouchableHighlight>




          {/* end of the image grid */}

        </ScrollView>
      </View>


    );
  }
}

const styles = StyleSheet.create({
  imgBackground: {
    width: window.width,
    marginTop: 0,
    marginBottom: 0,
    minHeight: window.height / 1.5
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(24, 74, 109, 0.8)',
    justifyContent: 'center',
  },
  overlayChild: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
  },
  textStyle: {
    color: "#FFFFFF",
    paddingTop: '10%',
    textAlign: 'center',
    alignItems: 'center',
    fontFamily: Platform.OS === 'android'
      ? 'serif'
      : 'Baskerville-Bold',
    fontSize: Platform.OS === 'android'
      ? 30
      : 35,

  },
  container: {
    flex: 1,
    width: window.width,
    height: window.height,
  },
  grid: {
    flex: 1,
  },
  gridItem: {
    minHeight: window.height / 3,
    justifyContent: "center",
    marginTop: 3
  },
  gridItemImg: {
    width: window.width,
  },
  gridItemText: {
    color: '#FFFFFF',
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: Platform.OS === 'android'
      ? 30
      : 32,
    paddingVertical: 10,
    fontFamily: Platform.OS === 'android'
      ? 'serif'
      : 'Baskerville-Bold',
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
  welcomeText: {
    color: '#FFF',
    paddingHorizontal: 20,
    paddingTop: '05%',
    paddingBottom: '05%',
    lineHeight: .0375 * window.height,
    textAlign: 'center',
    fontFamily: Platform.OS === 'android'
      ? 'serif'
      : 'Baskerville',
    fontSize: .045 * window.width
  }
});

export default HomeScreen;