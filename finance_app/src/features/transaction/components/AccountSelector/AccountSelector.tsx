import { View, Text } from 'react-native';
import { TransactionNavigatorProps } from '../../../../navigation/types/TransactionNavigatorTypes';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { SelectedAccountCard } from '../SelectedAccountCard/AccountSelectorCard';
import { useCreateTransactionStore } from '../../store/useTransactionStore';
import { styles } from './AccountSelector.styles';

type AccountSelectorProps = {
    navigation: TransactionNavigatorProps
}


export const AccountSelector = ({ navigation } : AccountSelectorProps ) => {

    const {sourceAccount} = useCreateTransactionStore();

    const navigateToAccountSelection = () => {
        console.log('Navigated to Account Selection Screen');
        navigation.navigate('SelectAccount');
    };



    return (
        <View style = {styles.accountSelectorContainer}>
            <Text style = {styles.accountTitle}>Account</Text>
            <AnimatedPressable
                onPress = {navigateToAccountSelection}
            >
                <SelectedAccountCard emptyCard = {sourceAccount ? false : true} />
            </AnimatedPressable>
        </View>
    );
};
