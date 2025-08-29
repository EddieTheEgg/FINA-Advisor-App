import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        padding: spacing.md,
        marginHorizontal: spacing.md,
        borderRadius: 20,
        marginTop: spacing.md,
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.2)',
        gap: spacing.md,
    },
    title : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
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
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    negativeText: {
        color: colors.darkerBackground,
        fontFamily: 'Poppins-SemiBold',
        includeFontPadding: false,
        fontSize: fontSize.xxxxl,
        paddingTop: spacing.xs + 1,
    },
    inputAmount: {
        color: colors.darkerBackground,
        fontFamily: 'Poppins-SemiBold',
        includeFontPadding: false,
        fontSize: fontSize.xxxxl,
        paddingTop: spacing.xs + 1,
        alignSelf: 'center',
    },
    accountBalanceText: {
        fontSize: fontSize.base,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
        includeFontPadding: false,
    },
    errorText: {
        color: colors.red,
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Regular',
        marginTop: spacing.xs,
        alignSelf: 'center',
    },
    accountNameError: {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        color: colors.red,
    },
    infoContainer: {
        backgroundColor: colors.lightBlue,
        padding: spacing.md,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.darkBlue,
        marginVertical: spacing.md,
    },
    infoText: {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        color: colors.darkBlue,
    },
    infoTextBold: {
        fontFamily: 'Poppins-SemiBold',
    },

});
