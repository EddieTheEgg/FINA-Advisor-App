import { View, Text, TextInput } from 'react-native';
import { styles } from './EditAccountNameInput.styles';
import { colors } from '../../../../styles/colors';
import { useEditAccountStore } from '../../store/useEditAccountStore';
import { useGroupAccounts } from '../../hooks/useGroupAccounts';
import { useEffect } from 'react';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';

export const EditAccountNameInput = () => {
    const {accountNameDraft, setAccountNameDraft, accountNameError, initializeAllAccounts, validateAccountName} = useEditAccountStore();
    const remainingChars = 20 - (accountNameDraft?.length || 0);

    const {data: allAccounts, isPending, error: fetchAllExistingAccountsError} = useGroupAccounts();


      // Initialize all accounts when they are fetched so we can validate account name uniqueness
      useEffect(() => {
        if (allAccounts) {
            initializeAllAccounts(Object.values(allAccounts.accountGroupsData).flat());
        }
    }, [allAccounts, initializeAllAccounts]);

      // Live validate account name as it changes
      useEffect(() => {
        if (accountNameDraft.length === 0) {
            return;
        }
        validateAccountName();
    },[accountNameDraft, validateAccountName]);

    if (fetchAllExistingAccountsError) {
        return <ErrorScreen
            errorText = "Error fetching existing accounts needed to validate account name"
            errorSubText = "Please try again later"
            errorMessage = {fetchAllExistingAccountsError.message}
            />;
    }

    return(
        <View>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Account Name</Text>
                <Text style={[styles.charCounter, remainingChars < 5 && styles.charCounterWarning]}>
                    {accountNameDraft?.length || 0}/20
                </Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder= "Enter Account Name"
                placeholderTextColor={colors.gray[400]}
                value={accountNameDraft || ''}
                onChangeText={setAccountNameDraft}
                maxLength={20}
            />
            {isPending && accountNameDraft.trim().length >= 3 && (
                        <Text style={styles.accountNameError}>Checking for duplicates...</Text>
            )}
            {accountNameError && !isPending && (
                <Text style={styles.accountNameError}>{accountNameError}</Text>
            )}
        </View>
    );
};
