import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './InsightsScreen.styles';
import { useGetInsights } from '../hooks/useGetInsights';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';
import { ErrorScreen } from '../../../components/ErrorScreen/ErrorScreen';

export const InsightsScreen = () => {

    const insets = useSafeAreaInsets();

    const { data: insightsData, isPending, error} = useGetInsights();


    if (isPending || !insightsData) {
        return <LoadingScreen />;
    }

    if (error) {
        return <ErrorScreen 
            errorText = "An error occured!"
            errorSubText = "There was a problem fetching insights, please try again later"
            errorMessage = {error.message}
        />;
    }

    return (
        <View style={[styles.container, {paddingTop: insets.top}]}>
            <Text style = {styles.title}>This Month's Insights</Text>
        </View>
    );
};
