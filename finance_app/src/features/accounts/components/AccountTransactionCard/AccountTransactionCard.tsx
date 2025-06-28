import { View, Text } from 'react-native';
import { AccountTransactionResponse } from '../../types';
import { styles } from './AccountTransactionCard.styles';

type AccountTransactionCardProps = {
    transactionData : AccountTransactionResponse
}


export const AccountTransactionCard = ({transactionData} : AccountTransactionCardProps) => {
    return (
        <View style = {styles.transactionCardContainer}>
            <Text>{transactionData.categorySimplified.icon}</Text>
            <View>
                <Text>{transactionData.title}</Text>
                <Text style = {styles.transactionSubInfoText}>
                    {transactionData.transactionDate} * {transactionData.categorySimplified.categoryName}
                </Text>
            </View>
            <Text>{transactionData.amount}</Text>
        </View>
    );
};
