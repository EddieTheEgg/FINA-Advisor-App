import { View, Text, ScrollView, useWindowDimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './InsightsScreen.styles';
import { useGetInsights } from '../hooks/useGetInsights';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';
import { ErrorScreen } from '../../../components/ErrorScreen/ErrorScreen';
import { MonthlyFinancialHealthCard } from '../components/MonthlyFinancialHealthCard/MonthlyFinancialHealthCard';
import { MonthlySavingsRateCard } from '../components/MonthlySavingsRateCard/MonthlySavingsRateCard';
import { MonthlyTopSpendingCategoryCard } from '../components/MonthlyTopSpendingCategoryCard/MonthlyTopSpendingCategoryCard';
import { MonthlySpendingTrendCard } from '../components/MonthlySpendingTrendCard/MonthlySpendingTrendCard';
import { AISmartSavingTipCard } from '../components/AISmartSavingTipCard/AISmartSavingTipCard';
import { AIBudgetAnalysisCard } from '../components/AIBudgetAnalysisCard/AIBudgetAnalysisCard';

export const InsightsScreen = () => {

    const insets = useSafeAreaInsets();
    const canvasPadding = useWindowDimensions().height * 0.05;

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
        <ScrollView
        style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom}]}
        showsVerticalScrollIndicator = {false}
        contentContainerStyle = {[styles.scrollViewContent, {paddingBottom: Platform.OS === 'android' ? insets.bottom + canvasPadding * 3 : insets.bottom + canvasPadding * 2}]}
        >
            <Text style = {styles.title}>This Month's Insights</Text>
            <View style = {styles.keyInsightsSection}>
                <View style = {styles.insightsTitleContainer}>
                    <Text style = {styles.keyInsightsTitleText}>💡 Key Insights</Text>
                    <Text style = {styles.liveAnalysisText}>Live Analysis</Text>
                </View>
                <View style = {styles.keyInsightsCardsContainer}>
                    <MonthlyFinancialHealthCard data = {insightsData.monthlyFinancialHealth} />
                    <MonthlySavingsRateCard data = {insightsData.monthlySavingsRate} />
                    {insightsData.monthlyTopSpendingCategory && <MonthlyTopSpendingCategoryCard data = {insightsData.monthlyTopSpendingCategory} />}
                    <MonthlySpendingTrendCard data = {insightsData.monthlySpendingTrend} />
                </View>
            </View>
            <View style = {styles.aiInsightsSection}>
                <View style = {styles.insightsTitleContainer}>
                    <Text style = {styles.aiInsightsTitle}>🧠 AI Insights</Text>
                    <Text style = {styles.aiAnalysisText}>AI Generated</Text>
                </View>
                <View style = {styles.aiInsightsCardContainer}>
                    <AISmartSavingTipCard />
                    <AIBudgetAnalysisCard />
                </View>
            </View>
        </ScrollView>
    );
};
