import { Text, View } from 'react-native';
import { AccountResponse } from '../../../../accounts/types';
import { RootNavigationProps } from '../../../../../navigation/types/RootNavigatorTypes';
import { AnimatedPressable } from '../../../../../components/AnimatedPressable/AnimatedPressable';
import { styles } from './EditTransferAccountSelectionCard.styles';
import { capitalizeFirstLetter, truncateText } from '../../../../../utils/textFormat';
import { formatBalance } from '../../../../../utils/balanceFormat';
import { useEditTransactionStore } from '../../../store/useEditTransactionStore';


type EditTransferAccountSelectionCardProps = {
    accountItem : AccountResponse,
    navigation: RootNavigationProps,
    accountType: 'source' | 'to',
}



export const EditTransferAccountSelectionCard = ({accountItem, navigation, accountType} : EditTransferAccountSelectionCardProps) => {

    const {
        sourceAccountDraft,
        toAccountDraft,
        setSourceAccountDraft,
        setToAccountDraft,
        validateTransferAccounts,
        validateTransferAmount,
    } = useEditTransactionStore();

    const handleNavToTransactionScreen = () => {
        if (accountType === 'source') {
            setSourceAccountDraft(accountItem);
        } else {
            setToAccountDraft(accountItem);
        }
        validateTransferAmount();
        validateTransferAccounts();
        navigation.goBack();
    };

    if (accountType === 'source') {
        return (
            <AnimatedPressable
                scaleValue={0.9}
                delay={200}
                style = {[
                    styles.AccountCardContainer,
                    sourceAccountDraft?.accountId === accountItem.accountId ? styles.selectedAccountCard : '',
                ]}
                onPress = {handleNavToTransactionScreen}
            >
                <View style = {[styles.iconContainer ,{backgroundColor : accountItem.color}]}>
                    <Text style = {styles.iconText}>{accountItem.icon}</Text>
                </View>
                <View style = {styles.accountInfoContainer}>
                    <Text style = {styles.accountNameText}>{truncateText(accountItem.name, 13)}</Text>
                    <Text style = {styles.accountSubInfoText}>{capitalizeFirstLetter(accountItem.accountType)}</Text>   
                </View>
                <View>
                    <Text style = {styles.accountBalanceText}>${formatBalance(accountItem.balance)}{'>'}</Text>
                </View>
            </AnimatedPressable>
        );
    }
    return (
         <AnimatedPressable
            scaleValue={0.9}
            delay={200}
            style = {[
                styles.AccountCardContainer,
                toAccountDraft?.accountId === accountItem.accountId ? styles.selectedAccountCard : '']}
            onPress = {handleNavToTransactionScreen}
        >
            <View style = {[styles.iconContainer ,{backgroundColor : accountItem.color}]}>
                <Text style = {styles.iconText}>{accountItem.icon}</Text>
            </View>
            <View style = {styles.accountInfoContainer}>
                <Text style = {styles.accountNameText}>{truncateText(accountItem.name, 13)}</Text>
                <Text style = {styles.accountSubInfoText}>{capitalizeFirstLetter(accountItem.accountType)}</Text>
            </View>
            <View>
                <Text style = {styles.accountBalanceText}>${formatBalance(accountItem.balance)}{'>'}</Text>
            </View>
        </AnimatedPressable>
    );
};
