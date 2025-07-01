import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';
import { spacing } from '../../../../styles/spacing';

export const styles = StyleSheet.create({
    actionButton: {
        backgroundColor: colors.gray[50],
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.gray[200],
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        justifyContent: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    actionText: {
        color: colors.black,
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
});
