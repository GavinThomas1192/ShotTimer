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


export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secondCounter: 0,
            millisecond: 0,
            time: '',
            date: moment().format("LL"),
            toggleStartStop: false,
            buttonText: '',
        };
        this.toggleStartStop = this.toggleStartStop.bind(this)
        this.stopWatch = this.stopWatch.bind(this)
    }

    componentDidUpdate() {
        {
            this.state.toggleStartStop ?
                // setTimeout(() => {
                //     this.setState({
                //         time: moment().minute(0).second(this.state.secondCounter++).millisecond(0).format('mm : ss : SS'),
                //         date: moment().format("LL")
                //     });
                // }, 1000) :
                this.stopWatch() :
                undefined
        }
    }



    componentDidMount() {
        this.setState({ time: moment().minute(0).second(this.state.secondCounter).millisecond(this.state.millisecond).format('mm : ss : SS') })
    }

    stopWatch() {
        setTimeout(() => {
            this.setState({
                time: moment().minute(0).second(this.state.secondCounter++).millisecond(this.state.millisecond).format('mm : ss : SS'),
            });
        }, 1000)

        setTimeout(() => {
            this.setState({
                time: moment().minute(0).second(this.state.secondCounter).millisecond(this.state.millisecond++).format('mm : ss : SS'),
            });
        }, 10000)
    }
    toggleStartStop() {
        // console.log('hi')
        this.setState({ toggleStartStop: !this.state.toggleStartStop }, function () {
            // setTimeout(() => {
            //     this.setState({
            //         // time: moment().format("LTS"),
            //         secondCounter: this.state.secondCounter++,
            //         date: moment().format("LL")
            //     });
            // }, 1000);
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