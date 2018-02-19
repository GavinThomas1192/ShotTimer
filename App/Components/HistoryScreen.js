import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableHighlight,
    AsyncStorage,
    ScrollView,
} from "react-native";
import { Button, Container, Content, Card, CardItem, List, ListItem, Header, Left, Right, Icon, Body, Title, CheckBox, Form, Picker, Drawer } from 'native-base'
import styles from './Styles/shotList_styles'



import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

let stagingTimeNames = []

export default class HistoryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchedShotListData: '',
            test: '',
            toggleShowSpecificTimes: false,
            listTimes: [],
            currentList: '',

        }
    }

    componentDidMount() {

        console.log('historyDidMount', this.state)

        this.state.listTimes.length === 0 ?
            AsyncStorage.getAllKeys().then((value) => {
                console.log('all keys fetched!!', value);
                AsyncStorage.multiGet(value).then((response) => {
                    console.log('multi get response', response)
                    this.setState({ listTimes: response }, function () {
                        console.log('state after fetching old data', this.state)
                    })
                })
            })

                .catch((err) => console.log(err))
            : undefined



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


    handleShowtimes = (ele) => {
        this.setState({ toggleShowSpecificTimes: !this.state.toggleShowSpecificTimes, currentList: ele, }, function () {
            console.log('togglin', ele)
            // JSON.parse(ele[1])
            console.log(JSON.parse((ele[1])))
        })

    }

    render() {
        return (
            <ScrollView style={{ marginTop: 20 }}>
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



                            {this.state.listTimes.length > 0 ?
                                this.state.listTimes.map(ele => {
                                    console.log('down at bottom ', ele)
                                    return <CardItem>

                                        <Text>{ele[0]}</Text>
                                        <Right>
                                            <Icon onPress={() => this.handleShowtimes(ele)} name="arrow-forward" />
                                        </Right>

                                    </CardItem>

                                })
                                : undefined}


                            {this.state.currentList !== '' ?
                                <CardItem>
                                    {JSON.parse(this.state.currentList[1]).map(ele => {
                                        return <CardItem>

                                            <Text>Time: {ele.shotTime}</Text>
                                            <Text>Differnce: {ele.shotDifference}</Text>
                                        </CardItem>
                                    })}
                                    {/* < Text > {this.state.currentList[1]}</Text> */}


                                </CardItem> : undefined}

                        </Body>
                    </CardItem>
                    <CardItem footer>
                        <Text>Gavin</Text>
                    </CardItem>
                </Card>

            </ScrollView >
        );
    }
}


