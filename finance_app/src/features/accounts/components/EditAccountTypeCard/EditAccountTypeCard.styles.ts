import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: 20,
        marginHorizontal: spacing.md,
        marginTop: spacing.md,
    },
    accountTypeTitle: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    accountTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        backgroundColor: colors.gray[100],
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: colors.gray[200],
        gap: spacing.sm,
    },
    accountTypeIcon: {
        fontSize: fontSize.lg,
        padding: spacing.sm + 2,
        borderRadius: 10,
    },
    accountTypeTextContainer: {
        alignItems: 'flex-start',
        flex: 2,
    },
    accountTypeText: {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-SemiBold',
    },
    accountSubTypeText: {
        color: colors.gray[500],
        fontFamily: 'Poppins-Medium',
    },
    accountTypeLockIcon: {
        fontSize: fontSize.lg,
    },
    accountTypeDescription: {
        backgroundColor: colors.yellowBackground,
        padding: spacing.md,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.darkerYellow,
        fontSize: fontSize.sm,
        fontFamily: 'Poppins-Regular',
        color: colors.darkerBackground,
        marginTop: spacing.md,
    },

});
