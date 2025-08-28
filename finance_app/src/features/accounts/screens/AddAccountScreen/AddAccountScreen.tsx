import { View, Text, ScrollView, Image, Modal } from 'react-native';
import { styles } from './AddAccountScreen.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { colors } from '../../../../styles/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { AccountTypeCard } from '../../components/AccountTypeCard/AccountTypeCard';
import { AddAccountDetailsCard } from '../../components/AddAccountDetailsCard/AddAccountDetailsCard';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { useAddAccountStore } from '../../store/useAddAccountStore';
import { useEffect, useState } from 'react';
import { useCreateAccount } from '../../hooks/useCreateAccount';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { AccountNavigatorProps } from '../../../../navigation/types/AccountNavigatorTypes';

type AddAccountScreenProps = {
    navigation: AccountNavigatorProps;
}


export const AddAccountScreen = ({navigation}: AddAccountScreenProps) => {
    const insets = useSafeAreaInsets();
    const {validateAccountName, resetAddAccountStore} = useAddAccountStore();
    const [invalidAccountCreationText, setInvalidAccountCreationText] = useState<string>('');
    const {mutate : createAccount, isPending: isCreatingAccount, error: createAccountError, isSuccess: isAccountCreated} = useCreateAccount();
    const [showSuccessCreate, setShowSuccessCreate] = useState(false);


    const handleCreateAccount = () => {
        if (!validateAccountName()) {
            setInvalidAccountCreationText('There are some invalid fields above');
        }
        setInvalidAccountCreationText('');
        createAccount();
    };

    useEffect(() => {
        if (isAccountCreated) {
            resetAddAccountStore();
            setShowSuccessCreate(true);
        }
    }, [isAccountCreated, navigation, resetAddAccountStore]);

    if (isCreatingAccount) {
        return (
            <View style={[styles.loadingContainer, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
                <View>
                    <Image source={require('../../../../assets/images/Loading_Pig.png')} style={styles.image} />
                    <LoadingDots style ={styles.text} loadingText = "Creating Account"/>
                </View>
            </View>
        );
    }

    if (createAccountError) {
        return (
            <ErrorScreen
                errorText = "Error creating account"
                errorSubText = "Please try again later"
                errorMessage = {createAccountError.message}
            />
        );
    }

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
            <Modal
                visible={showSuccessCreate}
                animationType="fade"
                onRequestClose={() => setShowSuccessCreate(false)}
                >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image source={require('../../../../assets/images/confirmation.png')} style={styles.modalImage} />
                        <Text style={styles.modalTitle}>Create Success!</Text>
                        <Text style={styles.modalText}>Your account has been created successfully</Text>
                        <View style={styles.modalButtons}>
                            <AnimatedPressable
                                onPress={() => {
                                    setShowSuccessCreate(false);
                                    navigation.goBack();
                                }}
                                style={styles.continueButton}
                            >
                                <Text style={styles.continueButtonText}>Continue</Text>
                            </AnimatedPressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
