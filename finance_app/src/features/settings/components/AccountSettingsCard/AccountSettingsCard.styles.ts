import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { spacing } from '../../../../styles/spacing';
import { fontSize } from '../../../../styles/fontSizes';

export const styles = StyleSheet.create({
    container: {
        padding: spacing.md,
    },
    title : {
        fontFamily: 'Poppins-SemiBold',
        color: colors.gray[500],
        backgroundColor: colors.gray[100],
        padding: spacing.md,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    tabsContainer: {
        backgroundColor: colors.white,
    },
    bottomTabsContainer: {
        backgroundColor: colors.white,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    tab: {
        padding: spacing.md,
        flexDirection: 'row',
        gap: spacing.sm,
        alignItems: 'center',
    },
    icon : {
        padding: spacing.sm + 2,
        fontSize: fontSize.xl,
        borderRadius: 10,
    },
    tabContent: {
        flex: 2,
    },
    tabTitle: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    tabSubtitle : {
        fontFamily: 'Poppins-Medium',
        color: colors.gray[500],
    },
    divider : {
        height: 1,
        backgroundColor: colors.gray[100],
    },
});
