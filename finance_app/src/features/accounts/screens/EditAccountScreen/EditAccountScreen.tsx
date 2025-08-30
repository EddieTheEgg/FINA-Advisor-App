import { View, Text, ScrollView, Dimensions, Modal, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './EditAccountScreen.styles';
import { fontSize } from '../../../../styles/fontSizes';
import { colors } from '../../../../styles/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { EditAccountSummaryCard } from '../../components/EditAccountSummaryCard/EditAccountSummaryCard';
import { AccountNavigatorParamList } from '../../../../navigation/types/AccountNavigatorTypes';
import { RouteProp } from '@react-navigation/native';
import { AccountNavigatorProps } from '../../../../navigation/types/AccountNavigatorTypes';
import { EditAccountDetailsCard } from '../../components/EditAccountDetailsCard/EditAccountDetailsCard';
import { EditAccountTypeCard } from '../../components/EditAccountTypeCard/EditAccountTypeCard';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { useEditAccountStore } from '../../store/useEditAccountStore';
import { useEffect, useState } from 'react';
import { useUpdateAccount } from '../../hooks/useUpdateAccount';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';


type EditAccountScreenProps = {
    route: RouteProp<AccountNavigatorParamList, 'EditAccount'>;
    navigation: AccountNavigatorProps;
}

export const EditAccountScreen = ({route, navigation}: EditAccountScreenProps) => {
    const { height } = Dimensions.get('window');
    const responsivePadding = height * 0.2;
    const insets = useSafeAreaInsets();

    const { accountDetails } = route.params;

    const {validateAccountName, validateCreditLimit, resetToInitialState} = useEditAccountStore();

    const [saveValidationText, setSaveValidationText] = useState('');
    const [showSuccessUpdateMessage, setShowSuccessUpdateMessage] = useState(false);
    const {mutate: updateAccount, isPending: isUpdatingAccount, error: updateAccountError, isSuccess : isUpdateSuccess} = useUpdateAccount();

    const handleSaveAccount = () => {
        if (!validateAccountName() || !validateCreditLimit()) {
            setSaveValidationText('There are some invalid fields above');
            return;
        }
        setSaveValidationText('');
        updateAccount();
    };

    useEffect(() => {
        if (isUpdateSuccess) {
           setShowSuccessUpdateMessage(true);
        }
    }, [isUpdateSuccess]);

    if (isUpdatingAccount) {
        return (
            <View style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
                <View>
                    <Image source={require('../../../../assets/images/Loading_Pig.png')} style={styles.image} />
                    <LoadingDots style ={styles.text} loadingText = {'Updating Account'} />
                </View>
            </View>
        );
    }

    if (updateAccountError) {
        return <ErrorScreen
            errorText = {'Error Updating Account'}
            errorSubText = {'Please try again'}
            errorMessage = {updateAccountError.message}
        />;
    }

    return (
        <View style = {[styles.screenContainer, {paddingTop: insets.top}]}>
            <ScrollView
            showsVerticalScrollIndicator = {false}
            contentContainerStyle = {{paddingBottom: insets.bottom + responsivePadding * 1.5}}
            >
                <View style = {styles.headerSection}>
                    <BackButton />
                    <Text style = {styles.headerTitle}>Edit Account</Text>
                    <FontAwesome6 name = "empty" size = {fontSize.xxl * 1.2} color = {colors.background} />
                </View>
                <EditAccountSummaryCard accountDetails = {accountDetails} />
                <EditAccountTypeCard accountDetails = {accountDetails} />
                <EditAccountDetailsCard accountDetails = {accountDetails} />
                {saveValidationText && (
                    <Text style = {styles.saveValidationText}>{saveValidationText}</Text>
                )}
                <AnimatedPressable
                    onPress = {handleSaveAccount}
                    style = {styles.saveAccountButton}
                >
                    <Text style = {styles.saveAccountButtonText}>Save Account</Text>
                </AnimatedPressable>
            </ScrollView>
            <Modal
                visible={showSuccessUpdateMessage}
                animationType="fade"
                onRequestClose={() => setShowSuccessUpdateMessage(false)}
                >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image source={require('../../../../assets/images/confirmation.png')} style={styles.modalImage} />
                        <Text style={styles.modalTitle}>Update Success!</Text>
                        <Text style={styles.modalText}>Your account has been updated successfully</Text>
                        <View style={styles.modalButtons}>
                            <AnimatedPressable
                                onPress={() => {
                                    setShowSuccessUpdateMessage(false);
                                    resetToInitialState();
                                    navigation.navigate('AccountsList');
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
