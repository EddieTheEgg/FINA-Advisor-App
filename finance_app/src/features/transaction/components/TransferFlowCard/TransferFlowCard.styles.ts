import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    transferFlowMainContainer: {
        backgroundColor: colors.white,
        marginHorizontal: spacing.lg,
        marginTop: spacing.md,
        padding: spacing.md,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    transferFlowTitle: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        color: colors.dark_grey,
        marginBottom: spacing.md,
    },
    transferFlowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    transferAccountContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.gray[50],
        padding: spacing.md,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: colors.gray[200],
        maxWidth: '42%',
        height: '100%',
    },
    transferAccountIcon: {
        fontSize: fontSize.xl,
        padding: spacing.md,
        borderRadius: 12,
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    transferAccountName: {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-SemiBold',
        color: colors.secondary,
        textAlign: 'center',
        marginBottom: spacing.xs,
    },
    transferAccountType: {
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        color: colors.gray[600],
        textAlign: 'center',
    },
    arrowContainer: {
        paddingHorizontal: spacing.xs,
        justifyContent: 'center',
        alignItems: 'center',
        width: '16%',
    },
});
