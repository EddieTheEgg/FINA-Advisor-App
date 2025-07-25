import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: colors.background,
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
    editTransactionButton: {
        padding: spacing.md,
        backgroundColor: colors.darkerBackground,
        borderRadius: 10,
        marginHorizontal: spacing.md,
        marginTop: spacing.lg,
    },
    editTransactionButtonText : {
        color: colors.white,
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.lg,
        textAlign: 'center',
        flex: 1,
    },
});
