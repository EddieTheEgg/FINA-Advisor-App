import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        marginHorizontal: spacing.md,
        backgroundColor: colors.green,
    },
    budgetContentContainer : {
        backgroundColor: colors.white,
        padding: spacing.md,
        marginLeft: spacing.xs,
        borderRadius: 20,
        gap: spacing.xs,
    },
    budgetTopSectionContainer : {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    budgetIcon: {
        fontSize: fontSize.lg,
        padding: spacing.sm + 2,
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
    budgetCategoryName : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        flex: 1,
    },
    budgetSpentAmountContainer: {
        alignItems: 'flex-end',
    },
    budgetSpentAmount: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    budgetTotalAmount: {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        color: colors.gray[600],
    },
    budgetProgressContainer: {
        height: 10,
        backgroundColor: colors.gray[200],
        borderRadius: 10,
        marginTop: spacing.sm,
    },
    budgetProgress: {
        height: '100%',
        backgroundColor: colors.green,
        borderRadius: 10,
    },
    budgetProgressDetailFooter : {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    percentageUsedText : {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-SemiBold',
    },
    remainingBudgetText : {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
    },
});
