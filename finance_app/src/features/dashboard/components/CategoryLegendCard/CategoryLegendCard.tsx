import { Text, View } from 'react-native';
import { styles } from './CategoryLegendCard.styles';
import { useCreateTransactionListStore } from '../../store/useTransactionListStore';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';

export const CategoryLegendCard = () => {

    const { transactionListType } = useCreateTransactionListStore();

    return (
        <View style = {styles.categoryLegendCardContainer}>
            {transactionListType === 'ALL' && (
                <View style = {styles.categoryLegendCardAllContainer}>
                    <View style = {styles.categoryLegendCardIncomeContainer}>
                        <FontAwesome6 name = "arrow-up" size = {fontSize.base} color = {colors.darkerGreen} />
                        <Text style = {styles.transactionTypeLabel}>Income</Text>
                    </View>
                    <View style = {styles.categoryLegendCardIncomeContainer}>
                        <FontAwesome6 name = "money-bill-transfer" size = {fontSize.base} color = {colors.gray[500]} />
                        <Text style = {styles.transactionTypeLabel}>Transfer</Text>
                    </View>
                    <View style = {styles.categoryLegendCardIncomeContainer}>
                        <FontAwesome6 name = "arrow-down" size = {fontSize.base} color = {colors.red} />
                        <Text style = {styles.transactionTypeLabel}>Expense</Text>
                    </View>
                </View>
            )}
            {transactionListType === 'INCOME' && (
                <View style = {styles.categoryLegendCardIncomeContainer}>
                    <FontAwesome6 name = "arrow-up" size = {fontSize.base} color = {colors.darkerGreen} />
                    <Text style = {styles.transactionTypeLabel}>Income</Text>
                </View>
            )}
            {transactionListType === 'EXPENSE' && (
                <View style = {styles.categoryLegendCardIncomeContainer}>
                    <FontAwesome6 name = "arrow-down" size = {fontSize.base} color = {colors.red} />
                    <Text style = {styles.transactionTypeLabel}>Expense</Text>
                </View>
            )}
            {transactionListType === 'TRANSFER' && (
                <View style = {styles.categoryLegendCardIncomeContainer}>
                    <FontAwesome6 name = "money-bill-transfer" size = {fontSize.base} color = {colors.gray[500]} />
                    <Text style = {styles.transactionTypeLabel}>Transfer</Text>
                </View>
            )}
        </View>
    );
};
