import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { fontSize } from '../../styles/fontSizes';
import { spacing } from '../../styles/spacing';

const styles = StyleSheet.create({
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
        marginLeft: spacing.lg,
    },
});

export default styles;
