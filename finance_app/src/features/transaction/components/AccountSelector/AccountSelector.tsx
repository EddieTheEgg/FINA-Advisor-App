import { View, Text } from 'react-native';
import { TransactionNavigatorProps } from '../../../../navigation/types/TransactionNavigatorTypes';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { SelectedAccountCard } from '../SelectedAccountCard/SelectedAccountCard';
import { useCreateTransactionStore } from '../../store/useTransactionStore';
import { styles } from './AccountSelector.styles';

type AccountSelectorProps = {
    navigation: TransactionNavigatorProps
}


export const AccountSelector = ({ navigation } : AccountSelectorProps ) => {

    const {sourceAccount, sourceAccountError} = useCreateTransactionStore();

    const navigateToAccountSelection = () => {
        navigation.navigate('SelectAccount');
    };

    return (
        <View style = {styles.accountSelectorContainer}>
            <Text style = {styles.accountTitle}>Account</Text>
            <AnimatedPressable
                onPress = {navigateToAccountSelection}
            >
                <SelectedAccountCard
                    emptyCard = {sourceAccount ? false : true}
                    accountColor = {sourceAccount?.color}
                    accountIcon = {sourceAccount?.icon}
                    accountBalance = {sourceAccount?.balance}
                    accountName = {sourceAccount?.name}
                />
            </AnimatedPressable>
            {sourceAccountError && (
                <Text style={styles.selectedAccountError}>{sourceAccountError}</Text>
            )}
        </View>
    );
};
