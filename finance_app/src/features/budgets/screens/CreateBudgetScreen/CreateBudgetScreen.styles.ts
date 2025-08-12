import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';
import { spacing } from '../../../../styles/spacing';

export const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollViewContent : {
        marginHorizontal: spacing.md,
        gap: spacing.md,
    },
    headerRowContainer : {
        flexDirection: 'row',
    },
    headerTitle : {
        includeFontPadding: false,
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
        marginLeft: spacing.xl * 1.3,
    },
});
