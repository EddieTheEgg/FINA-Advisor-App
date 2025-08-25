import { StyleSheet } from 'react-native';

import { colors } from '../../../../../styles/colors';
import { spacing } from '../../../../../styles/spacing';
import { fontSize } from '../../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.lighterGreen,
        borderWidth: 1,
        borderColor: colors.darkerGreen,
        borderRadius: 10,
        padding: spacing.md,
        marginBottom: spacing.md,
        marginHorizontal: spacing.md,
    },
    noteBold: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.sm + 1,
        color: colors.darkerGreen,
    },
    noteText: {
        fontFamily: 'Poppins-Medium',
        color: colors.darkerGreen,
        fontSize: fontSize.sm + 1,
    },
});
