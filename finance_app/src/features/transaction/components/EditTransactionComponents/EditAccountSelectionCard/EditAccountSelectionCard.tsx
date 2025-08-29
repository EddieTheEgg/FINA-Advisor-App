import { Text, View } from 'react-native';
import { AnimatedPressable } from '../../../../../components/AnimatedPressable/AnimatedPressable';
import { styles } from './EditAccountSelectionCard.styles';
import { formatAccountType, truncateText } from '../../../../../utils/textFormat';
import { formatBalance } from '../../../../../utils/balanceFormat';
import { useEditTransactionStore } from '../../../store/useEditTransactionStore';
import { RootNavigationProps } from '../../../../../navigation/types/RootNavigatorTypes';
import { TransactionAccountResponse } from '../../../types';


type EditAccountSelectionCardProps = {
    accountItem : TransactionAccountResponse,
    navigation: RootNavigationProps,
}



export const EditAccountSelectionCard = ({accountItem, navigation} : EditAccountSelectionCardProps) => {

    const {sourceAccountDraft, setSourceAccountDraft, validateSourceAccount} = useEditTransactionStore();

    const handleNavToTransactionScreen = () => {
        setSourceAccountDraft({
            accountId: accountItem.accountId,
            name: accountItem.name,
            accountType: accountItem.accountType,
            balance: accountItem.balance,
            color: accountItem.color,
            icon: accountItem.icon,
            creditLimit: accountItem.creditLimit,
        });
        validateSourceAccount();
        navigation.goBack();
    };

    return (
         <AnimatedPressable
            scaleValue={0.9}
            delay={200}
            style = {[
                styles.AccountCardContainer,
                sourceAccountDraft?.accountId === accountItem.accountId ? styles.selectedAccountCard : '']}
            onPress = {handleNavToTransactionScreen}
        >
            <View style = {[styles.iconContainer ,{backgroundColor : accountItem.color}]}>
                <Text style = {styles.iconText}>{accountItem.icon}</Text>
            </View>
            <View style = {styles.accountInfoContainer}>
                <Text style = {styles.accountNameText}>{truncateText(accountItem.name, 13)}</Text>
                <Text style = {styles.accountSubInfoText}>{formatAccountType(accountItem.accountType)}</Text>
            </View>
            <View>
                <Text style = {styles.accountBalanceText}>${formatBalance(accountItem.balance)}{'>'}</Text>
            </View>
        </AnimatedPressable>
    );
};
