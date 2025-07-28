import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: colors.background,
        position: 'relative',
    },
    scrollView: {
        flex: 1,
    },
    header : {
        marginHorizontal: spacing.md,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle : {
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
    },
    transactionDetailButtonContainer : {
        marginHorizontal: spacing.md,
        flexDirection: 'row',
        gap: spacing.sm,
    },
    editTransactionButtonContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.white,
        paddingTop: spacing.md,
        paddingBottom: spacing.md,
    },
    editTransactionButton: {
        marginHorizontal: spacing.md,
        padding: spacing.md,
        backgroundColor: colors.darkerBackground,
        borderRadius: 10,
    },
    editTransactionButtonText : {
        color: colors.white,
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.lg,
        textAlign: 'center',
        flex: 1,
    },
});
