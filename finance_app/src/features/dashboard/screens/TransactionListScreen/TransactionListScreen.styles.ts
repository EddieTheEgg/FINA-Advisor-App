import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: spacing.md,
    },
    title: {
        includeFontPadding: false,
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
    },
    transactionListSelector: {
        borderRadius: 20,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
        backgroundColor: colors.white,
        marginHorizontal: spacing.md,
        marginVertical: spacing.md,
    },
    loadingDots: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center',
        marginBottom: spacing.md,
    },
    transactionList: {
        backgroundColor: colors.white,
        marginHorizontal: spacing.md,
        borderRadius: 20,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
        marginBottom: spacing.xxl,
    },
    selectorDivider: {
        height: 1,
        backgroundColor: colors.gray[200],
        marginVertical: spacing.xs,
    },
});
