import { StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';
import { colors } from '../../../../styles/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: -spacing.lg,
    },
    text: {
        fontSize: fontSize.xxxl,
        fontWeight: 'bold',
        color: colors.black,
    },
});

