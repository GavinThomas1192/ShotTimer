import React, { Component } from "react";
import {
  AsyncStorage,
  StyleSheet
} from "react-native";
import { Container, Header, Content, Card, CardItem, Text, Body, Left, Button, Icon, Right, Title } from 'native-base';
import Menu, { MenuItem } from 'react-native-material-menu';
import { AudioRecorder, AudioUtils } from 'react-native-audio';

export default class CalibrateMicrophoneScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSoundLevel: 'none',
      highestSoundLevel: -100,
      previousSoundCalibration: null
    }
  }

  async componentDidMount() {
    const previousSoundCalibration = await AsyncStorage.getItem('SHOT_TIMER_CALIBRATION')
    !!previousSoundCalibration && this.setState({
      previousSoundCalibration: JSON.parse(previousSoundCalibration)
    })
    let audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';

    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      MeteringEnabled: true,
    });
  }

  startCalibration = () => {
    AudioRecorder.startRecording();
    AudioRecorder.onProgress = data => {
      let highLevel;
      let decibels = data.currentMetering.toFixed(3);

      this.setState({
        recording: true, currentSoundLevel: decibels,
        highestSoundLevel: decibels > this.state.highestSoundLevel ?
          decibels : this.state.highestSoundLevel
      })
    };
  }

  stopCalibration = async () => {
    AudioRecorder.stopRecording();
    AsyncStorage.setItem('SHOT_TIMER_CALIBRATION', JSON.stringify(this.state.highestSoundLevel))
    this.props.navigation.navigate('TimerScreen')
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

  renderHeader() {
    return (
      <Header style={{ backgroundColor: 'black' }}>
        <Left>
          <Button transparent onPress={() => this.props.navigation.navigate('HomeScreen')}>
            <Icon name='home' />
          </Button>
        </Left>
        <Body>
          <Title style={{ color: 'white' }}>Calibration</Title>
        </Body>
        <Right>
          <Button transparent onPress={this.showMenu}>
            <Icon name='settings' />
          </Button>
          <Menu
            ref={this.setMenuRef}
            style={{ alignSelf: 'flex-end' }}
          >
            <MenuItem onPress={() => this.onDrillScreenPress(this.props.navigation)}>Random Fire Excersize</MenuItem>
            <MenuItem onPress={() => this.onShotTimerPress(this.props.navigation)}>Shot Timer</MenuItem>
            <MenuItem onPress={this.onCalibratePress}>Calibrate Sound</MenuItem>
          </Menu>
        </Right>
      </Header>
    )
  }

  renderCalibrationInstructions() {
    return (
      <Card>
        <CardItem header>
          <Text>Microphone Calibration</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text style={styles.marginBottom}>
              If this app isn't accurately hearing shots from your firearm calibration may be needed.
            </Text>
            <Text>
              Push the start button below, then fire one shot, then push the stop button.
            </Text>
            <Text style={styles.marginBottom}>
              This should calibrate your app to the caliber you just fired.
            </Text>
          </Body>
        </CardItem>
        <CardItem footer>
          <Text>Happy Shooting!</Text>
        </CardItem>
      </Card>
    )
  }

  renderRecordingCard() {
    const { previousSoundCalibration, currentSoundLevel, highestSoundLevel } = this.state
    return (
      <Card>
        <CardItem header>
          <Text>Sound Metering</Text>
        </CardItem>
        <CardItem>
          <Body>
            {previousSoundCalibration &&
              <Text>Previous Calibration Level {previousSoundCalibration}</Text>}
            <Text style={styles.marginBottom}>
              Current Sound {currentSoundLevel}</Text>
            <Text>
              Highest Sound {highestSoundLevel}</Text>
          </Body>
        </CardItem>
        <CardItem footer>
          <Text>Happy Shooting!</Text>
        </CardItem>
        <Button style={{ margin: 20 }} block onPress={this.stopCalibration}>
          {/* <Icon name='start' /> */}
          <Text>Stop Calibration</Text>
        </Button>
      </Card>
    )
  }
  render() {
    const { recording } = this.state
    return (
      <Container>
        {this.renderHeader()}
        <Content>
          {this.renderCalibrationInstructions()}
          {recording ? this.renderRecordingCard() :
            <Button style={{ margin: 20 }} block onPress={this.startCalibration}>
              <Text>Start Calibration</Text>
            </Button>
          }
        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 20,
  },
});


