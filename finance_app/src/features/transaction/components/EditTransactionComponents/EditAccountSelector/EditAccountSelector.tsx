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

    const {sourceAccountDraft} = useEditTransactionStore();

    const navigateToAccountSelection = () => {
        console.log('Navigated to Account Selection Screen for editing');
        navigation.navigate('SelectEditAccount');
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
        </View>
    );
};
