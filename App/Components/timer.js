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
        };
        this.toggleTimer = this.toggleTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.toggleStopwatch = this.toggleStopwatch.bind(this);
        this.resetStopwatch = this.resetStopwatch.bind(this);
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

    getFormattedTime(time) {
        this.currentTime = time;
    };

    render() {
        return (
            <View>
                <Stopwatch laps msecs start={this.state.stopwatchStart}
                    reset={this.state.stopwatchReset}
                    options={options}
                    getTime={this.getFormattedTime} />
                <TouchableHighlight onPress={this.toggleStopwatch}>
                    <Text style={{ fontSize: 30, color: "white" }}>{!this.state.stopwatchStart ? "Start" : "Stop"}</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.resetStopwatch}>
                    <Text style={{ fontSize: 30, color: "white" }}>Reset</Text>
                </TouchableHighlight>
                <Timer totalDuration={this.state.totalDuration} msecs start={this.state.timerStart}
                    reset={this.state.timerReset}
                    options={options}
                    handleFinish={handleTimerComplete}
                    getTime={this.getFormattedTime} />
                <TouchableHighlight onPress={this.toggleTimer}>
                    <Text style={{ fontSize: 30, color: "white" }}>{!this.state.timerStart ? "Start" : "Stop"}</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.resetTimer}>
                    <Text style={{ fontSize: 30, color: "white" }}>Reset</Text>
                </TouchableHighlight>
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