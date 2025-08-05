import { Platform, StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
     transactionSubmissionBar: {
        display: 'flex',
        width: '100%',
        paddingBottom: Platform.OS === 'android' ? spacing.lg : spacing.xxl,
        paddingTop: spacing.md,
        justifyContent: 'center',
        backgroundColor: colors.white,
    },
    completeTransactionButton: {
        backgroundColor: colors.darkerBackground,
        paddingVertical: spacing.md,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: spacing.lg,
    },
    completeTransactionButtonText: {
        color: colors.white,
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
    },
    errorContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Regular',
        color: colors.red,
        marginBottom: spacing.sm,
    },
});
