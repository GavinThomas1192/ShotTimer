import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableHighlight, ScrollView
} from "react-native";
import { Container, Content, List, ListItem, Button } from 'native-base'
import styles from './Styles/shotList_styles'



// const stagingPool = []

export default class ShotList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shotTimes: [],
            difference: [],
            completeTimeObject: [],
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
        // this.props.updateHome(stagingPool)
    }

    componentDidUpdate() {
    }

    render() {
        const stagingPool = []
        return (
            // <Container>
            // <View >

            <ScrollView
                ref={listView => { this.listView = listView; }}
            >


                <Text style={styles.timeText}> Result List!</Text>
                <List style={{ flex: 0 }}>
                    {this.props.tickTimes.map((ele, index) => {
                        // let diff/erence;
                        let difference = (ele - this.props.tickTimes[(index - 1)])



                        { Number.isNaN(difference) ? difference = 'None' : difference = difference.toFixed(3) }

                        this.listView.scrollToEnd()

                        let concatedObject = { shotTime: ele.toFixed(3), shotDifference: difference }

                        stagingPool.push(concatedObject)
                        this.props.updateHome(stagingPool)

                        // this.setState({ completeTimeObject: [...this.state.completeTimeObject, [concatedObject]] })

                        console.log('YOLOBATMONKEYS', stagingPool)


                        return <ListItem style={styles.timeText}>
                            <Text>{"Shot " + (index + 1) + " @ " + ele.toFixed(3) + "."}</Text>
                            <Text>{" Difference " + difference}</Text>
                        </ListItem>
                    })}

                </List>


            </ScrollView >
            // </View>
            // </Container>
        );
    }
}


