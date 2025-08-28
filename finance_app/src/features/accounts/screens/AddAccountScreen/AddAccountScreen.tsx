import { View, Text, ScrollView } from 'react-native';
import { styles } from './AddAccountScreen.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { colors } from '../../../../styles/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { AccountTypeCard } from '../../components/AccountTypeCard/AccountTypeCard';
import { AddAccountDetailsCard } from '../../components/AddAccountDetailsCard/AddAccountDetailsCard';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { useAddAccountStore } from '../../store/useAddAccountStore';
import { useState } from 'react';

export const AddAccountScreen = () => {
    const insets = useSafeAreaInsets();
    const {validateAccountName} = useAddAccountStore();
    const [invalidAccountCreationText, setInvalidAccountCreationText] = useState<string>('');


    const handleCreateAccount = () => {
        if (!validateAccountName()) {
            setInvalidAccountCreationText('There are some invalid fields above');
        }
        setInvalidAccountCreationText('');
        // Create the account call here
    };

    return (
        <View style = {[styles.container, { paddingTop: insets.top }]}>
            <ScrollView
                showsVerticalScrollIndicator = {false}
                contentContainerStyle = {styles.scrollViewContent}
            >
                <View style = {styles.headerContainer}>
                    <BackButton />
                    <Text style = {styles.headerText}>Create Account</Text>
                    <FontAwesome6 name = "empty-space" size = {30} color = {colors.background} />
                </View>
                <AccountTypeCard />
                <AddAccountDetailsCard />
                {invalidAccountCreationText && (
                    <Text style = {styles.invalidAccountCreationText}>{invalidAccountCreationText}</Text>
                )}
                <AnimatedPressable
                    style = {styles.createAccountButton}
                    onPress = {handleCreateAccount}
                >
                    <Text style = {styles.createAccountButtonText}>Create Account</Text>
                </AnimatedPressable>
            </ScrollView>
        </View>
    );
};
