import { View, Text } from 'react-native';
import { AccountResponse } from '../../types';
import { styles } from './AccountCard.styles';
import { AccountNavigatorProps } from '../../../../navigation/types/AccountNavigatorTypes';
import { useTransferStore } from '../../store/useTransferStore';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';

type AccountCardProps = {
    accountItem : AccountResponse
    navigation : AccountNavigatorProps
    transferAccountCard?: boolean
    selectionType?: 'from' | 'to'
}

export const AccountCard = ({accountItem, navigation, transferAccountCard, selectionType} : AccountCardProps) => {

    const {fromAccount, toAccount, setFromAccount, setToAccount} = useTransferStore();

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
        navigation.navigate('AccountDetails', { accountId: accountItem.accountId });
    };

    const handleTransferAccountPress = () => {
        if (selectionType === 'from') {
            setFromAccount(accountItem);
            navigation.goBack();
        } else {
            setToAccount(accountItem);
            navigation.goBack();
        }
    };

    const isSelected =
    (accountItem.accountId === fromAccount?.accountId && selectionType === 'from')
    || (accountItem.accountId === toAccount?.accountId && selectionType === 'to');


    return (
        // For the transfer account selection screen, when we need to select the source or destination account
        transferAccountCard ? (
            <AnimatedPressable
            scaleValue={0.9}
            delay={200}
            style = {[styles.AccountCardContainer, isSelected && styles.selectedAccountCard]}
            onPress = {handleTransferAccountPress}
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
            </AnimatedPressable>
        ) : (
        // For the accounts list screen, when we need to navigate to an account details screen
        <AnimatedPressable
            scaleValue={0.9}
            delay={200}
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
        </AnimatedPressable>
        )
    );
};
