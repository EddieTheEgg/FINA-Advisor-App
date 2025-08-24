import { View, Text, TextInput } from 'react-native';
import { styles } from './MainAccountDetailsCard.styles';
import { useAccountInfoStore } from '../../../store/useSignupStore';
import { AccountType } from '../../../types';

export const MainAccountDetailsCard = () => {
    const {
        accountType,
        accountName,
        setAccountName,
        accountBank,
        setAccountBank,
    } = useAccountInfoStore();

    if (accountType === AccountType.CREDIT_CARD) {
        return (
            <View style = {styles.container}>
                <Text>Credit Card</Text>
            </View>
        );
    }

    const remainingChars = 20 - (accountName.length || 0);

    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>Account Details - {accountType.charAt(0).toUpperCase() + accountType.slice(1)}</Text>
            <View>
                <View style = {styles.headerContainer}>
                    <Text style = {styles.headerText}>Account Name</Text>
                    <Text style = {[styles.charCounter, remainingChars < 5 && styles.charCounterWarning]}>
                        {accountName.length}/20
                    </Text>
                </View>
                <TextInput
                    style = {styles.input}
                    placeholder = "Enter Account Name"
                    value = {accountName}
                    onChangeText = {setAccountName}
                    maxLength = {20}
                />
            </View>
            <View>
                <View style = {styles.headerContainer}>
                    <Text style = {styles.headerText}>Bank Name (Optional)</Text>
                    <Text style = {[styles.charCounter, remainingChars < 5 && styles.charCounterWarning]}>
                        {accountBank?.length || 0}/20
                    </Text>
                </View>
                <TextInput
                    style = {styles.input}
                    placeholder = "Enter Bank Name"
                    value = {accountBank || ''}
                    onChangeText = {setAccountBank}
                    maxLength = {20}
                />
            </View>
        </View>
    );
};
