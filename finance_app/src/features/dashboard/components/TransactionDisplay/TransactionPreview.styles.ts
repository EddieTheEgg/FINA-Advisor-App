import { Platform, StyleSheet } from 'react-native';
import { fontSize } from '../../../../styles/fontSizes';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';


export const styles = StyleSheet.create({
    transactionItemContainer : {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.xs,
    },
    iconContainer : {
        borderRadius: 15,
        padding: spacing.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    transactionTitle : {
        fontSize: fontSize.base,
        fontWeight: '600',
        color: colors.black,
    },
    accountName: {
        fontSize: fontSize.sm,
        backgroundColor: colors.gray[100],
        color: colors.gray[600],
        paddingHorizontal: spacing.sm,
        borderRadius: 10,
        fontFamily: 'Poppins-Regular',
    },
    transactionAmount: {
        fontSize: fontSize.base,
        textAlign: 'right',
        fontFamily: 'Poppins-SemiBold',
    },
    incomeAmount: {
        color: colors.green,
    },
    expenseAmount: {
        color: colors.red,
    },
    transferAmount: {
        color: colors.gray[600],
    },
    subDescBar: {
        flexDirection: 'row',
        alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
        gap: spacing.xs,
    },
    accountText: {
        fontSize: fontSize.sm,
        color: colors.gray[600],
    },
    iconText: {
        fontSize: 24,
    },
});

