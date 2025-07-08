import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
     transactionSubmissionBar: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        paddingBottom: spacing.xxl,
        paddingTop: spacing.md,
        justifyContent: 'center',
    },
    completeTransactionButton: {
        backgroundColor: colors.darkerBackground,
        paddingHorizontal: spacing.xxl * 2,
        paddingVertical: spacing.md,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    completeTransactionButtonText: {
        color: colors.white,
        fontSize: fontSize.xl,
        fontWeight: 'bold',
    },
});
