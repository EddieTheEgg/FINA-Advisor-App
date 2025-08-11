import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './CreateBudgetScreen.styles';

export const CreateBudgetScreen = () => {

    const insets = useSafeAreaInsets();
    return (
        <View style = {[styles.container, {paddingTop: insets.top}]}>
            <ScrollView>
                <Text>Create Budget</Text>
            </ScrollView>
        </View>
    );
};
