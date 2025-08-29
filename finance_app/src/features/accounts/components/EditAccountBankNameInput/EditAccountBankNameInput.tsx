import { View, Text, TextInput } from 'react-native';
import { colors } from '../../../../styles/colors';
import { useEditAccountStore } from '../../store/useEditAccountStore';
import { styles } from './EditAccountBankNameInput.styles';

export const EditAccountBankNameInput = () => {
    const {accountBankNameDraft, setAccountBankNameDraft} = useEditAccountStore();
    const remainingChars = 20 - (accountBankNameDraft?.length || 0);

    return(
        <View>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Bank Name (Optional)</Text>
                <Text style={[styles.charCounter, remainingChars < 5 && styles.charCounterWarning]}>
                    {accountBankNameDraft?.length || 0}/20
                </Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Enter Bank Name"
                placeholderTextColor={colors.gray[400]}
                value={accountBankNameDraft || ''}
                onChangeText={setAccountBankNameDraft}
                maxLength={20}
            />
    </View>
    );
};
