import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Platform, 
  ScrollView, 
  Dimensions, 
  Modal, 
  TouchableOpacity, 
  ImageBackground,
  SafeAreaView
} from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Button, Icon, Container, Header, Content, Left, Right } from 'native-base';
//I've disabled phone orientation for now..
Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);

const window = Dimensions.get('window');

class AmenitiesScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      show: '0'
    }
  }
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Icon style={{
        flex: 1, alignItems: 'center', justifyContent: 'center',
        color: tintColor, fontSize: 24
      }} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Start of header*/}
        <View style={styles.navBar}>
          {/* this is the back arrow */}
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
            {'Amenities'.toUpperCase()}
          </Text>

          <Right></Right>

        </View>
        {/* End of header*/}


        <ScrollView
          contentContainerStyle={styles.scrollContainer}
        >
          {/* Start of the Campground Modal */}
          <Modal 
            animationType="slide"
            visible={this.state.show=='00'}
            onRequestClose={() => console.warn("close request")}>
            <View style={{ flexGrow: 1 }}>
              <ImageBackground
                source={require('./Assets/Amenities/am1.jpg')}
                style={styles.img}
              >
              
              </ImageBackground>
              <View style={styles.imgView}>
                <Text style={styles.imgHeader}>Lakeside Campground</Text>
                <Text style={styles.imgText}>
                  Built around a scenic lake, our park offers a unique experience
                  that you won't find anywhere else.
                  Watching the sunrise over Reunion Lake® will take your breath away.
                </Text>
              </View>
              <Icon name='md-close-circle'
                  onPress={() => {
                    this.setState({
                      show: '0'
                    })
                  }
                  }
                  style={styles.btn}
                  />
                    
            </View>
          </Modal>
          {/* End of the Campground Modal */}

          {/* Start of the Campground Button */}
          <TouchableOpacity onPress={() => {
            this.setState({
              show: '00'
            })
          }
          }>
            <View style={styles.gridItm}>
              <Image
                style={{ height: 80 + '%', width: null }}
                source={require('./Assets/Amenities/am1.jpg')}></Image>
              <View style={{flex: 1, justifyContent: "center"}}>
                <Text style={styles.gridItmText}>Lakeside Campground</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* End of the Campground Button */}

          {/* Start of the Lazy River Modal */}
          <Modal 
            animationType="slide"
            visible={this.state.show=='1'}
            onRequestClose={() => console.warn("close request")}>
            
            <View style={{flexGrow: 1}}>
            <View style={styles.imgBanner}>
              <View style={{flex: 1, justifyContent: "center"}}>
                <Text style={styles.imgBannerText}>Open April - October</Text>
              </View>
            </View>
            <Image
                source={require('./Assets/Amenities/am2.jpg')}
                style={styles.img}
              >
             
              </Image>
            <View style={styles.imgView}>
            <Text style={styles.imgHeader}>LAZY RIVER</Text>
              <Text style={styles.imgText}>
              {'Our lazy river provides the \n ultimate relaxation during \n the summer months.'}
            </Text>
            </View>
            <Icon name='md-close-circle'
                  onPress={() => {
                    this.setState({
                      show: '0'
                    })
                  }
                  }
                  style={styles.btn}
                 />
                  
          </View>
          </Modal>
          {/* End of the Lazy River Modal */}

          {/* Start of the Lazy River Button */}
          <TouchableOpacity onPress={() => {
            this.setState({
              show: '1'
            })
          }
          }>
            <View style={styles.gridItm}>
              <Image
                style={{ height: 80 + '%', width: null }}
                source={require('./Assets/Amenities/am2.jpg')}></Image>
              <View style={{flex: 1, justifyContent: "center"}}>
                <Text style={styles.gridItmText}>Lazy River</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* End of the Lazy River Button */}

          {/* Start of the Family Pool Modal */}
          <Modal 
            animationType="slide"
            visible={this.state.show=='2'}
            onRequestClose={() => console.warn("close request")}>  
            <View style={{flexGrow: 1}}>
            <View style={styles.imgBanner}>
                <View style={{flex: 1, justifyContent: "center"}}>
                  <Text style={styles.imgBannerText}>Open Year-Round, Not Heated</Text>
                </View>
              </View>
            <Image
                source={require('./Assets/Amenities/am3.jpg')}
                style={styles.img}
              >
              </Image>
              
              
              <View style={styles.imgView}>
              <Text style={styles.imgHeader}>FAMILY POOL</Text>
              <Text style={styles.imgText}>
                {'Our family pool includes plenty of water activities for the kids.'}
                {'\n Relax by the pool and order a drink \n as everyone enjoys hours of \n fun in the sun!'}
              </Text>
            </View>
              
              </View>
              <Icon name='md-close-circle'
                  onPress={() => {
                    this.setState({
                      show: '0'
                    })
                  }
                  }
                  style={styles.btn}
                  />
          </Modal>
          {/* End of the Family Pool Modal */}

          {/* Start of the Family Pool Button */}
          <TouchableOpacity onPress={() => {
            this.setState({
              show: '2'
            })
          }
          }>
            <View style={styles.gridItm}>
              <Image
                style={{ height: 80 + '%', width: null }}
                source={require('./Assets/Amenities/am3.jpg')}></Image>
              <View style={{flex: 1, justifyContent: "center"}}>
                <Text style={styles.gridItmText}>Family Pool</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* End of the Family Pool Button */}
          
          {/* Start of the Tiki Bar Modal */}
          <Modal 
            animationType="slide"
            visible={this.state.show=='3'}
            onRequestClose={() => console.warn("close request")}>  
            <View style={{flexGrow: 1}}>
            <ImageBackground
                source={require('./Assets/Amenities/am4.jpg')}
                style={styles.img}
              >
              
              </ImageBackground>
              <View style={styles.imgView}>
              <Text style={styles.imgHeader}>LAZY RIVER TIKI BAR</Text>
              <Text style={styles.imgText}>
                    The tiki bar section of the lazy river 
                    {'\n provides the perfect spot for \n adults to relax and enjoy a drink'}
                    {'\n while soaking up the sun.'}
              </Text>
            </View>
            <Icon name='md-close-circle'
                  onPress={() => {
                    this.setState({
                      show: '0'
                    })
                  }
                  }
                  style={styles.btn}
                  />
              </View>
            </Modal>
            {/* End of the Tiki Bar Modal */}

            {/* Start of the Tiki Bar Button */}
          <TouchableOpacity onPress={() => {
            this.setState({
              show: '3'
            })
          }
          }>
            <View style={styles.gridItm}>
              <Image
                style={{ height: 80 + '%', width: null }}
                source={require('./Assets/Amenities/am4.jpg')}></Image>
              <View style={{flex: 1, justifyContent: "center"}}>
                <Text style={styles.gridItmText}>Tiki Bar</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* End of the Tiki Bar Button */}
          
          {/* Start of the Swim up Bar Modal */}
          <Modal 
            animationType="slide"
            visible={this.state.show=='4'}
            onRequestClose={() => console.warn("close request")}>  
            <View style={{flexGrow: 1}}>
            <ImageBackground
                source={require('./Assets/Amenities/am5.jpg')}
                style={styles.img}
              >
              
              </ImageBackground>
              <View style={styles.imgView}>
              <Text style={styles.imgHeader}>{'ADULT POOL \n SWIM-UP BAR'}</Text>
              <Text style={styles.imgText}>
                  Another adults-only section is 
                  our famous swim-up bar in the adult pool. 
                  You'll love the great atmosphere here during 
                  both day and night!
              </Text>
            </View>
            <Icon name='md-close-circle'
                  onPress={() => {
                    this.setState({
                      show: '0'
                    })
                  }
                  }
                  style={styles.btn}
                  />
            </View>
            </Modal>
            {/* End of the Swim up Bar Modal */}

            {/* Start of the Swim up Bar Button */}
          <TouchableOpacity onPress={() => {
            this.setState({
              show: '4'
            })
          }
          }>
            <View style={styles.gridItm}>
              <Image
                style={{ height: 80 + '%', width: null }}
                source={require('./Assets/Amenities/am5.jpg')}></Image>
              <View style={{flex: 1, justifyContent: "center"}}>
                <Text style={styles.gridItmText}>Swim Up Bar</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* End of the Swim up Bar Button */}
          
          {/* Start of the Poolside Cabana Modal */}
          <Modal 
            animationType="slide"
            visible={this.state.show=='5'}
            onRequestClose={() => console.warn("close request")}>  
            <View style={{flexGrow: 1}}>
            <View style={styles.imgBanner}>
                <View style={{flex: 1, justifyContent: "center"}}>
                  <Text style={styles.imgBannerText}>Open April-October</Text>
                </View>
              </View>
            <ImageBackground
                source={require('./Assets/Amenities/am6.jpg')}
                style={styles.img}
              >
              
              </ImageBackground>
              <View style={styles.imgView}>
              <Text style={styles.imgHeader}>POOLSIDE CABANAS</Text>
              <Text style={styles.imgText}>
              {'Our poolside cabanas offer shade,'}
              {'\n ceiling fans, comfortable chairs,'}
              {'\n high-def TV, and personal \n guest service.'}
              {'You can call us to get \n one reserved for your stay.'}
              </Text>
            </View>
            <Icon name='md-close-circle'
                  onPress={() => {
                    this.setState({
                      show: '0'
                    })
                  }
                  }
                  style={styles.btn}
                  />
              </View>
              </Modal>
              {/* End of Poolside Cabana Modal */}

              {/* Start of the Poolside Cabana Button */}
          <TouchableOpacity onPress={() => {
            this.setState({
              show: '5'
            })
          }
          }>
            <View style={styles.gridItm}>
              <Image
                style={{ height: 80 + '%', width: null }}
                source={require('./Assets/Amenities/am6.jpg')}></Image>
              <View style={{flex: 1, justifyContent: "center"}}>
                <Text style={styles.gridItmText}>Poolside Cabanas</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* End of the Poolside Cabana Button */}

          {/* Start of the Hot tub Modal */}
          <Modal 
            animationType="slide"
            visible={this.state.show=='6'}
            onRequestClose={() => console.warn("close request")}>  
            <View style={{flexGrow: 1}}>
            <ImageBackground
                source={require('./Assets/Amenities/am7.jpg')}
                style={styles.img}
              >
              
              </ImageBackground>
              <View style={styles.imgView}>
              <Text style={styles.imgHeader}>GIANT HOT TUB</Text>
              <Text style={styles.imgText}>
                Heated in winter and chilled in 
                {'\n summer, our outdoor hot tub right'}
                {'\n along the lake is the perfect spot to'}
                {'\n grab a drink and enjoy our top-notch'}
                {'\n resort experience.'}
              </Text>
            </View>
            <Icon name='md-close-circle'
                  onPress={() => {
                    this.setState({
                      show: '0'
                    })
                  }
                  }
                  style={styles.btn}
                  />
              </View>
              </Modal>
              {/* End of the Hot Tub Modal */}

              {/* Start of the Hot Tub Button */}
          <TouchableOpacity onPress={() => {
            this.setState({
              show: '6'
            })
          }
          }>
            <View style={styles.gridItm}>
              <Image
                style={{ height: 80 + '%', width: null }}
                source={require('./Assets/Amenities/am7.jpg')}></Image>
              <View style={{flex: 1, justifyContent: "center"}}>
                <Text style={styles.gridItmText}>Giant Hot Tub</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* End of the Hot Tub Button */}
          
          {/* Start of the Mini Golf Modal */}
          <Modal 
            animationType="slide"
            visible={this.state.show=='7'}
            onRequestClose={() => console.warn("close request")}>  
            <View style={{flexGrow: 1}}>
            <View style={styles.imgBanner}>
                <View style={{flex: 1, justifyContent: "center"}}>
                  <Text style={styles.imgBannerText}>$5 per person per round</Text>
                </View>
              </View>
            <ImageBackground
                source={require('./Assets/Amenities/am10.jpg')}
                style={styles.img}
              >
              </ImageBackground>
              <View style={styles.imgView}>
              <Text style={styles.imgHeader}>MINI-GOLF COURSE</Text>
              <Text style={styles.imgText}>
                Who can get the lowest score? 
                {'\n Bring the family and challenge our'}
                {'\n brand new 18-hole mini-golf course'} 
                {'\n - let\'s go for a hole-in-one!'}
              </Text>
              </View>
              <Icon name='md-close-circle'
                  onPress={() => {
                    this.setState({
                      show: '0'
                    })
                  }
                  }
                  style={styles.btn}
                  />
              </View>
              </Modal>
              {/* End of the Mini Golf Modal */}

              {/* Start of the Mini Golf Button */}
          <TouchableOpacity onPress={() => {
            this.setState({
              show: '7'
            })
          }
          }>
            <View style={styles.gridItm}>
              <Image
                style={{ height: 80 + '%', width: null }}
                source={require('./Assets/Amenities/am10.jpg')}></Image>
              <View style={{flex: 1, justifyContent: "center"}}>
                <Text style={styles.gridItmText}>Mini Golf</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* End of the Mini Golf Button */}
          
          {/* Start of the Playground Modal */}
          <Modal 
            animationType="slide"
            visible={this.state.show=='8'}
            onRequestClose={() => console.warn("close request")}>  
            <View style={{flexGrow: 1}}>
            <ImageBackground
                source={require('./Assets/Amenities/am13.jpg')}
                style={styles.img}
              >
              </ImageBackground>
              <View style={styles.imgView}>
                <Text style={styles.imgHeader}>CHILDREN'S PLAYGROUND</Text>
                <Text style={styles.imgText}>
                Keep the kids entertained with 
                {'\n our fun play area. Reunion Lake®'}
                {'\n has a wide variety of activities for'}
                {'\n kids of all ages; there\'s never a'}
                {'\n dull moment around here!'}
                </Text>
              </View>
              <Icon name='md-close-circle'
                  onPress={() => {
                    this.setState({
                      show: '0'
                    })
                  }
                  }
                  style={styles.btn}
                  />
              </View>
              </Modal>
              {/* End of the Playground Modal */}

              {/* Start of the Playground Button */}
          <TouchableOpacity onPress={() => {
            this.setState({
              show: '8'
            })
          }
          }>
            <View style={styles.gridItm}>
              <Image
                style={{ height: 80 + '%', width: null }}
                source={require('./Assets/Amenities/am13.jpg')}></Image>
              <View style={{flex: 1, justifyContent: "center"}}>
                <Text style={styles.gridItmText}>Playground</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* End of the Playground Button */}

          {/* Start of the Amphitheater Modal */}
          <Modal 
            animationType="slide"
            visible={this.state.show=='9'}
            onRequestClose={() => console.warn("close request")}>  
            <View style={{flexGrow: 1}}>
            <View style={styles.imgBanner}>
                <View style={{flex: 1, justifyContent: "center"}}>
                  <Text style={styles.imgBannerText}>Closed during winter</Text>
                </View>
              </View>
            <ImageBackground
                source={require('./Assets/Amenities/am14.jpg')}
                style={styles.img}
              >
              </ImageBackground>
              <View style={styles.imgView}>
                <Text style={styles.imgHeader}>{'Outdoor Amphitheater'.toUpperCase()}</Text>
                <Text style={styles.imgText}>
                  Enjoy movies on the lake in our 
                  {'\n outdoor theater area! Gather around'}
                  {'\n our giant movie screen for'}
                  {'\n showings of your favorite movies.'} 
                  
                </Text>
                </View>
                <Icon name='md-close-circle'
                  onPress={() => {
                    this.setState({
                      show: '0'
                    })
                  }
                  }
                  style={styles.btn}
                  />
              </View>
              </Modal>
              {/* End of the Playground Modal */}

              {/* Start of the Amphitheater Button */}
          <TouchableOpacity onPress={() => {
            this.setState({
              show: '9'
            })
          }
          }>
            <View style={styles.gridItm}>
              <Image
                style={{ height: 80 + '%', width: null }}
                source={require('./Assets/Amenities/am14.jpg')}></Image>
              <View style={{flex: 1, justifyContent: "center"}}>
                <Text style={styles.gridItmText}>Amphitheater</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* End of the Amphitheater Button */}

          {/* Start of the General Store Modal */}
          <Modal 
            animationType="slide"
            visible={this.state.show=='10'}
            onRequestClose={() => console.warn("close request")}>  
            <View style={{flexGrow: 1}}>
            <View style={styles.imgBanner}>
                <View style={{flex: 1, justifyContent: "center"}}>
                  <Text style={styles.imgBannerText}>Open April - October</Text>
                </View>
              </View>
            <ImageBackground
                source={require('./Assets/Amenities/am15.jpg')}
                style={styles.img}
              >
              </ImageBackground>
              <View style={styles.imgView}>
                <Text style={styles.imgHeader}>{'On-Site General Store'.toUpperCase()}</Text>
                <Text style={styles.imgText}>
                  We have a fully-stocked general store with RV supplies, propane, firewood, ice, toiletries, sunscreen, and many more items to make your stay more enjoyable and convenient.
                  
                </Text>
                </View>
                <Icon name='md-close-circle'
                  onPress={() => {
                    this.setState({
                      show: '0'
                    })
                  }
                  }
                  style={styles.btn}
                  />
              </View>
              </Modal>
              {/* End of the General Store Modal */}

              {/* Start of the General Store Button */}
          <TouchableOpacity onPress={() => {
            this.setState({
              show: '10'
            })
          }
          }>
            <View style={styles.gridItm}>
              <Image
                style={{ height: 80 + '%', width: null }}
                source={require('./Assets/Amenities/am15.jpg')}></Image>
              <View style={{flex: 1, justifyContent: "center"}}>
                <Text style={styles.gridItmText}>General Store</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* End of the General Store Button */}

          {/* Start of the Dog Park Modal */}
          <Modal 
            animationType="slide"
            visible={this.state.show=='11'}
            onRequestClose={() => console.warn("close request")}>  
            <View style={{flexGrow: 1}}>
            <ImageBackground
                source={require('./Assets/Amenities/am16.jpg')}
                style={styles.img}
              >
              </ImageBackground>
              <View style={styles.imgView}>
                <Text style={styles.imgHeader}>{'Fenced-In Dog Park'.toUpperCase()}</Text>
                <Text style={styles.imgText}>
                  You don't have to leave the dogs at 
                  {'\n home! Our dog park and dog bath'}
                  {'\n give your four-legged family members'}
                  {'\n the ability to enjoy Reunion Lake®'}
                  {'\n just as much as you.'}
                </Text>
                </View>
                <Icon name='md-close-circle'
                  onPress={() => {
                    this.setState({
                      show: '0'
                    })
                  }
                  }
                  style={styles.btn}
                  />
                </View>
              </Modal>
              {/* End of the Dog Park Modal */}

              {/* Start of the Dog Park Button */}
          <TouchableOpacity onPress={() => {
            this.setState({
              show: '11'
            })
          }
          }>
            <View style={styles.gridItm}>
              <Image
                style={{ height: 80 + '%', width: null }}
                source={require('./Assets/Amenities/am16.jpg')}></Image>
              <View style={{flex: 1, justifyContent: "center"}}>
                <Text style={styles.gridItmText}>Dog Park</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* End of the Dog Park Button */}

          {/* Start of the Fitness Center Modal */}
          <Modal 
            animationType="slide"
            visible={this.state.show == '12'}
            onRequestClose={() => console.warn("close request")}>  
            <View style={{flexGrow: 1}}>
            <ImageBackground
                source={require('./Assets/Amenities/am18.jpg')}
                style={styles.img}
              >
              
              </ImageBackground>
              <View style={styles.imgView}>
                <Text style={styles.imgHeader}>{'Expanded Fitness Center'.toUpperCase()}</Text>
                <Text style={styles.imgText}>
                Located inside of the Clubhouse cabin, 
                {'\n our expanded fitness center has'}
                {'\n tripled in size and has everything you'}
                {'\n need to keep up your fitness routines'}
                {'\n during your stay.'}
                </Text>
                </View>
                <Icon name='md-close-circle'
                  onPress={() => {
                    this.setState({
                      show: '0'
                    })
                  }
                  }
                  style={styles.btn}
                  />
              </View>
              </Modal>
              {/* End of the Fitness Center Modal */}

              {/* Start of the Fitness Center Button */}
          <TouchableOpacity onPress={() => {
            this.setState({
              show: '12'
            })
          }
          }>
            <View style={styles.gridItm}>
              <Image
                style={{ height: 80 + '%', width: null }}
                source={require('./Assets/Amenities/am18.jpg')}></Image>
              <View style={{flex: 1, justifyContent: "center"}}>
                <Text style={styles.gridItmText}>Fitness Center</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* End of the Fitness Center Button */}

          {/* Start of the Courts Modal */}
          <Modal 
            animationType="slide"
            visible={this.state.show=='13'}
            onRequestClose={() => console.warn("close request")}>  
            <View style={{flexGrow: 1}}>
            <ImageBackground
                source={require('./Assets/Amenities/am20.jpg')}
                style={styles.img}
              >
            </ImageBackground>
              <View style={styles.imgView}>
                <Text style={styles.imgHeader}>{'Basketball & Pickleball Courts'.toUpperCase()}</Text>
                <Text style={styles.imgText}>
                  Located next to the mini-golf course,
                  {'\n our new basketball and pickleball'}
                  {'\n courts will provide hours of action'}
                  {'\n during your stay this fall and winter.'}
                </Text>
              </View>
              <Icon name='md-close-circle'
                  onPress={() => {
                    this.setState({
                      show: '0'
                    })
                  }
                  }
                  style={styles.btn}
                  />
              </View>
              </Modal>
              {/* End of the Courts Modal */}

              {/* Start of the Courts Button */}
          <TouchableOpacity onPress={() => {
            this.setState({
              show: '13'
            })
          }
          }>
            <View style={styles.gridItm}>
              <Image
                style={{ height: 80 + '%', width: null }}
                source={require('./Assets/Amenities/am20.jpg')}></Image>
              <View style={{flex: 1, justifyContent: "center"}}>
                <Text style={styles.gridItmText}>Recreational Courts</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* End of the Courts Button */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  img: {
    width: window.width,
    height: window.height / 2
  },
  imgView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: window.width,
    height: window.height / 3,
    paddingTop: 10,
  },
  imgHeader: {
    color: '#184a6d',
    paddingHorizontal: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: Platform.OS === 'android'
      ? 'serif'
      : 'Baskerville',
    fontSize: .07 * window.width
  },
  imgText: {
    fontSize: .05 * window.width,
    textAlign: "center",
    paddingTop: 10,
    paddingHorizontal: 10,
    fontFamily: Platform.OS === 'android'
      ? 'serif'
      : 'Baskerville',
  },
  imgBanner: {
    justifyContent: "flex-start",
    width: window.width,
    height: 80,
    backgroundColor: '#184a6d',
  },
  imgBannerText: {
    fontSize: Platform.OS === 'android'
    ? 15
    : 18,
    textAlign: "center",
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'android'
      ? 'serif'
      : 'Baskerville',
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
  //this styles our grid items
  gridItm: {
    elevation: 5,
    shadowOffset: { width: 2, height: 3 },
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 2,
    borderRadius: 5,
    width: window.width / 2 - 10,
    height: window.height / 2,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#FFFFFF',
    margin: 5,
    overflow: 'hidden'
  },
  gridItmText: {
    textAlign: 'center',
    color: '#184a6d',
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontFamily: Platform.OS === 'android'
      ? 'serif'
      : 'Baskerville-Bold',

  },
  btn: {
    justifyContent: 'center', 
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    color: '#184a6d',
    fontSize: 40
  }
});

export default AmenitiesScreen;