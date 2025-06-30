import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';
import { spacing } from '../../../../styles/spacing';

export const styles = StyleSheet.create({
    actionButton: {
        backgroundColor: colors.darkerBackground,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        padding: spacing.lg,
    },
    actionText: {
        color: colors.white,
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
});
