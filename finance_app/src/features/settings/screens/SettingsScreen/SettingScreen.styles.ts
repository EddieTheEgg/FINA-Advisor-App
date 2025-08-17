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
        justifyContent: 'space-between',
        marginHorizontal: spacing.md,
    },
    title : {
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: -spacing.lg,
        marginLeft: spacing.md,
    },
    text: {
        fontSize: fontSize.xxxl,
        fontWeight: 'bold',
        color: colors.black,
        marginLeft: spacing.lg,
    },
});
