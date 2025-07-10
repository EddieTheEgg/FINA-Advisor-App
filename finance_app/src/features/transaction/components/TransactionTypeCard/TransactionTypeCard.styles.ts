import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container : {
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: 20,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    },
    title : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        includeFontPadding: false,
    },
    transactionTypeContainer : {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: spacing.md,
        justifyContent: 'space-evenly',
    },
});
