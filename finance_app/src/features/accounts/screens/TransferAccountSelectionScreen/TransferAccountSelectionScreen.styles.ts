import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';

export const styles = StyleSheet.create({
    transferAccountBackground: {
        flex: 1,
        backgroundColor: colors.background,
    },
    accountListContainer: {
        marginTop: spacing.md,
        marginHorizontal: spacing.sm,
    },
});
