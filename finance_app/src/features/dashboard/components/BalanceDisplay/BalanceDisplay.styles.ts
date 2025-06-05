import { StyleSheet } from 'react-native';
import { fontSize } from '../../../../styles/fontSizes';
import { colors } from '../../../../styles/colors';


export const styles = StyleSheet.create({
    balanceLabel : {
        fontFamily: 'poppins-regular',
        fontSize: fontSize.base,
        color: colors.gray[400],
    },
    balanceText : {
        fontFamily: 'poppins-semibold',
        fontSize: 2.5 * fontSize.base,
        color: colors.black,
    },
});
