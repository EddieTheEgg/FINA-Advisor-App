import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: spacing.md,
    },
    headerTitle : {
        fontSize: fontSize.xl,
        marginLeft: spacing.sm,
        fontFamily: 'Poppins-SemiBold',
    },
    expenseIncomeContainer : {
        gap: spacing.md,
        marginVertical: spacing.md,
        marginHorizontal: spacing.md,
    },
});
