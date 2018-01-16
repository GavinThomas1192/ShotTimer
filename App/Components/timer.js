import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableHighlight
} from "react-native";
import styles from './Styles/timer_styles'
import KeepAwake from "react-native-keep-awake";
import ShotList from './shotList'
import moment from "moment";
import { Button, Container, Content, List, ListItem } from 'native-base'
import { Stopwatch, Timer } from 'react-native-stopwatch-timer'
import { AudioRecorder, AudioUtils } from 'react-native-audio';

export default class TimerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

            timerStart: false,
            stopwatchStart: false,
            totalDuration: 90000,
            timerReset: false,
            stopwatchReset: false,
            tickTimes: [],
            newTicktimes: []
        };
        this.toggleTimer = this.toggleTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.toggleStopwatch = this.toggleStopwatch.bind(this);
        this.resetStopwatch = this.resetStopwatch.bind(this);
        this.getTick = this.getTick.bind(this)
        this.testButton = this.testButton.bind(this)
        this.stopRecording = this.stopRecording.bind(this)
    }

    componentDidMount() {
        let audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';

        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: "Low",
            AudioEncoding: "aac",
            MeteringEnabled: true,
        });
    }

    // Note you have access to .pause() and .stop()

    testButton() {
        AudioRecorder.startRecording();
        AudioRecorder.onProgress = data => {
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
            // 0.1355978548526764

            // 2.916689395904541
        };
    }

    stopRecording() {
        AudioRecorder.stopRecording();
        console.log('STOPPED, LOOGED THESE TIMES', this.state.newTicktimes)
    }
    toggleTimer() {
        this.setState({ timerStart: !this.state.timerStart, timerReset: false });
    }

    resetTimer() {
        this.setState({ timerStart: false, timerReset: true });
    }

    toggleStopwatch() {
        this.setState({ stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false });
    }

    resetStopwatch() {
        this.setState({ stopwatchStart: false, stopwatchReset: true });

    }

    getFormattedTime = (time) => {
        this.currentTime = time;

    };



    getTick() {
        this.toggleStopwatch()
        console.log('THIS.CURRENTTIME', this.currentTime)
        this.setState({ tickTimes: [...this.state.tickTimes, this.currentTime] }, function () {

            this.toggleStopwatch()
        })
        // setTimeout(() => { this.toggleStopwatch() }, 1);
        console.log('STATE', this.state)

    }

    render() {
        return (
            <View>
                <Stopwatch laps msecs start={this.state.stopwatchStart}
                    reset={this.state.stopwatchReset}
                    options={options}
                    getTime={(time) => this.getFormattedTime(time)} />

                <Button block onPress={this.toggleStopwatch}>
                    {/* <Icon name='start' /> */}
                    <Text>{!this.state.stopwatchStart ? "Start" : "Stop"}</Text>
                </Button>
                <Button block onPress={this.resetStopwatch}>
                    {/* <Icon name='start' /> */}
                    <Text>Reset</Text>
                </Button>
                <Button block onPress={this.getTick}>
                    {/* <Icon name='start' /> */}
                    <Text>Tick</Text>
                </Button>
                <Button block onPress={this.testButton}>
                    {/* <Icon name='start' /> */}
                    <Text>RECORD</Text>
                </Button>
                <Button block onPress={this.stopRecording}>
                    {/* <Icon name='start' /> */}
                    <Text>STOP</Text>
                </Button>
                {/* todo need to format this shotlist to new data */}
                {this.state.newTicktimes.length > 0 ?
                    this.state.newTicktimes.map(ele => {
                        return <Text style={styles.timeText}>
                            {ele}
                        </Text>
                    })
                    : undefined}
                <ShotList tickTimes={this.state.newTicktimes} />


            </View >
        );
    }
}

const handleTimerComplete = () => alert("custom completion function");

const options = {
    container: {
        backgroundColor: '#000',
        padding: 5,
        borderRadius: 5,
        width: 220,
    },
    text: {
        fontSize: 30,
        color: '#FFF',
        marginLeft: 7,

    }
};