import { Text, View } from 'react-native';
import { styles } from './EditOptionalDetailsCard.styles';
import { EditMerchantInput } from '../EditMerchantInput/EditMerchantInput';
import { EditLocationInput } from '../EditLocationInput/EditLocationInput';
import { EditNotesInput } from '../EditNotesInput/EditNotesInput';

export const EditOptionalDetailsCard = () => {
    return (
        <View style = {styles.mainContainer}>
            <Text style = {styles.optionalDetailsText}>Optional Details</Text>
            <EditMerchantInput />
            <EditLocationInput />
            <EditNotesInput />
        </View>
    );
};
