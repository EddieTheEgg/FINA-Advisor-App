import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: 20,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    },
    title : {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: spacing.md,
    },
    sectionRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sectionTitle: {
        fontSize: fontSize.base,
        color: colors.gray[500],
        fontFamily: 'Poppins-Medium',
    },
    sectionValue: {
        fontSize: fontSize.base,
        color: colors.black,
        fontFamily: 'Poppins-SemiBold',
    },
    separator : {
        height: 1,
        backgroundColor: colors.gray[200],
        marginVertical: spacing.sm + 5,
    },
});
