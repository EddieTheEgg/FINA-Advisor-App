import { View, Text, FlatList } from 'react-native';
import { useGetUnBudgetedCategories } from '../../hooks/useGetUnBudgetedCategories';
import { useCreateBudgetStore } from '../../store/useCreateBudgetStore';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './BudgetCategoryListScreen.styles';
import { BudgetCategoryData } from '../../types';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';
import { UnbudgetedCategoryCard } from '../../components/UnbudgetedCategoryCard/UnbudgetedCategoryCard';
import { BudgetsNavigatorProps } from '../../../../navigation/types/BudgetsNavigatorTypes';
import { spacing } from '../../../../styles/spacing';


type BudgetCategoryListScreenProps = {
    navigation: BudgetsNavigatorProps;
}

const seperator = () => {
    return <View style={{height: spacing.md}} />;
  };

export const BudgetCategoryListScreen = ({navigation} : BudgetCategoryListScreenProps) => {
    const insets = useSafeAreaInsets();

    const {budgetMonth} = useCreateBudgetStore();
    const {data, isPending, error, fetchNextPage, hasNextPage, isFetchingNextPage} = useGetUnBudgetedCategories({monthDate: budgetMonth});

    if (isPending || !data) {
        return <LoadingScreen />;
    }

    if (error) {
        return <ErrorScreen
        errorMessage= "Error fetching unbudgeted categories"
        errorSubText= "Please try again later, or contact support if the problem persists"
        errorText= {error.message}
        />;
    }

    return (
        <View style = {[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
            <Text style = {styles.title}>Unbudgeted Categories</Text>
            <Text style = {styles.subTitle}>Choose a new <Text style = {styles.boldText}>expense</Text> category to budget!</Text>
            <FlatList
                showsVerticalScrollIndicator = {false}
                data = {data.pages.flatMap((page) => page.categories)}
                renderItem = {({item} : {item: BudgetCategoryData}) => <UnbudgetedCategoryCard data = {item} navigation = {navigation}/>}
                keyExtractor = {(item) => item.categoryId}
                contentContainerStyle = {{paddingBottom: insets.bottom * 3}}
                onEndReached = {() => {
                    if (hasNextPage && !isFetchingNextPage) {
                        fetchNextPage();
                    }
                }}
                ItemSeparatorComponent = {seperator}
                onEndReachedThreshold = {0.5}
                ListFooterComponent = {isFetchingNextPage ? <LoadingDots /> : null}
            />
        </View>
    );
};
