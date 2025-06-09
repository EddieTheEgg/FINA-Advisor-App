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
        marginHorizontal: spacing.lg,
    },
    greetingText: {
        fontSize: fontSize.base,
        color: colors.gray[500],
        marginLeft: 5, // Poppins font has a built in spacing, so need this minor adjustment
    },
    nameText: {
        fontSize: fontSize.xxl,
        fontWeight: 'bold',
        color: colors.black,
    },

    monthSelectorContainer: {
        marginTop: spacing.md,
    },

    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: fontSize.lg,
        fontWeight: 'bold',
        color: '#FF3B30',
        marginBottom: 8,
    },
    errorSubText: {
        fontSize: fontSize.base,
        color: '#666666',
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
