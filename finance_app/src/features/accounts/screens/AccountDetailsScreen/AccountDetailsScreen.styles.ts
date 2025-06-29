import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    accountDetailsContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    accountDetailsHeader : {
        display: 'flex',
        flexDirection: 'row',
        gap: spacing.sm,
        alignItems: 'center',
        marginHorizontal: spacing.md,
    },
    accountDetailsTitle: {
        fontSize: fontSize.xxl,
        fontFamily: 'Poppins-SemiBold',
    },
    accountDetailsCardContainer : {
        marginHorizontal: spacing.md,
    },
    transactionListContainer : {
        marginHorizontal: spacing.md,
    },
    transactionHistoryContainer : {
        paddingTop: spacing.sm,
        backgroundColor: colors.white,
        borderRadius: 20,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    },
    accountDetailsId: {
    },
    transactionListTitle: {
        color: colors.black,
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
        marginVertical: spacing.md,
    },
    separator : {
      backgroundColor: colors.gray[200],
      height: 1,
      borderRadius: 12,
      marginVertical: spacing.sm,
    },
});
