import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableHighlight
} from "react-native";
import { Button, Container, Content, List, ListItem, Header, Left, Right, Icon, Body, Title, CheckBox, Form, Picker, Drawer } from 'native-base'
import styles from './Styles/shotList_styles'



import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';



export default class RandomDrill extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        console.log('didMount', this.props.tickTimes)

    }

    componentWillReceiveProps(nextProps) {

    }

    handleBackArrow = () => {
        this.props.navigation.navigate('HomeScreen')
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
    render() {

        return (
            <Container style={{ marginTop: 20 }}>
                <Header style={{ backgroundColor: 'black' }}>
                    <Left>
                        <Button transparent onPress={this.handleBackArrow}>
                            <Icon name='home' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: 'white' }}>Random Fire Drill</Title>
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
                            <MenuItem onPress={this.onCalibratePress}>Calibrate Sound</MenuItem>
                        </Menu>
                    </Right>

                </Header>
                <Text>Hello from Drill</Text>

            </Container>
        );
    }
}


