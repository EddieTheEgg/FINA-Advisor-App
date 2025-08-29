import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: spacing.sm,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input:{
        backgroundColor: colors.gray[50],
        borderRadius: 10,
        padding: spacing.sm,
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Regular',
        color: colors.black,
        borderWidth: 2,
        borderColor: colors.gray[200],
    },
    charCounter: {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Regular',
    },
    charCounterWarning: {
        color: colors.red,
    },
    headerText: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        includeFontPadding: false,
    },
    errorText: {
        color: colors.red,
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Regular',
        marginTop: spacing.xs,
    },
    accountNameError: {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        color: colors.red,
    },
});
