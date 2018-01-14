import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableHighlight
} from "react-native";
import { Container, Content, List, ListItem, Button } from 'native-base'
import styles from './Styles/shotList_styles'






export default class ShotList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formattedTimes: [],
            difference: [],
        }
        this.calculateDifferences = this.calculateDifferences.bind(this)
    }

    calculateDifferences() {
        let tempTimes = []
        let difference = 0
        let unformattedTimes = []

        Promise.all(this.props.tickTimes.map(ele => {
            tempTime = ele.replace(/:/g, '')
            // console.log('heerrrr', parseInt(ele))
            tempTimes.push(parseInt(tempTime))
        })).then(() => {
            this.setState({ formattedTimes: tempTimes })
        }).then(() => {

            for (var i = 0; i < this.state.formattedTimes.length; i++) {
                difference = (this.state.formattedTimes[i + 1] - this.state.formattedTimes[i])
                console.log('what im looking for', difference)
                { isNaN(difference) ? undefined : unformattedTimes.push(difference) }
                // console.log(this.state.formattedTimes[i])
                // let addedZeros = ("000000" + difference)
                // console.log('addedzeros', addedZeros)
            }
        }).then(() => {
            this.setState({ difference: unformattedTimes }, function () {
                console.log('yolo', this.state.difference)
            })
        })

    }
    render() {
        // console.log(this.props)
        return (
            <Container>
                <Content>
                    <List>
                        {this.props.tickTimes.map(ele => {
                            return <ListItem style={styles.timeText}>
                                <Text>{ele}</Text>
                            </ListItem>
                        })}

                    </List>
                    <Text style={styles.timeText}> Differences!</Text>
                    <List>

                        {this.state.difference.map(ele => {
                            return <ListItem style={styles.timeText}>
                                <Text>{ele}</Text>
                            </ListItem>
                        })}

                    </List>
                    <Button block onPress={this.calculateDifferences}>
                        {/* <Icon name='start' /> */}
                        <Text>Get Differences</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}


