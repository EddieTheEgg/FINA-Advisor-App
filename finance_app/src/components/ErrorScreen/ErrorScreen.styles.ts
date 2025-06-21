import { StyleSheet } from 'react-native';
import { fontSize } from '../../styles/fontSizes';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
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
});
