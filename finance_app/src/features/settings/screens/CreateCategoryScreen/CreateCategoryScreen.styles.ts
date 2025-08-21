import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';
import { spacing } from '../../../../styles/spacing';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        gap: spacing.md,
    },
    headerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: spacing.md,
    },
    title: {
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
        marginRight: spacing.sm + 2,
    },
});
