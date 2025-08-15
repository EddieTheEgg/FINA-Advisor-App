import { colors } from '../../../styles/colors';

export const getBudgetColorStatus = (spentAmount: number, budgetAmount: number): string => {
    const percentageSpent = Math.floor((spentAmount / budgetAmount) * 100);

    if (percentageSpent > 100) {
        return colors.red;
    }
    else if (percentageSpent > 80) {
        return colors.orange;
    }
    else if (percentageSpent > 0) {
        return colors.darkerGreen;
    } else {
        return colors.gray[500];
    }
};
