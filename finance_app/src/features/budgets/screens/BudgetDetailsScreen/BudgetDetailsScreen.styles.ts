import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollViewContent : {
        marginHorizontal: spacing.md,
        gap: spacing.md,
    },
    headerSection: {
        flexDirection: 'row',
        marginTop: Platform.OS === 'android' ? spacing.sm : 0,
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.xl,
    },
});
