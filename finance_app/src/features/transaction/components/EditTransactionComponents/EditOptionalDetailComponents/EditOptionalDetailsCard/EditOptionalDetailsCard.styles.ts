import { StyleSheet } from 'react-native';
import { colors } from '../../../../../../styles/colors';
import { spacing } from '../../../../../../styles/spacing';
import { fontSize } from '../../../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.white,
        padding: spacing.md,
        gap: spacing.sm,
        borderRadius: 20,
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    },
    optionalDetailsText: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        color: colors.black,
    },
});
