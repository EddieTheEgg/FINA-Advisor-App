import { View, Text } from 'react-native';
import { styles } from './TransferBalanceImpactCard.styles';
import { useEditTransactionStore } from '../../../store/useEditTransactionStore';

export const TransferBalanceImpactCard = () => {

    const {sourceAccount, toAccount, amount} = useEditTransactionStore();
    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>Original Transfer</Text>
            <Text style = {styles.description}>These are the original accounts with their respective transfer amount:</Text>
            <View  style = {styles.seperator}/>
            <View style = {styles.accountContainer}>
                <View style = {styles.accountInfo}>
                    <Text style = {styles.accountName}>{sourceAccount?.name}</Text>
                    <Text style = {styles.accountBalance}>+${amount.toFixed(2)}</Text>
                </View>
                <View style = {styles.accountInfo}>
                    <Text style = {styles.accountName}>{toAccount?.name}</Text>
                    <Text style = {styles.accountBalance}>-${amount.toFixed(2)}</Text>
                </View>
            </View>
        </View>
    );
};
