import { Platform, StyleSheet } from 'react-native';

import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';
import { colors } from '../../../../styles/colors';

export const styles = StyleSheet.create({
    transferDetailsCardContainer : {
        marginHorizontal: spacing.md,
        marginTop: spacing.md,
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: 20,
         boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    },
    lineSeperator : {
        height: 1,
        backgroundColor: colors.gray[300],
    },
    transferDetailsTitle : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    transferDetailsLabel: {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Regular',
        color: colors.gray[500],
        fontWeight: Platform.OS === 'android' ? 'bold' : 600,
    },
    transferDetailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.sm,
    },
    iconStyling : {
        padding: spacing.sm,
        borderRadius: 10,
    },
    transferDetailInfoText : {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-SemiBold',
    },
});
