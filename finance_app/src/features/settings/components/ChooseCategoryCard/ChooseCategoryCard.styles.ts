import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { colors } from '../../../../styles/colors';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: spacing.md,
        justifyContent: 'space-evenly',
        backgroundColor: colors.white,
        padding: spacing.sm,
        paddingVertical: spacing.md,
        marginHorizontal: spacing.md,
        borderRadius: 20,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    },
});
