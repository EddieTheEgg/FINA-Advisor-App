import { Text, View } from 'react-native';
import { AccountResponse } from '../../../../accounts/types';
import { AnimatedPressable } from '../../../../../components/AnimatedPressable/AnimatedPressable';
import { styles } from './EditAccountSelectionCard.styles';
import { capitalizeFirstLetter, truncateText } from '../../../../../utils/textFormat';
import { formatBalance } from '../../../../../utils/balanceFormat';
import { useEditTransactionStore } from '../../../store/useEditTransactionStore';
import { RootNavigationProps } from '../../../../../navigation/types/RootNavigatorTypes';


type EditAccountSelectionCardProps = {
    accountItem : AccountResponse,
    navigation: RootNavigationProps,
}



export const EditAccountSelectionCard = ({accountItem, navigation} : EditAccountSelectionCardProps) => {

    const {sourceAccountDraft, setSourceAccountDraft, transactionId} = useEditTransactionStore();

    const handleNavToTransactionScreen = () => {
        setSourceAccountDraft({
            accountId: accountItem.accountId,
            accountName: accountItem.name,
            accountIcon: accountItem.icon,
            accountColor: accountItem.color,
            accountBalance: accountItem.balance,
            accountType: accountItem.accountType,
        });
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
                <Text style = {styles.accountSubInfoText}>{capitalizeFirstLetter(accountItem.accountType)}</Text>
            </View>
            <View>
                <Text style = {styles.accountBalanceText}>${formatBalance(accountItem.balance)}{'>'}</Text>
            </View>
        </AnimatedPressable>
    );
};
