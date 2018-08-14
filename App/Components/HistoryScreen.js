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
      previousRecords: [],

    }
  }

  async componentDidMount() {
    const previousRecords = await AsyncStorage.getItem('SHOT-TIMER-RECORDS')
    !!previousRecords && this.setState({ previousRecords: [...this.state.previousRecords, JSON.parse(previousRecords)] })
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


  handleShowtimes = (ele) => {
    this.setState({ toggleShowSpecificTimes: !this.state.toggleShowSpecificTimes, currentList: ele, }, function () {
    })

  }

  render() {
    const { previousRecords } = this.state
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
              {!!previousRecords && previousRecords.length > 0 &&
                previousRecords.map((ele, index) => {
                  return <CardItem key={index}>
                    <Text>{ele.Date}</Text>
                    {ele.ShotRecord.map((shotRecord, index) => {
                      return (
                        <CardItem key={index}>
                          <Text>Time: {shotRecord.shotTime}</Text>
                          <Text>Differnce: {shotRecord.shotDifference}</Text>
                        </CardItem>
                      )
                    })}
                    <Right>
                      <Icon onPress={() => this.handleShowtimes(ele)} name="arrow-forward" />
                    </Right>
                  </CardItem>
                })
              }

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


