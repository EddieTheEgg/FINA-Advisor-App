import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    sortOrderSelectorContainer: {
        display: 'flex',
        gap: spacing.sm,
        marginVertical: spacing.md,
    },
    filterButtonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
    },
    sortOrderLabel: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
});
