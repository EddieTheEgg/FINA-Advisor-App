import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        position: 'relative',
    },
    createBudgetButton: {
        position: 'absolute',
        left: spacing.md,
        right: spacing.md,
        bottom: spacing.lg * 4,
        padding: spacing.md,
        backgroundColor: colors.darkerBackground,
        borderRadius: 10,
        alignItems: 'center',
    },
    createBudgetButtonText : {
        color: colors.white,
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.lg,
    },
});
