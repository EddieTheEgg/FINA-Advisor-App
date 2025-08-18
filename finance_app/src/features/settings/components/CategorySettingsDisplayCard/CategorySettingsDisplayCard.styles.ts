import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/colors";
import { spacing } from "../../../../styles/spacing";
import { fontSize } from "../../../../styles/fontSizes";

export const styles = StyleSheet.create({
    container : {
        backgroundColor: colors.white,
        padding: spacing.md,
        flexDirection: 'row',
        gap: spacing.sm,
        alignItems: 'center',
        alignContent: 'flex-start',
    },
    categoryIcon: {
        fontSize: fontSize.xl,
        padding: spacing.sm + 5,
        borderRadius: 15,
        alignSelf: 'flex-start',
    },
    categoryTextContainer: {
        flex: 2,
    },
    categoryName: {
        fontSize: fontSize.lg,
        fontFamily: 'Poppins-SemiBold',
    },
    categoryDescription: {
        fontSize: fontSize.sm,
        color: colors.gray[500],
        fontFamily: 'Poppins-Medium',
    },
    usedInTransactions: {
        backgroundColor: colors.lighterGreen,
        color: colors.darkerGreen,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: 30,
        alignSelf: 'flex-start',
        fontSize: fontSize.xs,
        fontFamily: 'Poppins-Medium',
    },
    editButton: {
        backgroundColor: colors.darkerBackground,
        color: colors.white,
        fontFamily: 'Poppins-SemiBold',
        fontSize: fontSize.sm,
        paddingHorizontal: spacing.sm + 2,
        paddingVertical: spacing.xs,
        borderRadius: 10,
    },
});
