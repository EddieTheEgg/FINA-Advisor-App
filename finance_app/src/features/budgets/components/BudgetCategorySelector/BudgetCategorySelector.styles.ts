import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    categorySelectorContainer: {
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: 20,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    },
    categorySelectorTitle : {
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.lg,
        marginBottom: spacing.sm,
    },
    errorText: {
        color: colors.red,
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Regular',
        marginTop: spacing.xs,
        alignSelf: 'center',
    },
});
