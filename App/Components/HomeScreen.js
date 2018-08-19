import React, { Component } from "react";
import {
    View,

    StyleSheet,
    StatusBar,
    TouchableHighlight
} from "react-native";
import { Container, Header, Content, Card, CardItem, Text, Body, Left, Button, Icon, Right, Title } from 'native-base';


import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';




export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    setMenuRef = ref => {
        this.menu = ref;
    };

    menu = null;

    hideMenu = () => {
        this.menu.hide();
    };

    showMenu = () => {
        this.menu.show();
    };

    onDrillScreenPress = () => {
        this.props.navigation.navigate('RandomDrillScreen')
        this.hideMenu()
    }

    onShotTimerPress = () => {
        this.props.navigation.navigate('TimerScreen')
        this.hideMenu()
    }

    onCalibratePress = () => {
        this.props.navigation.navigate('CalibrateMicrophoneScreen')
        this.hideMenu()
    }
    onHistoryPress = () => {
        this.props.navigation.navigate('HistoryScreen')
        this.hideMenu()
    }
    render() {

        return (
            <Container>
                <Header style={{ backgroundColor: 'black' }}>
                    <Left>
                        <Button transparent onPress={this.handleMenuChange}>
                            {/* <Icon name='menu' /> */}
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: 'white' }}>Shot Timer</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.showMenu}>
                            <Icon name='settings' />
                        </Button>
                        <Menu

                            ref={this.setMenuRef}
                            style={{ alignSelf: 'flex-end' }}
                        >
                            {<MenuItem onPress={() => this.onDrillScreenPress(this.props.navigation)}>Random Fire Excersize</MenuItem>}
                            <MenuItem onPress={() => this.onShotTimerPress(this.props.navigation)}>Shot Timer</MenuItem>
                            <MenuItem onPress={this.onHistoryPress}>Shot History</MenuItem>
                            <MenuItem onPress={this.onCalibratePress}>Calibrate Sound</MenuItem>
                        </Menu>
                    </Right>
                </Header>
                <Content>
                    <Card>
                        <CardItem header>
                            <Text>Welcome to Gavin's Shot Timer</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={{ marginBottom: 10 }}>
                                    In this app you can utilize a basic Shot Timer, to track your shot times, time between shots, and total duration. There are several settings within like timer delay and auto stop to make your life easier!
                                </Text>
                                <Text>
                                    The Random Drill Excersize will buzz at random intervals allowing you to practice your holster to fire times.
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Text>Gavin</Text>
                        </CardItem>
                    </Card>
                    <Button style={{ margin: 20 }} block onPress={() => this.props.navigation.navigate('TimerScreen')}>
                        {/* <Icon name='start' /> */}
                        <Text>Shot Timer</Text>
                    </Button>
                    <Button style={{ margin: 20 }} block onPress={() => this.props.navigation.navigate('RandomDrillScreen')}>
                        {/* <Icon name='start' /> */}
                        <Text>Random Fire Excersize</Text>
                    </Button>
                    <Button style={{ margin: 20 }} block onPress={() => this.props.navigation.navigate('HistoryScreen')}>
                        {/* <Icon name='start' /> */}
                        <Text>Shot History</Text>
                    </Button>
                    <Button style={{ margin: 20 }} block onPress={() => this.props.navigation.navigate('CalibrateMicrophoneScreen')}>
                        {/* <Icon name='start' /> */}
                        <Text>Calibrate Microphone</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}


