import { StyleSheet } from 'react-native';

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
    },
    subBudgetTitle : {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-SemiBold',
    },
    budgetsContainer: {
        marginTop: spacing.md,
        paddingHorizontal: spacing.md,
        flex: 1,
    },
    subBudgetsTitle: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        color: colors.white,
        marginBottom: spacing.sm,
    },
});
