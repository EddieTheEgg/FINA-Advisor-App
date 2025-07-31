import { View, Text } from 'react-native';
import { AnimatedPressable } from '../../../../../components/AnimatedPressable/AnimatedPressable';
import { useEditTransactionStore } from '../../../store/useEditTransactionStore';
import { styles } from './EditTransferAccountSelector.styles';
import { RootNavigationProps } from '../../../../../navigation/types/RootNavigatorTypes';
import { EditSelectedAccountCard } from '../../EditTransactionComponents/EditSelectedAccountCard/EditSelectedAccountCard';

type EditTransferAccountSelectorProps = {
    accountType: 'source' | 'to';
    navigation: RootNavigationProps
}


export const EditTransferAccountSelector = ({ navigation, accountType } :   EditTransferAccountSelectorProps ) => {

    const {sourceAccountDraft, toAccountDraft, accountError, sourceAccount, toAccount} = useEditTransactionStore();

    const navigateToEditTransferSelectAccount = () => {
        navigation.navigate('EditSelectTransferAccount', {accountType});
    };

 

    if (accountType === 'source') {
        return (
            <View style = {styles.accountSelectorContainer}>
            <Text style = {styles.accountTitle}>Source Account</Text>
            <AnimatedPressable
                onPress = {navigateToEditTransferSelectAccount}
            >
                <EditSelectedAccountCard
                    accountItem = {sourceAccountDraft}
                />
            </AnimatedPressable>
            {sourceAccount?.accountId !== sourceAccountDraft?.accountId && (
                <Text style = {styles.disclaimerText}>⚠️ New source account selected! This may affect other account balances!</Text>
            )}
            {accountError && (
                <Text style = {styles.selectedAccountError}>{accountError}</Text>
            )}
            </View>
        );
    }


   if (accountType === 'to') {
    return (
        <View style = {styles.accountSelectorContainer}>
            <Text style = {styles.accountTitle}>Recipient Account</Text>
            <AnimatedPressable
                onPress = {navigateToEditTransferSelectAccount}
            >
                <EditSelectedAccountCard
                    accountItem = {toAccountDraft}
                />
            </AnimatedPressable>
            {toAccount?.accountId !== toAccountDraft?.accountId && (
                <Text style = {styles.disclaimerText}>⚠️ New recipient account selected! This may affect other account balances!</Text>
            )}
            {accountError && (
                <Text style = {styles.selectedAccountError}>{accountError}</Text>
            )}
        </View>
    );
   }
};
