import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    backgroundContainer: {
        borderRadius: 20,
    },
    actualContentContainer : {
        backgroundColor: colors.white,
        padding: spacing.md,
        marginLeft: spacing.xs,
        borderRadius: 20,
        alignItems: 'center',
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    },
    budgetIcon: {
        fontSize: fontSize.xxxl * 1.5,
        paddingHorizontal: spacing.md + 4,
        paddingVertical: spacing.md,
        borderRadius: 20,
    },
    budgetAmount : {
        fontFamily: 'Poppins-Bold',
        includeFontPadding: false,
    },
    budgetTitle : {
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
        includeFontPadding: false,
    },
    budgetPeriod: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-Medium',
        color: colors.gray[500],
        includeFontPadding: false,
    },
    percentageUsedText: {
        fontFamily: 'Poppins-Medium',
        fontSize: fontSize.base,
        marginTop: spacing.md,
        color: colors.white,
        padding: spacing.sm,
        borderRadius: 30,
        paddingHorizontal: spacing.md,
        includeFontPadding: false,
    },
});
