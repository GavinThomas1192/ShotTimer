import {
    StackNavigator,
} from 'react-navigation';

import TimerScreen from './timer'
import RandomDrillScreen from './RandomDrill'

const Nav = StackNavigator({
    TimerScreen: {
        screen: TimerScreen,
        // navigationOptions: {
        //     headerStyle: {
        //         backgroundColor: 'blue',
        //     },
        //     headerTitleStyle: {
        //         color: 'white',
        //     },
        //     headerBackTitleStyle: {
        //         color: 'white',
        //     },
        //     headerTintColor: 'white',
        // }
    },
    RandomDrillScreen: { screen: RandomDrillScreen }
    // RandomComponent: { screen: RandomComponent },


},
    {
        initialRouteName: 'TimerScreen',
        headerMode: 'none',
    },

);


export default Nav