import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: spacing.md,
        marginHorizontal: spacing.md,
        marginTop: spacing.md,
        gap: spacing.sm,
    },
    cardTitle: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        color: colors.black,
        marginBottom: spacing.md,
    },
});
