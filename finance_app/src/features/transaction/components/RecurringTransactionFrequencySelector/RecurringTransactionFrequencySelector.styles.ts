import { Platform, StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    frequencyContainer: {
        flexDirection: 'column',
        width: '100%',
    },
    frequencyTitle: {
        fontSize: fontSize.base,
        includeFontPadding: false,
        fontFamily: 'Poppins-SemiBold',
        color: colors.black,
        marginBottom:  Platform.OS === 'ios' ? -spacing.xxl : 0,
    },
    picker: {
        width: '100%',
        color: colors.black,
        backgroundColor: 'transparent',
    },
    pickerItem: {
        color: colors.black,
        fontSize: fontSize.lg,
    },
});
