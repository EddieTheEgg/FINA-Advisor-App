import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../../../../styles/colors';
import { spacing } from '../../../../../styles/spacing';
import { fontSize } from '../../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    transferAmountCardContainer : {
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: 20,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
        marginHorizontal: spacing.md,
        marginTop: spacing.md,
        gap: spacing.sm,
    },
    transferAmountTitle : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    inputTextContainer : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    inputContainer : {
        display: 'flex',
        alignItems: 'center',
    },
    input : {
        color: colors.darkerBackground,
        fontFamily: 'Poppins-SemiBold',
        includeFontPadding: false,
        fontSize: fontSize.xxxxl,
        paddingTop: spacing.xs,
    },
      inputText : {
        color: colors.darkerBackground,
        fontFamily: 'Poppins-SemiBold',
        includeFontPadding: false,
        fontSize: fontSize.xxxxl,
        paddingTop: spacing.xs + 1,
    },
    subText : {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-SemiBold',
        color: colors.gray[600],
        marginTop: Platform.OS === 'android' ? -spacing.sm : 0,
    },
    errorText : {
        fontFamily: 'Poppins-Regular',
        fontSize: fontSize.base,
        textAlign: 'center',
        color: 'red',
    },
    updatedBudgetImpactContainer : {
        backgroundColor: colors.gray[200],
        padding: spacing.md,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.gray[400],
        gap: spacing.sm,
    },
    updateBudgetImpactTitle : {
        fontSize: fontSize.sm + 1,
        fontFamily: 'Poppins-SemiBold',
    },
    rowSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowTitle : {
        fontFamily: 'Poppins-Medium',
        color: colors.gray[700],
    },
    rowValue : {
        fontFamily: 'Poppins-SemiBold',
        color: colors.black,
    },
    newProgressText : {
        fontSize: fontSize.sm + 1,
        fontFamily: 'Poppins-SemiBold',
    },
    progressBarContainer : {
        width: '100%',
        height: 10,
        backgroundColor: colors.gray[300],
        borderRadius: 5,
    },
    progressBar : {
        height: '100%',
        backgroundColor: colors.darkerGreen,
        borderRadius: 5,
    },
});
