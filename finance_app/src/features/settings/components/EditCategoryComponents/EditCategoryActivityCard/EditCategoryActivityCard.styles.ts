import { StyleSheet } from 'react-native';
import { spacing } from '../../../../../styles/spacing';
import { colors } from '../../../../../styles/colors';
import { fontSize } from '../../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.lightBlue,
        marginHorizontal: spacing.md,
        padding: spacing.md,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.darkBlue,
    },
    title : {
        color: colors.darkBlue,
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.base,
        includeFontPadding: false,
    },
    description : {
        fontSize: fontSize.sm,
        marginTop: spacing.sm,
        color: colors.darkBlue,
        fontFamily: 'Poppins-Regular',
        includeFontPadding: false,
    },
    divider : {
        height: 0.5,
        backgroundColor: colors.darkBlue,
        marginVertical: spacing.sm,
    },
    activityInfoSection : {
        gap: spacing.sm + 2,
    },
    activitySection: {
        borderRadius: 10,
    },
    activityContent: {
        marginLeft: spacing.xs,
        borderRadius: 10,
    },
    activityText: {
        padding: spacing.md,
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.base,
    },
    warningText: {
        fontFamily: 'Poppins-Medium',
        fontSize: fontSize.sm,
        color: colors.darkBlue,
    },
});
