import React from 'react';
import { StyleSheet, Text, View, Image, Platform, Dimensions, FlatList, InteractionManager, TouchableHighlight, Modal, Alert } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Button, Icon, Container, Header, Content, Left, Right } from 'native-base';
import firebase from '../Screens/Firebase'
import { ImagePicker, Permissions } from 'expo'

const admin = false

const rootRef = firebase.database().ref();
const imagesRef = rootRef.child('images')

//I've disabled phone orientation for now..
Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);
const window = Dimensions.get('window');

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
    // Work around issue `Setting a timer for long time`
    // see: https://github.com/firebase/firebase-js-sdk/issues/97
    const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
        const waitingTime = ttl - Date.now();
        if (waitingTime <= 1) {
            InteractionManager.runAfterInteractions(() => {
                if (!timerFix[id]) {
                    return;
                }
                delete timerFix[id];
                fn(...args);
            });
            return;
        }

        const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
        timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
        if (MAX_TIMER_DURATION_MS < time) {
            const ttl = Date.now() + time;
            const id = '_lt_' + Object.keys(timerFix).length;
            runTask(id, fn, ttl, args);
            return id;
        }
        return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = id => {
        if (typeof id === 'string' && id.startWith('_lt_')) {
            _clearTimeout(timerFix[id]);
            delete timerFix[id];
            return;
        }
        _clearTimeout(id);
    };
}

class AdminGallery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [],
            url: '',
            modalVisible: false,
            isAdmin: false
        };
    }

    setAdminView(visible) {
        this.setState({isAdmin: visible})
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible})
    }

    setImage(imageUrl) {
       this.imageUrl= imageUrl
    }

    getImage() {
        return this.imageUrl
    }

    getList() {
        imagesRef.on("value", (childSnapshot) => {
            const images= []

            childSnapshot.forEach((doc)=> {
                images.push({
                    key: doc.key,
                    url: doc.toJSON().url,
                })

                this.setState({
                    images: images
                })
            })
        })
    }

    componentDidMount() {
        this.getList()
    }

    static navigationOptions = {
        drawerIcon: () => (
            <Icon style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} />
        )
    }

    componentWillMount() {
        this.askPermission()
    }

    async askPermission() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    }

    onChooseImagePress = async () => {
        let result = await ImagePicker.launchImageLibraryAsync()
        var imageName = result.imageName + Math.random(40).toString()

        if(!result.cancelled){
            this.uploadImage(result.uri, imageName)
                .then(()=> {
                    this.pushUrl(imageName)
                    alert("succuess")
                })
                .catch((error) => {
                    alert(error)
                })
        }

    }

    uploadImage = async (uri, imageName) => {
        var storage = firebase.storage()
        const response = await fetch(uri)
        const blob = await response.blob()

        const ref = storage.ref().child('Gallery/' + imageName)

        return ref.put(blob)
    }

    pushUrl = async (imageName) => {
        var imageUrl = await firebase.storage().ref('Gallery/' + imageName).getDownloadURL()

        var key = firebase.database().ref('/images').push().key
        firebase.database().ref('/images').child(key).set({ url: imageUrl})
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
                        {'Gallery'.toUpperCase()}
                    </Text>

                    <Right>
                        <Icon 
                            style={styles.navBarIcon}
                            name="camera"
                            onPress = {this.onChooseImagePress}
                        />
                    </Right>

                </View>

                {/* this is what displays the images in full screen after one has been clicked */}
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={()=> {
                        this.setModalVisible(!this.state.modalVisible)
                    }} >

                    <TouchableHighlight onPress = {()=> {
                        this.setModalVisible(!this.state.modalVisible)
                    }}>
                    <View style={{backgroundColor: '#000000'}}>
                        <Image
                            style={{ width: 100+'%', height: 100+'%' }}
                            source={{ uri: this.getImage() }}
                            resizeMode="contain"
                        />
                    </View>
                    </TouchableHighlight>
                </Modal>
                {/*
                    This page needs an image grid, or carousel
                */}
                <FlatList
                    numColumns={2}
                    data={this.state.images}
                    renderItem={({ item, index }) => (
                        <TouchableHighlight onPress = {()=> {
                            this.setImage(item.url)
                            this.setModalVisible(true)
                            }}>
                        <Image
                            style={styles.img}
                            source={{ uri: item.url }}
                        />
                        </TouchableHighlight>   
                    )
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
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

export default AdminGallery;