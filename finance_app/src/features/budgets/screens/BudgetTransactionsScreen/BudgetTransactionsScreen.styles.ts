import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';
import { spacing } from '../../../../styles/spacing';

export const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: colors.background,
        paddingBottom: 100,
    },
    headerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: spacing.md,
    },
    headerTitle : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    transactionListSection: {
        marginHorizontal: spacing.md,
        backgroundColor: colors.white,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        flex: 1,
    },
    transactionListHeader : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.gray[200],
        marginHorizontal: spacing.md,
        padding: spacing.md,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginTop: spacing.md,
        alignItems: 'center',
    },
    transactionListTitle : {
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.base,
    },
    transactionListSubtitle : {
        color: colors.gray[700],
        backgroundColor: colors.white,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: 25,
        fontFamily: 'Poppins-Medium',
    },
    transactionListSectionContent: {
        padding: spacing.md,
    },
    transactionItem: {
        flexDirection: 'row',
        gap: spacing.sm,
        alignItems: 'center',
    },
    transactionIcon: {
        borderRadius: 15,
        padding: spacing.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    transactionDetails: {
        flex: 2,
        marginRight: spacing.sm,
    },
    transactionTitle: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    transactionDate: {
        fontSize: fontSize.sm,
        color: colors.gray[600],
        fontFamily: 'Poppins-Medium',
    },
    transactionAmount: {
        fontSize: fontSize.lg,
        textAlign: 'right',
        fontFamily: 'Poppins-SemiBold',
    },
    transactionItemSeparator : {
        height: 1,
        backgroundColor: colors.gray[200],
        marginVertical: spacing.md,
    },
    loadingFooter: {
        paddingVertical: spacing.md,
        alignItems: 'center',
    },
    loadingText: {
        color: colors.gray[600],
        fontFamily: 'Poppins-Medium',
        fontSize: fontSize.sm,
    },
});
