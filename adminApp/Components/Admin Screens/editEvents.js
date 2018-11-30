import React from 'react';
import { StyleSheet, Text, View, Image, Platform, ListView, FlatList, StatusBar, Modal } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Button, Icon, Container, Header, Content, Left, Right, ListItem, List, Item, Input, DatePicker } from 'native-base';
//I've disabled phone orientation for now..
Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);
import Moment from 'moment'

import firebase from '../Screens/Firebase'

var data = []

//getting references to points in the database
const rootRef = firebase.database().ref();
const contactRef = rootRef.child('contacts').orderByChild('date')
const dateRef = firebase.database().ref('/contacts').orderByChild('date')

class editEvents extends React.Component {

    constructor(props){
      super(props);

      this.ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2})
      this.state = {
        //instantiating variables to store data from database
        Events: [],
        event: '',
        date: '',
        isAdmin: true, 
        listViewData: data,
        ChosenDate: new Date(),
        eventData: [],
        modalVisible: false,
        location: ''
      }
      this.setDate = this.setDate.bind(this)
    }
    setDate(newDate){this.setState({ChosenDate:newDate})}

    componentDidMount(){
      dateRef.on('value',(childSnapshot)=>{
        let newData = []
        childSnapshot.forEach((doc) => {

          newData.push({
            key: doc.key,
            date: doc.toJSON().date

          })
        })
        this.setState({ listViewData: newData })
      })
    }

    addRow(data){
      var key = firebase.database().ref("/contacts").push().key
      firebase.database().ref('/contacts').child(key).set({date: data})
    }

    async deleteRow(secID, rowID, rowMap, data){
      await firebase.database().ref('contacts/'+data.key).set({date: null})

      rowMap[`${secID}${rowID}`].props.closeRow();
      var newData = [...this.state.listViewData];
      newData.splice(rowID,1)
      this.setState({listViewData: newData});
    }

    addEvent(thisEvent) {
      var key = firebase.database().ref("/contacts/" + this.state.location + "/events").push().key
      firebase.database().ref('/contacts/' + this.state.location + '/events').update({[key]: thisEvent})
      alert( "Successfully added event to " + this.getDateforMessage())
    }

    async deleteEvent(secID, rowID, rowMap, data) {
      await firebase.database().ref('/contacts/' + this.state.location + '/events').update({[data]: null})

      rowMap[`${secID}${rowID}`].props.closeRow();
      var newData = [...this.state.listViewData];
      newData.splice(rowID,1)
      this.setState({listViewData: newData});
    }

    setModalVisible(visible){
      this.setState({modalVisible: visible})
    }

    insideModal(location) {
      var that = this

      this.setLocation(location)

      firebase.database().ref('/contacts/' + location + '/events').on('value',(childSnapshot) => {
        let newData = []

        childSnapshot.forEach((doc) => {

          newData.push({
            events: doc.toJSON(),
            key: doc.key

          })
        })
        this.setState({ eventData: newData })
    })
    }

    setDateforMessage(date){
      this.date = date
    }

    getDateforMessage(){
      return this.date
    }

    onModalClose() {
      this.setState({ eventData:[], location: '' })
    }

    setLocation(location) {
      this.setState({location: location})
    }

    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
            <Icon style={{ flex:1, alignItems: 'center', justifyContent:'center'}}/>
        )
    }

    render() {
        return(
        <View style ={{flex:1}}>

        <Modal
              animationType="fade"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={()=> {
                this.setModalVisible(!this.state.modalVisible)
                this.onModalClose()
              }} >

              <Item>
                <Input 
                  placeholder = {this.getDateforMessage()}
                  onChangeText = {(event)=> {this.setState({ event })}}
                />
                  <Right>
                    <Button backgroundColor = "#2b6187"
                            onPress= {() => this.addEvent(this.state.event)}>
                      <Icon name = "add" />
                    </Button>
                  </Right>
                </Item>

              <List
                enableEmptySections
                dataSource={this.ds.cloneWithRows(this.state.eventData)}
                renderRow={data=>
                <ListItem>
                 <Text> {data.events} </Text>
                </ListItem>
              }

              renderLeftHiddenRow={data=>
              <Button full onPress = {()=> {this.addRow(data.key)}}>
                  <Icon name = "add"/>
              </Button>
              }
          
              renderRightHiddenRow={(data, secId, rowId, rowMap)  =>
              <Button full danger onPress = {()=> this.deleteEvent(secId,rowId,rowMap,data.key)}>
                  <Icon name = "trash"/>
              </Button>
              }
          leftOpenValue={75}
          rightOpenValue={-75}
                  />
          

          </Modal>
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
                {'Add Events'.toUpperCase()} 
             </Text>
  
             <Right></Right>
  
            </View>

        <Item>
          <DatePicker
            defaultDate={new Date()}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select date"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={this.setDate}
            />
            <Text>
              {this.state.ChosenDate.toString().substr(4, 12)}
            </Text>
                  <Right>
                    <Button backgroundColor = "#2b6187"
                            onPress= {() => this.addRow(Moment(new Date(this.state.ChosenDate.toString())).format('YYYY/MM/DD'))}>
                      <Icon name = "add" />
                    </Button>
                  </Right>
        </Item>

              <List
                enableEmptySections
                dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                renderRow={data=>
                <ListItem>
                 <Text> {Moment(new Date(data.date)).format('MMMM Do')} </Text>
                </ListItem>
              }

              renderLeftHiddenRow={data=>
              <Button full onPress = {()=> {this.setModalVisible(true)
                                            this.setDateforMessage(Moment(new Date(data.date)).format('MMMM Do'))
                                            this.insideModal(data.key)}}>
                  <Icon name = "add"/>
              </Button>
              }
          
              renderRightHiddenRow={(data, secId, rowId, rowMap)  =>
              <Button full danger onPress = {()=> this.deleteRow(secId,rowId,rowMap,data)}>
                  <Icon name = "trash"/>
              </Button>
              }
          leftOpenValue={75}
          rightOpenValue={-75}
                  />

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
        ? 'normal'
        : 'Baskerville-Bold',
    },
  });

export default editEvents;