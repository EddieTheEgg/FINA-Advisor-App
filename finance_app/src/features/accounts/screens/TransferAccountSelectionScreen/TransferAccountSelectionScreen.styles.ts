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
        marginBottom: spacing.sm,
        gap: spacing.sm,
    },
    headerText: {
        fontSize: fontSize.xxl,
        fontFamily: 'Poppins-SemiBold',
        color: colors.black,
    },
    accountListContainer: {
        marginTop: spacing.md,
        marginHorizontal: spacing.sm,
    },
});
