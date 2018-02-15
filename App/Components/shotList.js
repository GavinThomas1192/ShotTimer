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
            shotTimes: [],
            difference: [],
        }
    }

    componentDidMount() {
        console.log('didMount', this.props.tickTimes)

        this.setState({ shotTimes: this.props.tickTimes })
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps)
        this.setState({ shotTimes: nextProps.tickTimes })
        console.log('state after nextProps', this.state)

    }
    render() {

        return (
            // <Container>
            <View>

                <Text style={styles.timeText}> Result List!</Text>
                <List>
                    {this.props.tickTimes.map((ele, index) => {
                        // let diff/erence;
                        let difference = (ele - this.props.tickTimes[(index - 1)])



                        { Number.isNaN(difference) ? difference = 'None' : difference = difference.toFixed(3) }

                        return <ListItem style={styles.timeText}>
                            <Text>{"Shot " + (index + 1) + " @ " + ele.toFixed(3) + "."}</Text>
                            <Text>{" Difference " + difference}</Text>
                        </ListItem>
                    })}

                </List>
                {/* <Button block onPress={this.calculateDifferences}>
                        <Text>Get Differences</Text>
                    </Button> */}
            </View>
            // </Container>
        );
    }
}


