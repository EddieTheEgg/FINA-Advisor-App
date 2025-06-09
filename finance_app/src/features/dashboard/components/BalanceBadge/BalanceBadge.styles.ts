import {Platform, StyleSheet} from 'react-native';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';
import { spacing } from '../../../../styles/spacing';

export const styles = StyleSheet.create({
     badge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.sm,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    positiveBadge: {
        backgroundColor: colors.green,
    },

    negativeBadge: {
        backgroundColor: colors.red,
    },
    badgeText: {
        color: '#FFFFFF',
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.sm,
        lineHeight: Platform.OS === 'android' ? 15 : 20,
    },

});
