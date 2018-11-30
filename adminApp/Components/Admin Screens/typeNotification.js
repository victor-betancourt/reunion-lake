import React from 'react';
import { StyleSheet, Text, View, Image, Platform, Dimensions, FlatList, InteractionManager, TouchableHighlight, Modal, Alert } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Button, Icon, Container, Header, Content, Left, Right, Input, Item } from 'native-base';
import firebase from '../Screens/Firebase'

const window = Dimensions.get('window');

class typeNotification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [],
            url: '',
            message: ''
        };
    }

    sendNotification(message) {
        var key = firebase.database().ref('/notifyText').push().key
        firebase.database().ref('/notifyText').child(key).set({ name: message })
    }

    static navigationOptions = {
        drawerIcon: () => (
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
                        {'Send Notification'.toUpperCase()}
                    </Text>

                    <Right>
                    </Right>

                </View>

                <Item>
                    <Input 
                        onChangeText = {(message)=> this.setState({message})}
                        placeholder = "Notification Body"
                    />
                    <Button backgroundColor = "#2b6187"
                            onPress = {()=> this.sendNotification(this.state.message)}>
                        <Icon name = "send"/>
                    </Button>
                </Item>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    grid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    gridItm: {

    },
    img: {
        width: window.width / 2,
        height: window.height / 3
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

export default typeNotification;