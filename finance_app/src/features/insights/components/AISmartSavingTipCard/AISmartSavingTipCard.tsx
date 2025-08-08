import { View, Text } from 'react-native';
import { useGetAIInsights } from '../../hooks/useGetAIInsights';
import { AILoadingCard } from '../AILoadingCard/AILoadingCard';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';




export const AISmartSavingTipCard = () => {
    const { data: aiInsightsData, isPending: isAIPending, error: aiError} = useGetAIInsights();

    if (isAIPending || !aiInsightsData) {
        return <AILoadingCard />;
    }

    if (aiError) {
        return <ErrorScreen
            errorText = "An error occured!"
            errorSubText = "There was a problem fetching AI insights, please try again later"
            errorMessage = {aiError.message}
        />;
    }

    return (
        <View>
            <Text>AISmartSavingTipCard</Text>
        </View>
    );
};
