import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableHighlight,
    AsyncStorage
} from "react-native";
import { Button, Container, Content, Card, CardItem, List, ListItem, Header, Left, Right, Icon, Body, Title, CheckBox, Form, Picker, Drawer } from 'native-base'
import styles from './Styles/shotList_styles'



import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';



export default class HistoryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchedShotListData: '',
            test: '',

        }
    }

    componentDidMount() {
        console.log('historyDidMount', this.state)
        AsyncStorage.getAllKeys().then((value) => {
            console.log('all keys fetched!!', value);
            value.forEach(ele => {
                AsyncStorage.getItem(ele).then((response) => {
                    let concatedObject = { [ele.toString()]: JSON.parse(response) }
                    console.log('concated object!', concatedObject)
                    this.setState({ fetchedShotListData: [...this.state.fetchedShotListData, [concatedObject]], test: concatedObject })
                    console.log('state after ele update', this.state)
                })
            })
        }).catch((err) => console.log(err))



    }

    componentWillReceiveProps(nextProps) {

    }

    fetchSavedShotLists = () => {

        try {
            const value = AsyncStorage.getItem('GavinsShotTimer:Data');
            if (value !== null) {
                // We have data!!
                console.log('DATA FETCHED!!', JSON.parse(value));
            }
        } catch (error) {
            console.log('error fetching any data')
        }
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
                        <Title style={{ color: 'white' }}>Shots History</Title>
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
                <Text>Hello from history</Text>

                <Card>
                    <CardItem header>
                        <Text>Welcome to your history</Text>
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
                    <CardItem>
                        <Body>

                            {this.state.fetchedShotListData !== '' ?

                                this.state.fetchedShotListData.map(ele => {
                                    console.log('need to console these eles to see whats going on', ele)
                                    return ele.map(secondEle => {
                                        console.log('secondele', secondEle, Object.keys(secondEle))

                                        return Object.values(secondEle).map(thirdEle => {
                                            console.log('THIRD', Object.entries(thirdEle))

                                            return Object.entries(thirdEle).map(fourthEle => {
                                                console.log('fourth!', fourthEle[1].shotTime)
                                                // < Text > { fourthEle[1].shotTime }</Text>
                                                return <Text> {fourthEle[1].shotTime} {fourthEle[1].shotDifference}</Text>

                                            })
                                        })


                                    })
                                })
                                : <Text>Nothing yet</Text>}


                        </Body>
                    </CardItem>
                    <CardItem footer>
                        <Text>Gavin</Text>
                    </CardItem>
                </Card>

            </Container>
        );
    }
}


