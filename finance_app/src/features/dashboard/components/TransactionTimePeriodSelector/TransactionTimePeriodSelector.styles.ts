import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    dateSelectorContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        gap: spacing.lg,
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    dateSelectorTitle : {
        includeFontPadding: false,
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
});
