import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableHighlight
} from "react-native";
import styles from './Styles/shotList_styles'






export default class ShotList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View>
                <Text style={styles.timeText}>Hello from shot list</Text>


            </View>
        );
    }
}


