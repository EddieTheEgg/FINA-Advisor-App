import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    subscriptionContainer : {
        marginTop: spacing.md,
        backgroundColor: colors.white,
        marginHorizontal: spacing.md,
        borderRadius: 20,
        padding: spacing.md,
    },
    subscriptionTitle : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: spacing.sm,
    },
    subscriptionDetailsContainer : {
        padding: spacing.md,
        backgroundColor: colors.yellowBackground,
        borderRadius: 20,
    },
    subscriptionFrequencyText : {
        color: colors.darkerBackground,
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.base + 1,
    },
    subDescription : {
        color: colors.darkerBackground,
        fontFamily: 'Poppins-Regular',
        fontSize: fontSize.sm,
        fontWeight: Platform.OS === 'ios' ? 500 : 700,
    },
});
