import { View, Text, Image, FlatList, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './BudgetsHomeScreen.styles';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { BudgetsNavigatorProps } from '../../../../navigation/types/BudgetsNavigatorTypes';
import { useGetBudgets } from '../../hooks/useGetBudgets';
import { useState } from 'react';
import { BudgetDashboardMonthSelector } from '../../components/BudgetDashboardMonthSelector/BudgetDashboardMonthSelector';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { spacing } from '../../../../styles/spacing';
import { BudgetDisplayCard } from '../../components/BudgetDisplayCard/BudgetDisplayCard';

type BudgetsHomeScreenProps = {
    navigation: BudgetsNavigatorProps;
};

const seperator = () => {
    return <View style={{height: spacing.md}} />;
  };

export const BudgetsHomeScreen = ({navigation}: BudgetsHomeScreenProps) => {

    const insets = useSafeAreaInsets();
    const [selectedMonth, setSelectedMonth] = useState<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), 1));

    const {data, isPending, error, fetchNextPage, hasNextPage, isFetchingNextPage} = useGetBudgets(selectedMonth);

    if (isPending || !data) {
        return (
            <View style = {styles.loadingContainer}>
                <Image source = {require('../../../../assets/images/Loading_Pig.png')} style = {styles.image} />
                <LoadingDots style = {styles.text} loadingText = {'Getting your budgets'} />
            </View>
        );
    }

    if (error) {
        return(
            <ErrorScreen
                errorText = {'Error getting your budgets'}
                errorSubText = {'Please try again later'}
                errorMessage = {error.message}
            />
        );
    }

    return (
        <View style={[styles.container, {paddingTop: insets.top}]}>
            <Text style = {styles.budgetTitle}>📋 Budgets</Text>
            <BudgetDashboardMonthSelector
                selectedMonth = {selectedMonth}
                setSelectedMonth = {setSelectedMonth}
            />
            <View style = {styles.budgetsContainer}>
                <Text style = {styles.subBudgetTitle}>Active Budgets</Text>
                <FlatList
                    data = {data.pages.flatMap((page) => page.budgets)}
                    contentContainerStyle = {styles.flatListContent}
                    renderItem = {({item}) => (
                        <AnimatedPressable
                            onPress = {() => navigation.navigate('BudgetDetails', {budgetId: item.budgetId})}
                        >
                            <BudgetDisplayCard budgetData = {item} />
                        </AnimatedPressable>
                    )}
                    keyExtractor = {(item) => item.budgetId}
                    onEndReached = {() => {
                        if (hasNextPage && !isFetchingNextPage) {
                            fetchNextPage();
                        }
                    }}
                    onEndReachedThreshold = {0.5}
                    ItemSeparatorComponent = {seperator}
                    ListFooterComponent = {isFetchingNextPage ? <LoadingDots /> : null}
                />
            </View>
             <AnimatedPressable
                onPress = {() => navigation.navigate('CreateBudget')}
                style={[styles.createBudgetButton, {bottom: Platform.OS === 'ios' ? insets.bottom + spacing.xxl * 1.3 : insets.bottom + spacing.xxl * 2}]}
            >
                <Text style = {styles.createBudgetButtonText}>Create Budget</Text>
            </AnimatedPressable>
        </View>
    );
};
