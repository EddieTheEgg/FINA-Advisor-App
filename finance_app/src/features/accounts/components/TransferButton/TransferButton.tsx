import { View, Text, Pressable } from 'react-native';
import { styles } from './TransferButton.styles';
import { AccountResponse } from '../../types';
import { AccountNavigatorProps } from '../../../../navigation/types/AccountNavigatorTypes';


type TransferButtonProps = {
    thisAccountDetails: AccountResponse;
    navigation: AccountNavigatorProps;
}

export const TransferButton = ({thisAccountDetails, navigation}: TransferButtonProps) => {

    const navigateToTransferScreen = () => {
      navigation.navigate('Transfer', {thisAccountDetails});
    };

    return (
        <View style={styles.accountQuickActionCardContainer}>
            <Pressable onPress={navigateToTransferScreen} style={styles.actionButton}>
                <Text style={styles.actionText}>Transfer</Text>
            </Pressable>
        </View>
    );
};
