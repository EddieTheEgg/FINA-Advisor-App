import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    filterButtonContainer: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.gray[200],
    },
    activeFilterButton: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        backgroundColor: colors.darkerBackground,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.darkerBackground,
    },
    filterButtonLabel: {
        textAlign: 'center',
        fontSize: fontSize.base,
        fontFamily: 'Poppins-SemiBold',
        color: colors.gray[500],
    },
    activeFilterButtonLabel: {
        color: colors.white,
    },
    filterButtonContent: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    activeFilterButtonContent: {
        color: colors.white,
    },
});
