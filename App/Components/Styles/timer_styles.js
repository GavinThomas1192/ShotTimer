import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,


    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeText: {
        color: '#999999',
        fontSize: 75,
    },
    dateText: {
        color: '#999999',
        fontSize: 40,
    }

})
