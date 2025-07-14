import { View, Text } from 'react-native';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './CreateCategoryScreen.styles';

export default function CreateCategoryScreen() {
    const insets = useSafeAreaInsets();
    return (
        <View style = {[styles.header, {paddingTop: insets.top}]} >
            <BackButton />
            <Text>Create Category</Text>
        </View>
    );
}

