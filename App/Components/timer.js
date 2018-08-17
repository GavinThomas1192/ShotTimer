import React, { Component } from "react";
import {
    View,
    Text,
    AsyncStorage,
    StyleSheet,
    ScrollView,
    List,
    ListItem
} from "react-native";
import ShotList from './shotList'
import Sound from 'react-native-sound'
import CountdownCircle from 'react-native-countdown-circle'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Button, Header, Left, Right, Icon, Body, Title, Form, Picker, Toast } from 'native-base'
import { AudioRecorder, AudioUtils } from 'react-native-audio';


const stagingPool = [];

export default class TimerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerReset: false,
      tickTimes: [],
      newTickTimes: [],
      timerDelay: 'timerDelay1',
      autoStop: 'autoStop0',
      toggleCountdown: false,
      toggleAutoStop: false,
      airHornSound: '',
      countDown: '',
      recording: false,
      toggleDownloadShotTimes: true,
      combinedShotList: null,
    };
    this.stopRecording = this.stopRecording.bind(this)
  }

  async componentDidMount() {
    const highestSoundCalibration = await AsyncStorage.getItem('SHOT_TIMER_CALIBRATION')
    this.setState({
      highestSoundCalibration: JSON.parse(highestSoundCalibration)
    })
    let audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';
    AudioRecorder.prepareRecordingAtPath(audioPath, {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: "Low",
        AudioEncoding: "aac",
        MeteringEnabled: true,
    });

    Sound.setCategory('Playback');
    // Load the sound file 'whoosh.mp3' from the app bundle
    // See notes below about preloading sounds within initialization code below.
    let GetAirHornSound = new Sound('sport_air_horn_blast.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            return;
        }
        // loaded successfully
        this.setState({ airHornSound: GetAirHornSound })
    });

    let GetCountDown = new Sound('ticking_countdown.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            return;
        }
        // loaded successfully
        this.setState({ countDown: GetCountDown })
    });
  }
  
  startButton = () => {
    this.state.timerDelay.replace(/\D/g, '') > 0 ?
      this.setState({ toggleCountdown: true })
      : this.startRecordingShots()
  }
  handleTickSound = (elapsedSecs, totalSecs) => {
    { elapsedSecs == totalSecs ? undefined : this.state.countDown.play() }
  }
  // ############## HANDLES THE TEXT THAT IS DISPLAYED INSIDE THE COUNTDOWN TIMER ##############
  secondTick = (elapsedSecs, totalSecs) => {
    this.handleTickSound(elapsedSecs, totalSecs)
    return this.state.timerDelay.replace(/\D/g, '') == 100 ? '' : (totalSecs - elapsedSecs).toString()
  }

  // ############## GETS CALLED TO PLAY THE AIR HORN SOUND STOPPING THE TIMER AND STARTING THE SHOT RECORDING ##############
  startRecordingShots = async () => {
    const {highestSoundCalibration, countDown, airHornSound} = this.state
    countDown.stop()
    airHornSound.play((success) => {
        if (success) {
        } else {
          airHornSound.reset()
        }
    });

    this.setState({ toggleCountdown: false, toggleAutoStop: true })
    // ############## START LISTENING FOR SHOTS ##############
    AudioRecorder.startRecording();
    AudioRecorder.onProgress = data => {
    this.setState({ recording: true })
    let decibels = Math.floor(data.currentMetering);
    !!highestSoundCalibration && decibels > highestSoundCalibration &&
      this.setState({ newTickTimes: [...this.state.newTickTimes, data.currentTime]})
  
    !highestSoundCalibration && decibels > 0 &&
      this.setState({ newTickTimes: [...this.state.newTickTimes, data.currentTime]})
    };
  }

  stopRecording() {
    AudioRecorder.stopRecording();
    this.state.countDown.stop();
    this.setState({ 
      recording: false, 
      toggleAutoStop: false,
      toggleCountdown: false, 
      toggleDownloadShotTimes: true 
    })
  }

  onValueChange(value) { 
    value.replace(/\d/g, '') == 'autoStop' ?
      this.setState({
          autoStop: value
      })
      :
      this.setState({
          timerDelay: value
      })  
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
  onCalibratePress = () => {
      this.props.navigation.navigate('CalibrateMicrophoneScreen')
      this.hideMenu()
  }
  onHistoryPress = () => {
      this.props.navigation.navigate('HistoryScreen')
      this.hideMenu()
  }

  updateHome = (timeObject) => {
    console.log(timeObject)
    stagingPool = timeObject
  }

  saveResultList = () => {
    let currentTime = new Date().toLocaleString()
    const saveData = {'Date': currentTime, 'ShotRecord': stagingPool}

    try {
      AsyncStorage.setItem('SHOT-TIMER-RECORDS', JSON.stringify(saveData)).then(() => {
        this.setState({ toggleDownloadShotTimes: false }, function () {
          Toast.show({
            supportedOrientations: ['portrait', 'landscape'],
            text: `Saved Shot Data!`,
            position: 'bottom',
            buttonText: 'Dismiss',
            duration: 5000,
          });
        })
      })

    } catch (error) {
        Toast.show({
          supportedOrientations: ['portrait', 'landscape'],
          text: `Whoops! I wasn't able to save your data.`,
          position: 'bottom',
          buttonText: 'Dismiss',
          duration: 5000,
        });
    }
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
            <MenuItem onPress={this.onHistoryPress}>Shot History</MenuItem>
            <MenuItem onPress={this.onCalibratePress}>Calibrate Sound</MenuItem>
          </Menu>
        </Right>
      </Header>
    )
  }

  renderTimerDelay() {
    const {timerDelay} = this.state;
    const Item = Picker.Item;
    return (
      <Form>
        <Text >Timer Delay</Text>
        <Picker
          iosHeader="Select one"
          mode="dropdown"
          selectedValue={timerDelay}
          onValueChange={this.onValueChange.bind(this)}
        >
          <Item label="No Delay" value="timerDelay0" />
          <Item label="Random" value="timerDelay100" />
          <Item label="1 Second" value="timerDelay1" />
          <Item label="2 Seconds" value="timerDelay2" />
          <Item label="3 Seconds" value="timerDelay3" />
          <Item label="4 Seconds" value="timerDelay4" />
          <Item label="5 Seconds" value="timerDelay5" />
          <Item label="10 Seconds" value="timerDelay10" />
          <Item label="15 Seconds" value="timerDelay15" />
          <Item label="20 Seconds" value="timerDelay20" />
          <Item label="30 Seconds" value="timerDelay30" />
        </Picker>
        <Icon style={{ marginRight: 20 }} name='help' onPress={() => Toast.show({
          text: 'Timer Delay will start a countdown based on the time you choose. At the end of the countdown gunshot recording will begin so you don\'t have to worry about pushing start.',
          position: 'bottom',
          buttonText: 'Nice',
          duration: 10000,
        })} />
    </Form>
    )
  }

  renderAutomaticTimerStop() {
    const { autoStop} = this.state;
    const Item = Picker.Item;
    return (
      <Form>
        <Text>Automatic Timer Stop</Text>
        <Picker
          iosHeader="Select one"
          mode="dropdown"
          selectedValue={autoStop}
          onValueChange={this.onValueChange.bind(this)}>
            <Item label="None" value="autoStop0" />
            <Item label="5 Seconds" value="autoStop5" />
            <Item label="10 Seconds" value="autoStop10" />
            <Item label="15 Seconds" value="autoStop15" />
            <Item label="20 Seconds" value="autoStop20" />
            <Item label="30 Seconds" value="autoStop30" />
        </Picker>
        <Icon style={{ marginLeft: 20 }} name='help' onPress={() => Toast.show({
          text: 'Automatic Timer Stop will turn off gunshot recording at the specified time just in case you can\'t push stop!',
          position: 'bottom',
          buttonText: 'Awesome',
          duration: 10000,
        })} />
    </Form>
    )
  }

  renderAutomaticStopCountdown() {
    const { autoStop} = this.state;
    return (
      <View>
        <Text>Automatic Stop In..</Text>
        <CountdownCircle
          seconds={autoStop.replace(/\D/g, '')}
          radius={30}
          borderWidth={8}
          color="#ff003f"
          bgColor="#fff"
          // updateText={(elapsedSecs, totalSecs) => this.secondTick(elapsedSecs, totalSecs)}
          textStyle={{ fontSize: 20 }}
          onTimeElapsed={this.stopRecording}
        />
      </View>
    )
  }

  renderResultsList() {
    const {newTickTimes} = this.state;
    return (
      <ScrollView>
      <Text style={styles.timeText}> Result List!</Text>
      <List style={{ flex: 0 }}>
        {newTickTimes.length > 0 && newTickTimes.map((times, index) => {
          let difference = (times - this.props.tickTimes[(index - 1)])
          Number.isNaN(difference) ? difference = 'None' : difference = difference.toFixed(3)
          let combinedShot = { shotTime: times.toFixed(3), shotDifference: difference }
          this.setState({combinedShotList: [...this.state.combinedShotList, combinedShot]})
          return (
            <ListItem style={styles.timeText} key={index}>
              <Text>{"Shot " + (index + 1) + " @ " + times.toFixed(3) + "."}</Text>
              <Text>{" Difference " + difference}</Text>
            </ListItem>
          )
        })}
      </List>
    </ScrollView >
  );
}

  render() {
    const {
      timerDelay, 
      autoStop, 
      toggleAutoStop, 
      toggleCountdown, 
      recording, 
      toggleDownloadShotTimes, 
      newTickTimes
    } = this.state;
    return (
        <View style={{
            marginTop: 20,
            flex: 1,
            position: 'relative'
        }}>
        {this.renderHeader()}
        <View style={{ flexDirection: 'row' }}>
          {this.renderTimerDelay()}
          {this.renderAutomaticTimerStop()}
        </View>

        <View style={{ flexDirection: 'row' }}>
          {!toggleCountdown && !recording &&
            <Button style={{ flex: 2, margin: 10 }} block onPress={this.startButton}>
              <Text>Start</Text>
            </Button>
          }       
          <Button style={{ flex: 2, margin: 10 }} block onPress={this.stopRecording}>
              <Text>Stop</Text>
          </Button>
        </View>

        {/* SHOW COUNTDOWN OUTSIDE THE ROW VIEW ABOVE */}
        {!!toggleCountdown &&
          <CountdownCircle
            seconds={timerDelay.replace(/\D/g, '') == 100 ? Math.floor(Math.random() * Math.floor(30)) : timerDelay.replace(/\D/g, '')}
            radius={30}
            borderWidth={8}
            color="#ff003f"
            bgColor="#fff"
            updateText={(elapsedSecs, totalSecs) => this.secondTick(elapsedSecs, totalSecs)}
            textStyle={{ fontSize: 20 }}
            onTimeElapsed={this.startRecordingShots}
          /> 
        }

        {!!recording ? <Text>RECORDING!!!</Text> : <Text>NOT RECORDING!!!</Text>}
        
        {/* IF TIMER DELAY SHOW NEW COUNTDOWN CLOCK THEN START RECORDING */}
            {toggleAutoStop && autoStop.replace(/\D/g, '') > 0 &&
              this.renderAutomaticStopCountdown() }

        {stagingPool.length > 0 && !recording && toggleDownloadShotTimes &&
          <Button style={{ margin: 20 }} block onPress={this.saveResultList}>
              <Text>Save Record</Text>
          </Button> 
        }
        {/* <ShotList updateHome={this.updateHome} tickTimes={newTickTimes} /> */}
        {newTickTimes.length > 0 && this.renderResultsList()}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  timeText: {
    color: 'black',
    fontSize: 20,
  },
});