import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { Platform } from 'react-native';



export const styles = StyleSheet.create({

    balanceLabel : {
        fontFamily: 'Poppins-Regular',
        color: colors.gray[400],
        lineHeight: Platform.OS === 'android' ? 15 : 20,
    },
    balanceText : {
        fontFamily: 'Poppins-SemiBold',
        color: colors.black,
    },
    balanceCardRow: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      },
    accountCircleContainer: {
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
