import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';
import { fontSize } from '../../../styles/fontSizes';
import { spacing } from '../../../styles/spacing';

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: spacing.md,
        marginHorizontal: spacing.md,
    },
    greetingText: {
        marginLeft: spacing.sm,
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-Regular',
    },
    nameText: {

        fontSize: fontSize.xxl,
        fontFamily: 'Poppins-SemiBold',
    },
});
