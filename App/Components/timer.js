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
import moment from "moment";
import { Button, Container, Content } from 'native-base'
import { Stopwatch, Timer } from 'react-native-stopwatch-timer'



export default class TimerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

            timerStart: false,
            stopwatchStart: false,
            totalDuration: 90000,
            timerReset: false,
            stopwatchReset: false,
            tickTime: '',
        };
        this.toggleTimer = this.toggleTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.toggleStopwatch = this.toggleStopwatch.bind(this);
        this.resetStopwatch = this.resetStopwatch.bind(this);
        this.getTick = this.getTick.bind(this)
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
        // console.log(time)
        // { !this.state.stopwatchStart ? console.log('paused time?', time) : console.log(time) }
        // { !this.state.stopwatchStart ? this.tickedtime = time : console.log(time) }
    };



    getTick() {
        this.toggleStopwatch()
        console.log('THIS.CURRENTTIME', this.currentTime)
        this.setState({ tickTime: this.currentTime })
        setTimeout(() => { this.toggleStopwatch() }, 10);
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
                    <Text>Tick?</Text>
                </Button>


            </View>
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