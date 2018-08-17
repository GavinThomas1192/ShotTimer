import React, { Component } from "react";
import {
  Text,
  ScrollView
} from "react-native";
import {List, ListItem } from 'native-base'
import styles from './Styles/shotList_styles'

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
    this.setState({ shotTimes: this.props.tickTimes })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ shotTimes: nextProps.tickTimes })
  }
  
  renderShotList() {
    const stagingPool = []
    return (
      this.props.tickTimes.map((times, index) => {
        let difference = (times - this.props.tickTimes[(index - 1)])
        Number.isNaN(difference) ? difference = 'None' : difference = difference.toFixed(3) 
        let concatedObject = { shotTime: times.toFixed(3), shotDifference: difference }
        stagingPool.push(concatedObject)
        this.props.updateHome(stagingPool)
        return (
          <ListItem style={styles.timeText} key={index}>
            <Text>{"Shot " + (index + 1) + " @ " + times.toFixed(3) + "."}</Text>
            <Text>{" Difference " + difference}</Text>
          </ListItem>
        )
      })
    )
  }

  render() {
    return (
      <ScrollView>
        <Text style={styles.timeText}> Result List!</Text>
        <List style={{ flex: 0 }}>
          {this.renderShotList()}
        </List>
      </ScrollView >
    );
  }
}
