import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';
import { spacing } from '../../../../styles/spacing';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    title : {
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center',
    },
    subTitle : {
        fontSize: fontSize.base,
        fontFamily: 'Poppins-Regular',
        alignSelf: 'center',
        color: colors.gray[700],
        marginVertical: spacing.sm,
    },
    boldText : {
        fontFamily: 'Poppins-SemiBold',
        color: colors.primary[500],
    },
});
