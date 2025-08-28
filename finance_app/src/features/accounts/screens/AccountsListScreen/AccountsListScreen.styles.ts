import { StyleSheet } from 'react-native';
import { fontSize } from '../../../../styles/fontSizes';
import { spacing } from '../../../../styles/spacing';
import { colors } from '../../../../styles/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        position: 'relative',
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: spacing.md,
    },
    headerAccountTitle: {
        fontSize: fontSize.xxxl,
        fontFamily: 'Poppins-SemiBold',
    },
    netWorthCardContainer : {

    },
    accountListContainer: {
        marginTop: spacing.md,
        marginHorizontal: spacing.sm,
    },
    addAccountButton: {
        position: 'absolute',
        bottom: spacing.xxl * 2.2,
        left: spacing.md,
        right: spacing.md,
        borderRadius: 15,
        padding: spacing.md,
        backgroundColor: colors.darkerBackground,
        alignItems: 'center',
    },
    addAccountButtonText: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-Medium',
        color: colors.white,
    },
});
