import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Platform,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Linking
} from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Button, Icon, Container, Header, Content, Left, Right } from 'native-base';
import { MapView } from 'expo';
//I've disabled phone orientation for now..
Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);

const window = Dimensions.get('window');

class GeneralInfoScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      show: false,
    }
  }
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Icon style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} />
    )
  }
  pressMap=()=>{
    const url = Platform.select({
      ios: 'http://maps.apple.com/?ll=30.4848417,-90.3344392',
      android: 'geo:30.4848417,-90.3344392'
    })
    Linking.openURL(url)
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
            {'About'.toUpperCase()}
          </Text>

          <Right></Right>

        </View>

        {/*
              We need to figure out what exactly what content
              goes on this page and then figure out
              how we're going to approach it
          */}
        <ScrollView
        >
          <View style={{ flex: 1 }}>

            <ImageBackground
              style={{
                width: window.width,
                height: window.height - 64,
              }}
              source={require('./Assets/drone9.jpg')}
            >
              <View style={styles.overlay}>
                <View style={{ paddingHorizontal: 5 + '%', paddingBottom: 5 + '%' }}>
                  <Text style={styles.mainText}>ABOUT {'\nREUNION LAKE'}</Text>
                  <Text style={styles.mainBodyText}>We're setting a new standard. Camping, RV living, enjoying the outdoors, family fun... these are all things we're passionate about, and Reunion Lake® is determined to bring the best of all of these things to you in a way no other resort can.</Text>
                  <Image
                    style={{ width: 10 + '%', height: 7 + '%', alignSelf: "center", marginTop: 20 }}
                    source={require('./Assets/down_arrow.png')}

                  />
                </View>
              </View>
            </ImageBackground>

          </View>
          <View style={{ width: window.width, alignContent: "center", flex: 1, flexGrow: 1 }}>

            <Text style={styles.rvHeader}>{'Not your average\nRV park'.toUpperCase()}</Text>
            <View style={styles.rvView}>
              <Image
                style={{ width: window.width - 10, height: window.height / 3 }}
                source={require('./Assets/rv_resort.jpg')}
              />
            </View>
            <Text style={styles.rvText}>Reunion Lake® is the most conveniently-located RV resort from Texas to Florida. We're positioned on the I-10/I-12 corridor at Exit 47 Robert, Louisiana, which is perfect for locals and interstate travelers alike. Our campground is open 365 days a year, and we also have a perfect Good Sam 10-10-10 rating. You will not find an easier or more friendly place to visit!</Text>
            <Button rounded
              onPress={() => {
                this.setState({
                  show: true
                })
              }
              }
              style={styles.mapBtn}
            >
              <Text style={styles.mapBtnTxt}>Find Us</Text>
            </Button>


            <Modal visible={this.state.show}
              onRequestClose={() => console.warn("close request")}
              style={{ backgroundColor: 'black' }}
            >

              <MapView style={{ width: window.width, height: window.height }}
                initialRegion={{
                  latitude: 30.4848417,
                  longitude: -90.3344392,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005
                }}
              >


                <MapView.Marker
                  coordinate={{
                    latitude: 30.4848417,
                    longitude: -90.3344392
                  }}
                  title={"Reunion Lake RV Resort"}
                  >
                  </MapView.Marker>
                <SafeAreaView>
                  <Icon name='ios-close-circle'
                    onPress={() => {
                      this.setState({
                        show: false
                      })
                    }
                    }
                    style={{ marginLeft: 3 + '%', marginTop: 3 + '%' }}
                  />
                </SafeAreaView>
                
              </MapView>
              <Button rounded
              onPress={() => {
                this.pressMap()
              }
              }
              style={styles.mapDirectionBtn}
            >
              <Text style={styles.mapBtnTxt}>Get Directions</Text>
            </Button>
            </Modal>
          </View>
          <View style={{ flex: 1, flexGrow: 1, backgroundColor: '#184a6d', paddingHorizontal: 3 + '%', alignContent: "center", }}>
            <Text style={styles.accessHeader}>ALL-DAY ACCESS FOR ONE LOW PRICE!</Text>
            <Text style={styles.accessText}> Campers staying with us can now enjoy our brand new water attractions including kayaking, paddle boarding, and the new FLOAT ISLAND!
                    {'\n'}
              {'\n$25 per day'}
              {'\n$35 for 2 days'}
              {'\n$100 for a week'}
              {'\n'}
              {'\nPrices are per-person.'}
              {'\nCampers will be given wristbands to allow access.'}
            </Text>
          </View>
          <View style={{ padding: 5 + '%', width: window.width }}>

            <Text style={styles.rvHeader}>PEACE AND QUIET</Text>
            <Text style={styles.rvText}>
              We only allow RV campers with reservations to use our campground
              - no rowdy outside crowds will be interrupting your peaceful stay
              at our world-class resort.
            </Text>
            <View style={styles.rvView}>
              <Image
                style={{ width: window.width - 10, height: window.height / 2, alignSelf: "center" }}
                source={require('./Assets/peace.jpg')}
              />
            </View>
          </View>
          <ImageBackground
            style={{
              width: window.width,
              height: window.height - 64,
            }}
            source={require('./Assets/wifi.jpg')}
          >
            <View style={styles.overlay}>
              <View style={{ paddingHorizontal: 5 + '%', paddingBottom: 5 + '%' }}>
                <Text style={styles.mainText}>WI-FI AND CABLE TV</Text>
                <Text style={styles.mainBodyText}>
                  Free high-def cable with 32 channels
                  available at every campsite, while high-speed wi-fi
                  internet is available for $7.50 per day or $12 for the weekend.
                  </Text>
              </View>
            </View>
          </ImageBackground>
        </ScrollView>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(24, 74, 109, 0.8)',
    justifyContent: 'flex-end',
  },
  mainText: {
    fontSize: window.height * .07,
    textAlign: "left",
    color: '#FFFFFF',
    fontWeight: "400",
    fontFamily: Platform.OS === 'android'
      ? 'serif'
      : 'Baskerville',
  },
  rvView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 6 + '%'
  },
  mainBodyText: {
    fontSize: window.width * .045,
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'android'
      ? 'serif'
      : 'Baskerville',
    lineHeight: window.height * 0.05,
    paddingTop: 3 + '%'
  },
  rvHeader: {
    padding: 2.5 + '%',
    fontSize: window.height * .05,
    textAlign: "center",
    fontWeight: "700",
    fontFamily: Platform.OS === 'android'
      ? 'serif'
      : 'Baskerville',
    color: '#184a6d'
  },
  rvText: {
    padding: 2.5 + '%',
    fontSize: window.width * .045,
    textAlign: "center",
    fontFamily: Platform.OS === 'android'
      ? 'serif'
      : 'Baskerville',
    paddingTop: window.height / 30,
    lineHeight: window.height * .04,
  },
  accessHeader: {
    paddingTop: 4 + '%',
    fontSize: window.height * .04,
    textAlign: "center",
    fontWeight: "700",
    fontFamily: Platform.OS === 'android'
      ? 'serif'
      : 'Baskerville',
    color: '#FFFFFF'
  },
  accessText: {
    flexWrap: 'wrap',
    fontSize: Platform.OS === 'android'
      ? window.height * .0275
      : .045 * window.width,
    fontFamily: Platform.OS === 'android'
      ? 'serif'
      : 'Baskerville',
    textAlign: "center",
    color: '#FFFFFF',
    paddingTop: 2.5 + '%',
    marginBottom: window.height / 30
  },
  mapBtnTxt: {
    fontSize: Platform.OS === 'android'
      ? window.height * .0275
      : .045 * window.width,
    fontFamily: Platform.OS === 'android'
      ? 'serif'
      : 'Baskerville',
    textAlign: "center",
    color: '#FFFFFF',
  },
  mapBtn: {
    elevation: 5,
    shadowOffset: { width: 2, height: 3 },
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 2,
    padding: 30,
    margin: 10,
    alignSelf: 'center',
    backgroundColor: '#184a6d'
  },
  mapDirectionBtn: {
    elevation: 5,
    shadowOffset: { width: 2, height: 3 },
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 2,
    padding: 30,
    margin: 10,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#184a6d'
  }
});
export default GeneralInfoScreen;