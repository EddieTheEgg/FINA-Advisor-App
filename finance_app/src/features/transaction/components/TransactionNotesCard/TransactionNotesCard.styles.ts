import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';
import { colors } from '../../../../styles/colors';

export const styles = StyleSheet.create({
    transactionNotesCardContainer: {
        backgroundColor: 'white',
        padding: spacing.md,
        borderRadius: 20,
        marginTop: spacing.md,
        marginHorizontal: spacing.md,
    },
    transactionNotesTitle : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    transactionNotesText : {
        backgroundColor: colors.gray[100],
        padding: spacing.md,
        borderRadius: 20,
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Regular',
        color: colors.gray[700],
    },
});
