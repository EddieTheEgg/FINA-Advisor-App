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
        gap: spacing.md,
    },
    iconContainer : {
        borderRadius: 15,
        padding: spacing.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    contentContainer: {
        flex: 2,
        gap: spacing.xs,
    },
    transactionTitle : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
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
        fontSize: fontSize.lg,
        textAlign: 'right',
        fontFamily: 'Poppins-SemiBold',
    },
    incomeAmount: {
        color: colors.darkerGreen,
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
        marginTop: spacing.xs,
    },
    accountText: {
        fontSize: fontSize.sm,
        fontWeight: 500,
        fontFamily: 'Poppins-Regular',
        color: colors.gray[500],
    },
    iconText: {
        fontSize: fontSize.xl,
        padding: spacing.sm + 5,
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
});


