import { View, Text } from 'react-native';
import { styles } from './DeleteAccountCard.styles';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';

type DeleteAccountCardProps = {
    onDeleteAccount: () => void;
};

export const DeleteAccountCard = ({ onDeleteAccount }: DeleteAccountCardProps) => {

    return (
        <View style={styles.container}>
            <View style={styles.mainContentContainer}>
                <Text style={styles.title}>Danger Zone</Text>
                <Text style={styles.description}>This action cannot be undone. All your financial data will be permanently deleted.</Text>
                <AnimatedPressable
                    style={styles.deleteAccountButton}
                    onPress={onDeleteAccount}
                >
                    <Text style={styles.deleteAccountButtonText}>Delete Account</Text>
                </AnimatedPressable>
            </View>
        </View>
    );

};
