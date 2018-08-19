import {
    StackNavigator,
} from 'react-navigation';

import TimerScreen from './timer'
import RandomDrillScreen from './RandomDrill'
import HomeScreen from './HomeScreen'
import CalibrateMicrophoneScreen from './CalibrateMicrophoneScreen'
import HistoryScreen from './HistoryScreen'
const Nav = StackNavigator({
    TimerScreen: {
        screen: TimerScreen
    },
    RandomDrillScreen: { screen: RandomDrillScreen },
    HomeScreen: { screen: HomeScreen },
    CalibrateMicrophoneScreen: { screen: CalibrateMicrophoneScreen },
    HistoryScreen: { screen: HistoryScreen },
},
    {
        initialRouteName: 'HomeScreen',
        headerMode: 'none',
    },

);


export default Nav