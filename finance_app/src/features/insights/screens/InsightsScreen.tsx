import { View, Text, ScrollView, useWindowDimensions, Platform, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './InsightsScreen.styles';
import { useGetInsights } from '../hooks/useGetInsights';
import { useRefreshInsights } from '../hooks/useRefreshInsights';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';
import { ErrorScreen } from '../../../components/ErrorScreen/ErrorScreen';
import { MonthlyFinancialHealthCard } from '../components/MonthlyFinancialHealthCard/MonthlyFinancialHealthCard';
import { MonthlySavingsRateCard } from '../components/MonthlySavingsRateCard/MonthlySavingsRateCard';
import { MonthlyTopSpendingCategoryCard } from '../components/MonthlyTopSpendingCategoryCard/MonthlyTopSpendingCategoryCard';
import { MonthlySpendingTrendCard } from '../components/MonthlySpendingTrendCard/MonthlySpendingTrendCard';
import { AISmartSavingTipCard } from '../components/AISmartSavingTipCard/AISmartSavingTipCard';
import { AIBudgetAnalysisCard } from '../components/AIBudgetAnalysisCard/AIBudgetAnalysisCard';
import { fontSize } from '../../../styles/fontSizes';
import { colors } from '../../../styles/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { AnimatedPressable } from '../../../components/AnimatedPressable/AnimatedPressable';
import { LoadingDots } from '../../../components/LoadingDots/LoadingDots';

export const InsightsScreen = () => {

    const insets = useSafeAreaInsets();
    const canvasPadding = useWindowDimensions().height * 0.05;

    const { data: insightsData, isPending, error} = useGetInsights();
    const { refreshInsights, isOnCooldown, cooldownTimeLeft, isRefreshing } = useRefreshInsights();


    if (isPending || !insightsData) {
        return <LoadingScreen />;
    }

    if (isRefreshing) {
        return ( <View style={[styles.loadingContainer, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
            <View>
                <Image source={require('../../../assets/images/Loading_Pig.png')} style={styles.image} />
                <LoadingDots style ={styles.text} loadingText = "Refreshing Insights" />
            </View>
        </View>);
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
            <View style = {styles.refreshIconContainer}>
                <FontAwesome6 name = "empty-space" size = {39} color = {colors.background} />
                <Text style = {styles.title}>This Month's Insights</Text>
                <AnimatedPressable
                    onPress={refreshInsights}
                    disabled={isOnCooldown || isRefreshing}
                >
                    <View style={[
                        styles.refreshIcon,
                        (isOnCooldown || isRefreshing) && styles.refreshIconDisabled,
                    ]}>
                        <FontAwesome6
                            name={isRefreshing ? 'spinner' : 'arrows-rotate'}
                            size={fontSize.lg}
                            color={(isOnCooldown || isRefreshing) ? colors.gray[500] : colors.black}
                        />
                        {isOnCooldown && !isRefreshing && (
                            <Text style={styles.cooldownText}>{cooldownTimeLeft}s</Text>
                        )}
                        {isRefreshing && (
                            <Text style={styles.cooldownText}>Refreshing...</Text>
                        )}
                    </View>
                </AnimatedPressable>
            </View>
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
