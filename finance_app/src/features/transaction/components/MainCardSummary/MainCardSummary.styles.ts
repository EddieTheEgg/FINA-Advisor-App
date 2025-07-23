import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    mainCardContainer : {
        marginTop: spacing.md,
        backgroundColor: colors.white,
        alignItems: 'center',
        marginHorizontal: spacing.md,
        borderRadius: 20,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    },
    categoryIconContainer: {
        alignSelf: 'center',
        padding: spacing.md,
    },
    categoryIconText : {
        fontSize: fontSize.xxxl * 1.5,
        paddingHorizontal: spacing.md + 4,
        paddingVertical: spacing.md,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    transactionAmount: {
        fontFamily: 'Poppins-Bold',
        includeFontPadding: false,
    },
    incomeAmount: {
        color: colors.darkerGreen,
    },
    expenseAmount : {
        color: colors.red,
    },
    transferAmount : {
        color: colors.gray[600],
    },
    transactionTitle : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        includeFontPadding: false,
    },
    categoryLabel : {
        fontSize: fontSize.lg,
        color: colors.gray[500],
        fontFamily: 'Poppins-Regular',
        includeFontPadding: false,
        fontWeight: Platform.OS === 'android' ? 600 : 500,
    },
    transactionTypeLabel : {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-SemiBold',
        color: colors.gray[500],
        backgroundColor: colors.gray[200],
        paddingHorizontal: spacing.md,
        borderRadius: 20,
        letterSpacing: 0.5,
        marginVertical: spacing.md,
    },
});
