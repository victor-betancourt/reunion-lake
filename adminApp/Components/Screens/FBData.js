import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Platform, ActivityIndicator, FlatList } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Button, Icon, Container, Header, Content, Left, Right, Card, CardItem, Body } from 'native-base';
import Moment from 'moment';

class FBData extends React.Component {
    render() {
        Moment.locale('en');
        let feed = this.props.data.map(function(feedData, index){
            return (
                <Card key ={index}>
                    <CardItem>
                        <Body>
                            <Text>{feedData.message}</Text>
                        </Body>
                    </CardItem>

                    <CardItem cardBody >
                        <Image
                                source={{uri: feedData.full_picture}}
                                style={{width: null, height: 250, flex: 1}}
                            />
                    </CardItem>

                    
                    <CardItem>
                        <Left></Left>
                        <Right>
                        <Body>
                            <Text>{Moment(feedData.created_time).startOf('hour').fromNow()}</Text>
                        </Body>
                        </Right>
                    </CardItem>
                    
                </Card>
            )
        });

        return (
            <Content>
                {feed}
            </Content>       
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center', 
      justifyContent:'center'
    }
});

export default FBData;