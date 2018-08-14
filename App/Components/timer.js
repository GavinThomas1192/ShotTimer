import React, { Component } from "react";
import {
    View,
    Text,
    AsyncStorage
} from "react-native";

import ShotList from './shotList'
import Sound from 'react-native-sound'

import CountdownCircle from 'react-native-countdown-circle'

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';


import { Button, Container, Content, List, ListItem, Header, Left, Right, Icon, Body, Title, CheckBox, Form, Picker, Drawer, Toast } from 'native-base'
// import { Stopwatch, Timer } from 'react-native-stopwatch-timer'
import { AudioRecorder, AudioUtils } from 'react-native-audio';

const stagingPool = []

export default class TimerScreen extends Component {
    constructor(props) {

        super(props);
        this.state = {
            totalDuration: 90000,
            timerReset: false,
            tickTimes: [],
            newTicktimes: [],
            timerDelay: 'timerDelay1',
            autoStop: 'autoStop0',
            toggleCountdown: false,
            toggleAutoStop: false,
            airHornSound: '',
            countDown: '',
            counter: 0,
            recording: false,
            toggleNavMenu: false,
            showToast: false,
            toggleDownloadShotTimes: true,
            completeTimeObject: '',
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
    

    // ############## START THE SHOT TIMER ##############
    startButton = () => {
        {
            this.state.timerDelay.replace(/\D/g, '') > 0 ?
                this.setState({ toggleCountdown: true })
                : this.startRecordingShots()
        }
    }

    // ############## GETS CALLED INSIDE THE COUNTDOWN TIMER (SECONDTICK) TO RENDER SOUND ON ALL BUT THE LAST TICK! ##############
    handleTickSound = (elapsedSecs, totalSecs) => {
        { elapsedSecs == totalSecs ? undefined : this.state.countDown.play() }

    }
    // ############## HANDLES THE TEXT THAT IS DISPLAYED INSIDE THE COUNTDOWN TIMER ##############
    secondTick = (elapsedSecs, totalSecs) => {
        this.handleTickSound(elapsedSecs, totalSecs)
        return this.state.timerDelay.replace(/\D/g, '') == 100 ? '' : (totalSecs - elapsedSecs).toString()

        // return (totalSecs - elapsedSecs).toString()
    }

    // ############## GETS CALLED TO PLAY THE AIR HORN SOUND STOPPING THE TIMER AND STARTING THE SHOT RECORDING ##############
    startRecordingShots = async () => {
      const {highestSoundCalibration} = this.state
      this.state.countDown.stop()
      this.state.airHornSound.play((success) => {
          if (success) {
          } else {
            this.state.airHornSound.reset()
          }
      });

      this.setState({ toggleCountdown: false, toggleAutoStop: true })

      // ############## START LISTENING FOR SHOTS ##############
      AudioRecorder.startRecording();
      AudioRecorder.onProgress = data => {
          this.setState({ recording: true })
          let decibels = Math.floor(data.currentMetering);
          // console.log(
          //     data.currentMetering,
          //     data.currentTime
          // )

          // ############## IF THEY CALIBRATED USE THAT NUMBER TO DETERMINE IF NOISE INCOMING IS LOUD ENOUGH FOR A SHOT ##############
          !!highestSoundCalibration && decibels > highestSoundCalibration &&
            this.setState({ newTicktimes: [...this.state.newTicktimes, data.currentTime]})
        
          // ############## OTHERWISE STICK WITH BASE NUMBER ##############
          !highestSoundCalibration && decibels > 0 &&
            this.setState({ newTicktimes: [...this.state.newTicktimes, data.currentTime]})
      };
    }

    stopRecording() {
        AudioRecorder.stopRecording();
        this.state.countDown.stop();
        this.setState({ recording: false, toggleAutoStop: false, toggleCountdown: false, toggleDownloadShotTimes: true })

    }

    // ############## HANDLE MENU CHANGE FOR SETTINGS ##############
    onValueChange(value) {
        {
            value.replace(/\d/g, '') == 'autoStop' ?
                this.setState({
                    autoStop: value
                })
                :
                this.setState({
                    timerDelay: value
                })

        }
    }

    handleMenuChange = () => {
        this.props.navigation.navigate('RandomDrillScreen')
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
    // ############## NAVIGATION ##############
    onDrillScreenPress = () => {
        this.props.navigation.navigate('RandomDrillScreen')
        this.hideMenu()
    }
    // ############## NAVIGATION ##############
    onCalibratePress = () => {
        this.props.navigation.navigate('CalibrateMicrophoneScreen')
        this.hideMenu()
    }
    onHistoryPress = () => {
        this.props.navigation.navigate('HistoryScreen')
        this.hideMenu()
    }

    updateHome = (timeObject) => {
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

    render() {
        const Item = Picker.Item;

        // const { navigate } = this.props.navigation
        return (
            <View style={{
                marginTop: 20,
                flex: 1,
                position: 'relative'
            }}>

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



            {/* <Content> */}
            <View style={{ flexDirection: 'row' }}>


                <Form >
                    <Text >Timer Delay</Text>
                    <Picker
                        iosHeader="Select one"
                        mode="dropdown"
                        selectedValue={this.state.timerDelay}
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

                </Form>
                <Icon style={{ marginRight: 20 }} name='help' onPress={() => Toast.show({
                    text: 'Timer Delay will start a countdown based on the time you choose. At the end of the countdown gunshot recording will begin so you don\'t have to worry about pushing start.',
                    position: 'bottom',
                    buttonText: 'Nice',
                    duration: 10000,
                })} />

                <Form>
                    <Text>Automatic Timer Stop</Text>

                    <Picker
                        iosHeader="Select one"
                        mode="dropdown"
                        selectedValue={this.state.autoStop}
                        onValueChange={this.onValueChange.bind(this)}
                    >
                        <Item label="None" value="autoStop0" />
                        <Item label="5 Seconds" value="autoStop5" />
                        <Item label="10 Seconds" value="autoStop10" />
                        <Item label="15 Seconds" value="autoStop15" />
                        <Item label="20 Seconds" value="autoStop20" />
                        <Item label="30 Seconds" value="autoStop30" />
                    </Picker>
                </Form>

                <Icon style={{ marginLeft: 20 }} name='help' onPress={() => Toast.show({
                    text: 'Automatic Timer Stop will turn off gunshot recording at the specified time just in case you can\'t push stop!',
                    position: 'bottom',
                    buttonText: 'Awesome',
                    duration: 10000,
                })} />

                </View>
                {/* </Content> */}


                {/* CONDITIONAL BUTTON TO ONLY SHOW WHEN COUNTDOWN ISN'T SHOWING */}
                <View style={{ flexDirection: 'row' }}>
                    {
                        this.state.toggleCountdown ?
                            undefined
                            : <Button style={{ flex: 2, margin: 10 }} block onPress={this.startButton}>
                                {/* <Icon name='start' /> */}
                                <Text>Start</Text>
                            </Button>
                    }

                    <Button style={{ flex: 2, margin: 10 }} block onPress={this.stopRecording}>
                        {/* <Icon name='start' /> */}
                        <Text>Stop</Text>
                    </Button>
                </View>

                {/* SHOW COUNTDOWN OUTSIDE THE ROW VIEW ABOVE */}
                {this.state.toggleCountdown ?
                    <CountdownCircle
                        seconds={this.state.timerDelay.replace(/\D/g, '') == 100 ? Math.floor(Math.random() * Math.floor(30)) : this.state.timerDelay.replace(/\D/g, '')}
                        radius={30}
                        borderWidth={8}
                        color="#ff003f"
                        bgColor="#fff"
                        updateText={(elapsedSecs, totalSecs) => this.secondTick(elapsedSecs, totalSecs)}
                        textStyle={{ fontSize: 20 }}
                        onTimeElapsed={this.startRecordingShots}
                    /> : undefined}

                {!!this.state.recording && <Text>RECORDING!!!</Text>}
                

                {/* IF TIMER DELAY SHOW NEW COUNTDOWN CLOCK THEN START RECORDING */}
                {
                    this.state.toggleAutoStop && this.state.autoStop.replace(/\D/g, '') > 0 ?
                        // <Content>
                        <View>

                            <Text>Automatic Stop In..</Text>
                            <CountdownCircle
                                seconds={this.state.autoStop.replace(/\D/g, '')}
                                radius={30}
                                borderWidth={8}
                                color="#ff003f"
                                bgColor="#fff"
                                // updateText={(elapsedSecs, totalSecs) => this.secondTick(elapsedSecs, totalSecs)}
                                textStyle={{ fontSize: 20 }}
                                onTimeElapsed={this.stopRecording}
                            />
                        </View>
                        // </Content>
                        : undefined
                }

                {stagingPool.length > 0 && !this.state.recording && this.state.toggleDownloadShotTimes ?

                    <Button style={{ margin: 20 }} block onPress={this.saveResultList}>
                        {/* <Icon name='start' /> */}
                        <Text>Save Record</Text>
                    </Button> : undefined
                }

                {/* FORMATTED SHOT LIST */}
                <ShotList updateHome={this.updateHome} tickTimes={this.state.newTicktimes} />

            </View >
        );
    }
}
