import { Platform, StyleSheet } from 'react-native';
import { spacing } from '../../../../styles/spacing';
import { colors } from '../../../../styles/colors';

export const styles = StyleSheet.create({
    accountCircleContainer : {
        position: 'relative',
    },
    innerCircleTextContainer : {
        position: 'absolute',
        top: 50,
        left: 40,
        alignItems: 'center',
    },
    innerCircleText: {
        fontFamily: 'Poppins-Bold',
        lineHeight: Platform.OS === 'android' ? 20 : 0,
    },
    separator: {
        height: 1,
        backgroundColor: colors.black,
        marginVertical: spacing.sm,
        width: '100%',
        alignSelf: 'center',
      },
});
