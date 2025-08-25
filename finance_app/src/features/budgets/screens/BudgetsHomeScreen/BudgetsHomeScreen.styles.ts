import { Platform, StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: fontSize.xxl,
        fontFamily: 'Poppins-SemiBold',
    },
    image: {
        width: 200,
        height: 200,
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
        position: 'relative',
        gap: spacing.md,
    },
    createBudgetButton: {
        position: 'absolute',
        left: spacing.md,
        right: spacing.md,
        bottom: spacing.lg,
        padding: spacing.md,
        backgroundColor: colors.darkerBackground,
        borderRadius: 10,
        alignItems: 'center',
    },
    createBudgetButtonText : {
        color: colors.white,
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.lg,
    },
    budgetTitle : {
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center',
        marginTop: Platform.OS === 'ios' ? 0 : spacing.md,
    },
    subBudgetTitle : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        marginHorizontal: spacing.md,
        marginBottom: spacing.sm,
    },
    budgetsContainer: {
        marginTop: spacing.md,
        flex: 1,
    },
    subBudgetsTitle: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        color: colors.white,
        marginBottom: spacing.sm,
    },
    flatListContent: {
        paddingBottom: spacing.xxl * 5,
    },
    noTransactionsContainer: {
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: 20,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
        marginHorizontal: spacing.md,
    },
    noTransactionsIcon: {
        color: colors.gray[600],
    },
    noTransactionsText: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        color: colors.gray[600],
    },
});
