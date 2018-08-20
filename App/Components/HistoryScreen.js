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
    !!previousRecords && this.setState({ previousRecords: JSON.parse(previousRecords) })
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

  renderHeader() {
    return (
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
    )
  }

  renderHistoryCard() {
    const { previousRecords } = this.state;
    return (
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
    )
  }

  render() {
    return (
      <ScrollView style={{ marginTop: 20 }}>
        {this.renderHeader()}
        <Card>
          <CardItem header>
            <Text>Welcome to your history</Text>
          </CardItem>
          {this.renderHistoryCard()}
        </Card>
      </ScrollView >
    );
  }
}


