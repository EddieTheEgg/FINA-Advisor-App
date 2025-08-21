import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerSection : {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: spacing.md,
        justifyContent: 'space-between',
    },
    title : {
        fontSize: fontSize.xl,
        marginLeft: spacing.md,
        fontFamily: 'Poppins-SemiBold',
    },
    addCategoryIcon : {
        backgroundColor: colors.darkerBackground,
        padding: spacing.sm,
        paddingHorizontal: spacing.sm + 2,
        borderRadius: 30,
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.1)',
    },
});
