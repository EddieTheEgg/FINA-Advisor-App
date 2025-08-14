import { StyleSheet } from 'react-native';
import { fontSize } from '../../../../styles/fontSizes';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';

export const styles = StyleSheet.create({
    container : {
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: 20,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    },
    budgetProgressTitle: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    statRowContainer : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: spacing.md,
    },
    spentContainer : {
        alignItems: 'center',
    },
    spentAmount : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        includeFontPadding: false,
    },
    spentLabel : {
        fontFamily: 'Poppins-Medium',
        color: colors.gray[500],
        includeFontPadding: false,
    },
    progressBarContainer : {
        height: 20,
        borderRadius: 20,
        backgroundColor: colors.gray[200],
    },
    progressBar : {
        height: '100%',
        borderRadius: 20,
    },
    progressDetailContainer : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: spacing.sm,
    },
    percentageUsedText : {
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.sm,
    },
    remainingBudgetText : {
        fontFamily: 'Poppins-Medium',
        fontSize: fontSize.sm,
    },
});
