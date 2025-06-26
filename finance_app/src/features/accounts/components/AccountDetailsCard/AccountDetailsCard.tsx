import { View, Text } from 'react-native';
import { AccountResponse } from '../../types';
import { styles } from './AccountDetailsCard.styles';

export const AccountDetailsCard = ({accountDetails} : {accountDetails: AccountResponse}) => {

    // Format the balance to be a string with 2 decimal places
    const formatBalance = (balance: number) => {
        return balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    // Format the account type to be capitalized and have spaces between the words
    const formatAccountType = (accountType: string) => {
        return accountType.replace(/_/g, ' ')
        .split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    };

    return (
        <View style = {styles.accountDetailsCardContainer}>
            <Text style = {[styles.accountDetailsCardIcon, {backgroundColor: accountDetails.color}]}>{accountDetails.icon}</Text>
            <Text style = {styles.accountDetailsCardBalance}>${formatBalance(accountDetails.balance)}</Text>
            <Text style = {styles.accountDetailsCardBalanceSubText}>Current Balance</Text>
            <View style = {styles.lineDivider} />
            <View style = {styles.accountDetailsInfoRow}>
                <View style = {styles.detailsColumn}>
                    <Text style = {styles.detailsColumnTitle}>ACCOUNT{'\n'}TYPE</Text>
                    <Text style = {styles.detailsColumnValue}>{formatAccountType(accountDetails.accountType)}</Text>
                </View>
                {accountDetails.bankName ? (
                    <View style = {styles.detailsColumn}>
                        <Text style = {styles.detailsColumnTitle}>BANK{'\n'}NAME</Text>
                        <Text style = {styles.detailsColumnValue}>{accountDetails.bankName}</Text>
                    </View>
                ) : null}
                <View style = {styles.detailsColumn}>
                    <Text style = {styles.detailsColumnTitle}>LAST{'\n'}UPDATED</Text>
                    {accountDetails.updatedAt ? (
                        <Text style = {styles.detailsColumnValue}>{accountDetails.updatedAt}</Text>
                    ) : (
                        <Text style = {styles.detailsColumnValue}>{accountDetails.createdAt}</Text>
                    )}
                </View>
            </View>
        </View>
    );
};
