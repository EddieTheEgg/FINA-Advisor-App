import { View, Text } from 'react-native';
import { styles } from './PersonalInfoCard.styles';
import { FirstNameInput } from '../FirstNameInput/FirstNameInput';
import { LastNameInput } from '../LastNameInput/LastNameInput';
import { EmailInput } from '../EmailInput/EmailInput';

export const PersonalInfoCard = () => {
    return (
        <View style = {styles.container}>
            <Text style = {styles.personalTitle}>Personal Information</Text>
            <FirstNameInput />
            <LastNameInput />
            <EmailInput />
        </View>
    );
};
