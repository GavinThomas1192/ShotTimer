import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,


    container: {
        marginTop: 60,
        // marginVertical: Metrics.baseMargin,
        // flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeText: {
        color: '#999999',
        fontSize: 50,
    },
    dateText: {
        color: '#999999',
        fontSize: 40,
    }

})
