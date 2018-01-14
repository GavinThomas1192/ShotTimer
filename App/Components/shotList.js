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
            //remove all the colons from formatted times from npm package
            tempTime = ele.replace(/:/g, '')
            tempTimes.push(parseInt(tempTime))

        })).then(() => {
            this.setState({ formattedTimes: tempTimes })
        }).then(() => {
            let final = '';
            //get differences from raw numbers
            for (var i = 0; i < this.state.formattedTimes.length; i++) {
                difference = (this.state.formattedTimes[i + 1] - this.state.formattedTimes[i])
                console.log('what im looking for', difference)
                //add back some decimals to be readable on differences
                final = difference.toString().substring(0, difference.toString().length - 3) + "." + difference.toString().substring(difference.toString().length - 3)
                { isNaN(final) ? undefined : unformattedTimes.push(final) }

            }
        }).then(() => {
            this.setState({ difference: unformattedTimes }, function () {
                console.log('yolo', this.state.difference)
            })
        })

    }
    render() {

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
                            console.log(ele, ele.toString().length, typeof ele)
                            return <ListItem style={styles.timeText}>
                                <Text>{ele + " Seconds"}</Text>
                            </ListItem>

                        })}

                    </List>
                    <Text style={styles.timeText}> Result List!</Text>
                    <List>
                        {this.props.tickTimes.map((ele, index) => {
                            { this.state.difference[index] !== undefined ? dynamicLastText = this.state.difference[index] + " Seconds" : dynamicLastText = "No last shot" }
                            // dynamicLastShotText = {this.state.difference[index] !== undefined ? this.state.difference[index] : "No last shot"}
                            return <ListItem style={styles.timeText}>
                                <Text>{index + ") " + "Shot " + index + " @ " + ele + ". Difference " + dynamicLastText}</Text>
                                {/* <Text>{this.props.tickTimes[index]}</Text> */}
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


