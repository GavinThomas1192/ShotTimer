import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
} from "react-native";
import styles from './Styles/timer_styles'
import KeepAwake from "react-native-keep-awake";
import moment from "moment";
import { Button, Container, Content } from 'native-base'
import { Stopwatch, Timer } from 'react-native-stopwatch-timer'



export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: '',
            time: '',
            timeAtButtonClick: '',
            date: moment().format("LL"),
            toggleStartStop: false,
            buttonText: '',
        };
        this.toggleStartStop = this.toggleStartStop.bind(this)
    }

    componentDidUpdate() {
        this.stopWatch()
    }

    componentDidMount() {
        this.setState({ time: moment().hour(0).minute(0).second(0).format('HH : mm : ss'), timeAtButtonClick: moment().hour(0).minute(0).second(0).format('HH : mm : ss') })
    }

    stopWatch() {
        this.setState({ time: moment().format("mm : ss : SSS") })
    }
    toggleStartStop() {
        this.setState({ toggleStartStop: !this.state.toggleStartStop, timeAtButtonClick: moment().format("mm : ss : SSS") }, function () {

        });
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content>

                    <StatusBar style={{ backgroundColor: 'transparent' }} />
                    <Text style={styles.timeText}>
                        {this.state.time}

                    </Text>
                    <Text style={styles.timeText}>
                        {this.state.timeAtButtonClick}

                    </Text>
                    <Text style={styles.dateText}>
                        {this.state.date}
                    </Text>
                    <Button block onPress={this.toggleStartStop}>
                        {/* <Icon name='start' /> */}
                        <Text>{this.state.toggleStartStop ? 'Stop timer' : 'Start Timer'}</Text>
                    </Button>
                    <KeepAwake />
                </Content>
            </Container>
        )
    }
}