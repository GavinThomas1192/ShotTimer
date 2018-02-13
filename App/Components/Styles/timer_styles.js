import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,


    container: {
        marginTop: 60,
        // marginVertical: Metrics.baseMargin,
        // flex: 1,
        // backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeText: {
        color: 'black',
        fontSize: 20,
    },
    dateText: {
        color: 'black',
        fontSize: 40,
    }

})
