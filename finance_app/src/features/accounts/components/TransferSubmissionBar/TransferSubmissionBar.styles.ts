import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    transferSubmissionBar: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingBottom: spacing.xxl,
        paddingTop: spacing.md,
        justifyContent: 'center',
        backgroundColor: colors.white,
    },
    errorContainer: {
        marginBottom: spacing.sm,
        alignItems: 'center',
    },
    errorText: {
        color: colors.red,
        fontSize: fontSize.base,
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
    },
    completeTransferButton: {
        backgroundColor: colors.darkerBackground,
        paddingHorizontal: spacing.xxl,
        marginHorizontal: spacing.md,
        paddingVertical: spacing.md,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    completeTransferButtonText: {
        color: colors.white,
        fontSize: fontSize.xl,
        fontWeight: 'bold',
    },
});
