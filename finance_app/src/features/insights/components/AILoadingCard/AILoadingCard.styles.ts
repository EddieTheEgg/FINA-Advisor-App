import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';


export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.purple,
        borderRadius: 20,
    },
    loadingContentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: 20,
        marginLeft: spacing.xs,
        gap: spacing.sm,
    },
    aiIcon : {
        padding: spacing.sm,
        paddingHorizontal: spacing.sm + 2,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.lighterPurple,
        fontSize: fontSize.xxl,
    },
    analyzingText: {
        fontSize: fontSize.base,
        fontFamily : 'Poppins-SemiBold',
    },
    subAnalyzingText : {
        fontSize: fontSize.xs,
        fontFamily: 'Poppins-Regular',
        color: colors.gray[700],
    },
});
