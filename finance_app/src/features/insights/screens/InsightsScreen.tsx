import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './InsightsScreen.styles';

export const InsightsScreen = () => {

    const insets = useSafeAreaInsets();


    return (
        <View style={[styles.container, {paddingTop: insets.top}]}>
            <Text style = {styles.title}>This Month's Insights</Text>
        </View>
    );
};
