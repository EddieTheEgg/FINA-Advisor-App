import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';

export const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingTop: 20,
        position: 'absolute',
        bottom: 0,
        minHeight: 80,
    },
    indicator: {
        position: 'absolute',
        top: 0,
        left: 5,
        height: 3,
        backgroundColor: colors.darkerBackground,
    },
    iconPressables : {
        flex: 1,
        alignItems: 'center',
    },
    transactionAddButton : {
        backgroundColor: colors.darkerBackground,
        width: 60,
        height: 60,
        borderRadius: 100 / 2 ,
        position: 'absolute',
        top: -spacing.xl,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
