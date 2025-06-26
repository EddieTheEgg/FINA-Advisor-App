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
    transactionListContainer: {
    },
    accountDetailsId: {
    },
    transactionListTitle: {
    },
});
