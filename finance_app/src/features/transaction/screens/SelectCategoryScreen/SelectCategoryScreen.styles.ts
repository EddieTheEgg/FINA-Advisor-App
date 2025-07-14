import { Platform, StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';
import { colors } from '../../../../styles/colors';

export const styles = StyleSheet.create({
    categoryScreenContainer : {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerSection : {
        display: 'flex',
        flexDirection: 'row',
        gap: spacing.md,
        alignItems: 'center',
        marginHorizontal: spacing.md,
        marginVertical: spacing.sm,
    },
    title : {
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
        includeFontPadding: false,
    },
    categoryListContainer : {
        flex: 1,
        marginHorizontal: spacing.md,
    },
    addCategoryButtonContainer : {
        position: 'absolute',
        left: spacing.md,
        right: spacing.md,
        marginBottom: Platform.OS === 'android' ? spacing.lg : 0,
        zIndex: 1,
    },
});
