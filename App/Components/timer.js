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


export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: moment().format("LTS"),
            date: moment().format("LL")
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                time: moment().format("LTS"),
                date: moment().format("LL")
            });
        }, 1000);
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

                <KeepAwake />
            </View>
        )
    }
}