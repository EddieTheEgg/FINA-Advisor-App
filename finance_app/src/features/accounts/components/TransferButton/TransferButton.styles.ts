import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';
import { spacing } from '../../../../styles/spacing';

export const styles = StyleSheet.create({
    accountQuickActionCardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    actionButton: {
        backgroundColor: colors.gray[50],
        paddingHorizontal: spacing.md,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.gray[200],
    },
    actionText: {
        padding: spacing.lg,
        color: colors.black,
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
});
