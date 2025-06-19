import { StyleSheet } from 'react-native';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';

export const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: colors.white,
        position: 'absolute',
        height: 80,
        paddingTop: spacing.sm,
        paddingBottom: spacing.sm,
        boxShadow: '0px 5px 10px 2px rgba(0, 0, 0, 0.2)',
    },
    iconBarLine: {
        width: spacing.md * 4,
        height: spacing.xs,
        backgroundColor: colors.darkerBackground,
        position: 'absolute',
        top: -2,
    },
    transactionIconBarLine: {
        width: spacing.md * 4,
        transform: [{ rotate: '135deg' }],
        height: spacing.xs,
        backgroundColor: colors.darkerBackground,
        position: 'absolute',
        bottom: -6,
        left: -spacing.md * -2,
    },
    activeIconContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
    },
    transactionTabContainer: {
        marginTop: -30,
    },
    transactionIconContainer: {
        backgroundColor: colors.black,
        padding: spacing.sm,
        transform: [{ rotate: '45deg' }],
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
    },
    activeTransactionIconContainer: {
        backgroundColor: colors.darkerBackground,
        transform: [{ rotate: '45deg' }],
        padding: spacing.sm,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
    },
});
