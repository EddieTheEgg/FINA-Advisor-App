import { StyleSheet } from 'react-native';
import { spacing } from '../../../../../styles/spacing';
import { colors } from '../../../../../styles/colors';
import { fontSize } from '../../../../../styles/fontSizes';

export const styles = StyleSheet.create({
      AccountCardContainer : {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: spacing.md,
        alignItems: 'center',
        gap: spacing.md,
        borderRadius: 20,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
        marginBottom: spacing.xs,
    },
    selectedAccountCard: {
        backgroundColor: colors.gray[200],
    },
    iconContainer: {
        padding: spacing.sm,
        borderRadius: 10,
    },
    iconText: {
        fontSize: fontSize.xxl,
    },
    accountInfoContainer : {
        flex: 2,
    },
    accountNameText : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    accountSubInfoText: {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-SemiBold',
        color: colors.gray[500],
    },
    accountBalanceText : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
});
