import { View, Text, Pressable } from 'react-native';
import { AccountResponse } from '../../types';
import { styles } from './AccountCard.styles';

type AccountCardProps = {
    accountItem : AccountResponse
}

export const AccountCard = ({accountItem} : AccountCardProps) => {
    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    };

    const formatBalance = (balance: number) => {
        return balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const capitalizeFirstLetter = (text: string) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    const navAccountDetails = (accountId : string) => {
        console.log(`Navigate to specific account: ${accountId}`);
        // navigation.navigate('AccountDetails', { accountId });
    };


    return (
        <Pressable
        style = {styles.AccountCardContainer}
        onPress = {() => navAccountDetails(accountItem.accountId)}
        >
            <View style = {[styles.iconContainer ,{backgroundColor : accountItem.color}]}>
                <Text style = {styles.iconText}>{accountItem.icon}</Text>
            </View>
            <View style = {styles.accountInfoContainer}>
                <Text style = {styles.accountNameText}>{truncateText(accountItem.name, 15)}</Text>
                <Text style = {styles.accountSubInfoText}>{capitalizeFirstLetter(accountItem.accountType)}</Text>
            </View>
            <View>
                <Text style = {styles.accountBalanceText}>${formatBalance(accountItem.balance)}{'>'}</Text>
            </View>
        </Pressable>
    );
};
