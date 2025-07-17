import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';
import { colors } from '../../../../styles/colors';

export const styles = StyleSheet.create({
    backgroundContainer : {
        display: 'flex',
        flex: 1,
        backgroundColor: colors.background,
    },
    header : {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: spacing.md,
        alignItems: 'center',
        gap: spacing.xxl + 19,
        marginBottom: spacing.sm,
    },
    title : {
        includeFontPadding: false,
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
    },
    transactionTypeContainer : {
        marginHorizontal: spacing.md,
    },
    expenseSection : {
        gap: spacing.md,
        marginVertical: spacing.md,
        marginHorizontal: spacing.md,
    },
});
