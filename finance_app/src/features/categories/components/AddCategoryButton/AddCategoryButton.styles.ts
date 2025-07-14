import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    addCategoryButton : {
        backgroundColor: colors.darkerBackground,
        padding: spacing.md,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.7,
        shadowRadius: 2,
    },
    buttonText: {
        color: colors.white,
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        includeFontPadding: false,
    },
});
