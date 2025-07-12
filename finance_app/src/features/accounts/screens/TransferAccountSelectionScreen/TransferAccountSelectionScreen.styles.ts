import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    transferAccountBackground: {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerSection : {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: spacing.md,
        marginVertical: spacing.md,
        gap: spacing.md,
    },
    headerText: {
        fontSize: fontSize.xxl,
        fontFamily: 'Poppins-SemiBold',
        includeFontPadding: false,
        color: colors.black,
    },
    accountListContainer: {
        marginHorizontal: spacing.sm,
    },
});
