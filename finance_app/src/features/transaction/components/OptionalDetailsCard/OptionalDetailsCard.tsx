import { Text, View } from 'react-native';
import { styles } from './OptionalDetailsCard.styles';
import { MerchantInput } from '../MerchantInput/MerchantInput';
import { LocationInput } from '../LocationInput/LocationInput';
import { NotesInput } from '../NotesInput/NotesInput';

export const OptionalDetailsCard = () => {
    return (
        <View style = {styles.mainContainer}>
            <Text style = {styles.optionalDetailsText}>Optional Details</Text>
            <MerchantInput />
            <LocationInput />
            <NotesInput />
        </View>
    );
};
