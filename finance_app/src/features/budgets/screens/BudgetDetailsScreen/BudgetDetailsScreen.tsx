import { View, Text, ScrollView } from 'react-native';
import { useGetBudgetDetails } from '../../hooks/useGetBudgetDetails';
import { BudgetsNavigatorParamList, BudgetsNavigatorProps } from '../../../../navigation/types/BudgetsNavigatorTypes';
import { RouteProp } from '@react-navigation/native';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './BudgetDetailsScreen.styles';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { colors } from '../../../../styles/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { spacing } from '../../../../styles/spacing';
import { BudgetSummaryCard } from '../../components/BudgetSummaryCard/BudgetSummaryCard';
import { BudgetProgressCard } from '../../components/BudgetProgressCard/BudgetProgressCard';
import { BudgetDetailsCard } from '../../components/BudgetDetailsCard/BudgetDetailsCard';
import { BudgetInsightsCard } from '../../components/BudgetInsightsCard/BudgetInsightsCard';
import { truncateText } from '../../../../utils/textFormat';
import { BudgetRecentTransactionsCard } from '../../components/BudgetRecentTransactionsCard/BudgetRecentTransactionsCard';

type BudgetDetailsScreenprops = {
    route: RouteProp<BudgetsNavigatorParamList, 'BudgetDetails'>;
    navigation: BudgetsNavigatorProps;
}


export const BudgetDetailsScreen = ({route, navigation}: BudgetDetailsScreenprops) => {
    const insets = useSafeAreaInsets();
    const {budgetId} = route.params;

    const {data, isPending, error} = useGetBudgetDetails(budgetId);
    if (isPending || !data) {
        return <LoadingScreen />;
    }
    if (error) {
        return <ErrorScreen
            errorText="Error fetching budget details"
            errorSubText="Please try again later"
            errorMessage={error.message}
        />;
    }



    return (
        <View style={[styles.container, {paddingTop: insets.top}]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle = {[styles.scrollViewContent, {paddingBottom: insets.bottom + spacing.lg * 5}]}
            >
                <View style = {styles.headerSection}>
                    <BackButton />
                    <Text style = {styles.headerTitle}>{truncateText(data.coreBudgetData.budgetTitle, 18)} Details</Text>
                    <AnimatedPressable
                        onPress = {() => {}}
                    >
                        <FontAwesome6 name="trash" size={24} color={colors.red} />
                    </AnimatedPressable>
                </View>
                <BudgetSummaryCard data = {data.coreBudgetData} />
                <BudgetProgressCard data = {data.coreBudgetData} />
                <BudgetRecentTransactionsCard data = {data} navigation = {navigation} budgetId = {budgetId} />
                <BudgetDetailsCard data = {data.coreBudgetData} />
                <BudgetInsightsCard data = {data} />
            </ScrollView>
        </View>
    );
};
