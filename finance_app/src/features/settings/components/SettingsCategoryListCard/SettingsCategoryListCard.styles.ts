import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    loadingContainer : {
        marginHorizontal: spacing.md,
    },
    headerSection : {
        flexDirection: 'row',
        backgroundColor: colors.gray[100],
        padding: spacing.md,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'space-between',
        alignItems:'center',
    },
    title : {
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.base,
    },
    subTitle: {
        backgroundColor: colors.white,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        color: colors.gray[500],
        fontFamily: 'Poppins-Medium',
        fontSize: fontSize.sm,
        borderRadius: 30,
    },
    divider : {
        height: 1,
        backgroundColor: colors.gray[100],
    },
    loadingImage: {
        width: 150,
        height: 150,
    },
    loadingIndicatorContainer : {
        backgroundColor: colors.white,
        alignItems: 'center',
        padding: spacing.md,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    loadingText : {
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.lg,
    },
    errorText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.base,
        color: colors.red,
    },
    errorSubText: {
        fontFamily: 'Poppins-Medium',
        fontSize: fontSize.base,
        color: colors.gray[500],
    },
    seperator: {
        height: 1,
        backgroundColor: colors.gray[100],
    },
    loadingMoreText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.base,
    },
    flatListContent: {
        paddingBottom: spacing.xl,
    },
});
