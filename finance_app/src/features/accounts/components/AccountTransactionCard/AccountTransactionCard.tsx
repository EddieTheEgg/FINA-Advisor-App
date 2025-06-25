import { View, Text } from 'react-native';
import { TransactionResponse } from '../../types';


type AccountTransactionCardProps = {
    transactionData : TransactionResponse
}


export const AccountTransactionCard = ({transactionData} : AccountTransactionCardProps) => {
    return (
        <View>
            <Text>{transactionData.title}</Text>
        </View>
    );
};
