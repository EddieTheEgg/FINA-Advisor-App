import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';

export const styles = StyleSheet.create({
    transactionTypeContainer : {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: spacing.md,
        gap: spacing.sm,
        alignSelf: 'center',
        justifyContent: 'center',
    },
});
