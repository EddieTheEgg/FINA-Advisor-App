import { StyleSheet } from 'react-native';
import { fontSize } from '../../../../styles/fontSizes';
import { colors } from '../../../../styles/colors';
import { Platform } from 'react-native';
import { spacing } from '../../../../styles/spacing';


export const styles = StyleSheet.create({

    balanceLabel : {
        fontFamily: 'Poppins-Regular',
        fontSize: fontSize.base,
        color: colors.gray[400],
        lineHeight: Platform.OS === 'android' ? 15 : 20,
    },
    balanceText : {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 2.5 * fontSize.base,
        color: colors.black,
    },
});
