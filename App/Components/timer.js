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
import { Button } from 'native-base'


export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: moment().format("LTS"),
            date: moment().format("LL"),
            toggleStartStop: false
        };
        this.toggleStartStop = this.toggleStartStop.bind(this)
    }

    componentDidUpdate() {
        {
            this.state.toggleStartStop ?
                setTimeout(() => {
                    this.setState({
                        time: moment().format("LTS"),
                        date: moment().format("LL")
                    });
                }, 1000) :
                undefined
        }
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({
        //         time: moment().format("LTS"),
        //         date: moment().format("LL")
        //     });
        // }, 1000);
    }

    toggleStartStop() {
        // console.log('hi')
        this.setState({ toggleStartStop: !this.state.toggleStartStop }, function () {
            setTimeout(() => {
                this.setState({
                    time: moment().format("LTS"),
                    date: moment().format("LL")
                });
            }, 1000);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar style={{ backgroundColor: 'transparent' }} />
                <Text style={styles.timeText}>
                    {this.state.time}
                </Text>
                <Text style={styles.dateText}>
                    {this.state.date}
                </Text>
                <Button block onPress={this.toggleStartStop}>
                    {/* <Icon name='start' /> */}
                    <Text>Start timer</Text>
                </Button>
                <KeepAwake />
            </View>
        )
    }
}