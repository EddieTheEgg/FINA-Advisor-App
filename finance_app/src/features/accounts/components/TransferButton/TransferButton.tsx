import { View, Text, Pressable } from 'react-native';
import { styles } from './TransferButton.styles';
import { AccountResponse } from '../../types';
import { useNavigation } from '@react-navigation/native';
import { AccountNavigatorProps } from '../../../../navigation/types/AccountNavigatorTypes';

export const TransferButton = ({thisAccountDetails}: {thisAccountDetails: AccountResponse}) => {

    const navigation = useNavigation<AccountNavigatorProps>();

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
