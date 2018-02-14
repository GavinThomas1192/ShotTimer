import {
    StackNavigator,
} from 'react-navigation';

import TimerScreen from './timer'

const Nav = StackNavigator({
    TimerScreen: { screen: TimerScreen },
    // RandomComponent: { screen: RandomComponent },


},
    {
        initialRouteName: 'TimerScreen',
        headerMode: 'none',
    }
);


export default Nav