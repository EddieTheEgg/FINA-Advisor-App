import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';
import { colors } from '../../../../styles/colors';

export const styles = StyleSheet.create({
    container : {
        backgroundColor: colors.green,
        borderRadius: 20,
    },
    contentContainer : {
        backgroundColor: colors.white,
        marginLeft: spacing.xs,
        padding: spacing.md,
        borderRadius: 20,
    },
    headerContainer : {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    icon: {
        padding: spacing.sm,
        paddingHorizontal: spacing.sm + 2,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.lighterGreen,
        fontSize: fontSize.xxl,
    },
    title : {
        fontSize: fontSize.base + 1,
        fontFamily: 'Poppins-SemiBold',
    },
    boldText : {
        color: colors.black,
        fontFamily: 'Poppins-SemiBold',
    },
    detailStats : {
        marginTop: spacing.sm,
        fontFamily: 'Poppins-Regular',
        fontSize: fontSize.base,
        textAlign: 'left',
    },
    analysisText : {
        color: colors.gray[700],
        marginTop: spacing.sm,
        fontFamily: 'Poppins-Regular',
        backgroundColor: colors.gray[100],
        padding: spacing.sm,
        borderRadius: 10,
        textAlign: 'left',
    },
});
