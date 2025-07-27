import { View, Text } from 'react-native';
import { AnimatedPressable } from '../../../../../components/AnimatedPressable/AnimatedPressable';
import { useEditTransactionStore } from '../../../store/useEditTransactionStore';
import { styles } from './EditAccountSelector.styles';
import { RootNavigationProps } from '../../../../../navigation/types/RootNavigatorTypes';
import { EditSelectedAccountCard } from '../EditSelectedAccountCard/EditSelectedAccountCard';

type AccountSelectorProps = {
    navigation: RootNavigationProps
}


export const EditAccountSelector = ({ navigation } : AccountSelectorProps ) => {

    const {sourceAccountDraft, accountError} = useEditTransactionStore();

    const navigateToAccountSelection = () => {
        navigation.navigate('EditSelectAccount');
    };


    return (
        <View style = {styles.accountSelectorContainer}>
            <Text style = {styles.accountTitle}>Account</Text>
            <AnimatedPressable
                onPress = {navigateToAccountSelection}
            >
                <EditSelectedAccountCard
                    accountItem = {sourceAccountDraft}
                />
            </AnimatedPressable>
            {accountError && (
                <Text style = {styles.selectedAccountError}>{accountError}</Text>
            )}
        </View>
    );
};
