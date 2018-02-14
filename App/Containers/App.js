import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Nav from '../Components/Navigation'
import { Button, Icon, Container, Content } from 'native-base'
import TimerComponent from '../Components/timer'
import styles from './Styles/app_style'
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
        'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

import Navigation from '../Components/Navigation'

export default class App extends Component {

    render() {
        console.disableYellowBox = true;
        return (
            <Container style={styles.container}>
                <Content>

                    <TimerComponent />
                </Content>
            </Container>
            // <Navigation />
        );
    }
}


