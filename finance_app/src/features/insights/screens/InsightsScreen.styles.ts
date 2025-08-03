import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';
import { fontSize } from '../../../styles/fontSizes';


export const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: colors.background,
    },
    title : {
        fontSize: fontSize.xl,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
    },
});
