import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';
import { spacing } from '../../../../styles/spacing';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: spacing.md,
    },
    headerText: {
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: spacing.xxl * 2,
    },
});
