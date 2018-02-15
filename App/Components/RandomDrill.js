import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableHighlight
} from "react-native";
import { Button, Container, Content, List, ListItem, Header, Left, Right, Icon, Body, Title, CheckBox, Form, Picker, Drawer } from 'native-base'
import styles from './Styles/shotList_styles'






export default class RandomDrill extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        console.log('didMount', this.props.tickTimes)

    }

    componentWillReceiveProps(nextProps) {

    }

    handleBackArrow = () => {
        this.props.navigation.navigate('TimerScreen')
    }
    render() {

        return (
            <Container style={{ marginTop: 20 }}>
                <Header style={{ backgroundColor: 'black' }}>
                    <Left>
                        <Button transparent onPress={this.handleBackArrow}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: 'white' }}>Random Fire Drill</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.handleBackArrow}>
                            {/* <Icon name='arrow-back' /> */}
                        </Button>
                    </Right>

                </Header>
                <Text>Hello from Drill</Text>

            </Container>
        );
    }
}


