import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: fontSize.xxl,
        fontFamily: 'Poppins-SemiBold',
    },
    image: {
        width: 200,
        height: 200,
    },
});
