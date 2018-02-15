import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableHighlight,
    Platform
} from "react-native";
import styles from './Styles/timer_styles'
import KeepAwake from "react-native-keep-awake";
import ShotList from './shotList'
import moment from "moment";
import SideBar from './SideBar'
import Sound from 'react-native-sound'

import CountdownCircle from 'react-native-countdown-circle'

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';


import { Button, Container, Content, List, ListItem, Header, Left, Right, Icon, Body, Title, CheckBox, Form, Picker, Drawer, Toast } from 'native-base'
// import { Stopwatch, Timer } from 'react-native-stopwatch-timer'
import { AudioRecorder, AudioUtils } from 'react-native-audio';


export default class TimerScreen extends Component {
    constructor(props) {

        super(props);
        this.state = {

            totalDuration: 90000,
            timerReset: false,
            tickTimes: [],
            newTicktimes: [],
            timerDelay: 'timerDelay5',
            autoStop: 'autoStop0',
            toggleCountdown: false,
            toggleAutoStop: false,
            airHornSound: '',
            countDown: '',
            counter: 0,
            recording: false,
            toggleNavMenu: false,
        };

        this.testButton = this.testButton.bind(this)
        this.stopRecording = this.stopRecording.bind(this)
    }

    componentDidMount() {
        console.log('DONEDIDHERDIDMOUNT', this.props)
        // const { navigate } = this.props.navigation;

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
        let GetAirHornSound = new Sound('sport_air_horn_002.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            // loaded successfully
            console.log('duration in seconds: ' + GetAirHornSound.getDuration() + 'number of channels: ' + GetAirHornSound.getNumberOfChannels());
            this.setState({ airHornSound: GetAirHornSound })
        });

        let GetCountDown = new Sound('count_down.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            // loaded successfully
            console.log('duration in seconds: ' + GetCountDown.getDuration() + 'number of channels: ' + GetCountDown.getNumberOfChannels());
            this.setState({ countDown: GetCountDown })
        });

        // Play the sound with an onEnd callback

    }



    startButton = () => {
        {
            this.state.timerDelay.replace(/\D/g, '') > 0 ?
                this.setState({ toggleCountdown: true })
                : this.testButton()
        }
    }

    handleTickSound = (elapsedSecs, totalSecs) => {
        console.log(this.state, totalSecs, 'yolololo')
        { elapsedSecs == totalSecs || elapsedSecs == 0 ? undefined : this.state.countDown.play() }

    }

    secondTick = (elapsedSecs, totalSecs) => {
        this.handleTickSound(elapsedSecs, totalSecs)
        return this.state.timerDelay.replace(/\D/g, '') == 100 ? '' : (totalSecs - elapsedSecs).toString()

        // return (totalSecs - elapsedSecs).toString()
    }


    testButton() {

        this.state.airHornSound.play((success) => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
                // reset the player to its uninitialized state (android only)
                // this is the only option to recover after an error occured and use the player again
                this.state.airHornSound.reset();
            }
        });

        this.setState({ toggleCountdown: false, toggleAutoStop: true })

        AudioRecorder.startRecording();
        AudioRecorder.onProgress = data => {
            this.setState({ recording: true })
            let decibels = Math.floor(data.currentMetering);
            // console.log(
            //     data.currentMetering,
            //     data.currentTime
            // )

            {
                data.currentMetering > 0 ? this.setState({ newTicktimes: [...this.state.newTicktimes, data.currentTime] }, function () {
                    console.log(this.state)
                }) : undefined
            }

        };
    }

    stopRecording() {
        AudioRecorder.stopRecording();
        this.setState({ recording: false, toggleAutoStop: false })
        console.log('STOPPED, LOOGED THESE TIMES', this.state.newTicktimes)
    }


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

    onDrillScreenPress = () => {
        this.props.navigation.navigate('RandomDrillScreen')
        this.hideMenu()
    }

    onCalibratePress = () => {

    }


    render() {
        const Item = Picker.Item;

        // const { navigate } = this.props.navigation
        return (
            <View style={{ marginTop: 20 }}>

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

                            <MenuItem onPress={this.onCalibratePress}>Calibrate Sound</MenuItem>
                        </Menu>
                    </Right>
                </Header>

                {/* <Content> */}
                <Text>Timer Delay</Text>
                <Form style={{
                    alignContent: 'center',
                    justifyContent: 'center'
                }}>

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
                    <Button style={{ alignSelf: 'flex-start' }} transparent onPress={() => this.props.navigation.navigate('HomeScreen')}>
                        <Icon name='help' />
                    </Button>
                </Form>
                <Text>Automatic Timer Stop</Text>
                <Form>

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
                {/* </Content> */}


                {/* COUNTDOWN CIRCLE OTHERWISE START BUTTON */}
                {this.state.toggleCountdown ?
                    <CountdownCircle
                        seconds={this.state.timerDelay.replace(/\D/g, '') == 100 ? Math.floor(Math.random() * Math.floor(30)) : this.state.timerDelay.replace(/\D/g, '')}
                        radius={30}
                        borderWidth={8}
                        color="#ff003f"
                        bgColor="#fff"
                        updateText={(elapsedSecs, totalSecs) => this.secondTick(elapsedSecs, totalSecs)}
                        textStyle={{ fontSize: 20 }}
                        onTimeElapsed={this.testButton}
                    /> : <Button block onPress={this.startButton}>
                        {/* <Icon name='start' /> */}
                        <Text>Start</Text>
                    </Button>}

                <Button block onPress={this.stopRecording}>
                    {/* <Icon name='start' /> */}
                    <Text>STOP</Text>
                </Button>


                {/* SHOW RECORDING TEXT IF RECORDING */}
                {this.state.recording ?
                    <Text>RECORDING!!!</Text> : undefined}

                {/* IF TIMER DELAY SHOW NEW COUNTDOWN CLOCK THEN START RECORDING */}
                {this.state.toggleAutoStop && this.state.autoStop.replace(/\D/g, '') > 0 ?
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

                {/* FORMATTED SHOT LIST */}
                <ShotList tickTimes={this.state.newTicktimes} />

            </View >
        );
    }
}

                // const handleTimerComplete = () => alert("custom completion function");

// const options = {
//     container: {
//         backgroundColor: '#000',
//         padding: 5,
//         borderRadius: 5,
//         width: 220,
//     },
//     text: {
//         fontSize: 30,
//         color: '#FFF',
//         marginLeft: 7,

//     }
// };