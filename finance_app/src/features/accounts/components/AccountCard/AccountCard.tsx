import { View, Text } from 'react-native';
import { AccountResponse } from '../../types';
import { styles } from './AccountCard.styles';
import { AccountNavigatorProps } from '../../../../navigation/types/AccountNavigatorTypes';
import { useTransferStore } from '../../store/useTransferStore';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { formatBalance } from '../../../../utils/balanceFormat.ts';
import { formatAccountType, truncateText } from '../../../../utils/textFormat.ts';

type AccountCardProps = {
    accountItem : AccountResponse
    navigation : AccountNavigatorProps
    transferAccountCard?: boolean
    selectionType?: 'from' | 'to'
}

export const AccountCard = ({accountItem, navigation, transferAccountCard, selectionType} : AccountCardProps) => {

    const {fromAccount, toAccount, setFromAccount, setToAccount} = useTransferStore();



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
                    <Text style = {styles.accountSubInfoText}>{formatAccountType(accountItem.accountType)}</Text>
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
                <Text style = {styles.accountSubInfoText}>{formatAccountType(accountItem.accountType)}</Text>
            </View>
            <View>
                <Text style = {styles.accountBalanceText}>${formatBalance(accountItem.balance)}{'>'}</Text>
            </View>
        </AnimatedPressable>
        )
    );
};
