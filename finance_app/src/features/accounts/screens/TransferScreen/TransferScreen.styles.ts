import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    transferScreenContainer : {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerSection : {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: spacing.md,
        gap: spacing.xxl + 21,
    },
    headerTitle: {
        fontSize: fontSize.xxl,
        fontFamily: 'Poppins-SemiBold',
        color: colors.black,
    },
    fromAccountContainer : {
        backgroundColor: colors.white,
        borderRadius: 20,
        marginHorizontal: spacing.md,
        padding: spacing.md,
        gap: spacing.sm,
    },
    fromAccountTitle: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
});
