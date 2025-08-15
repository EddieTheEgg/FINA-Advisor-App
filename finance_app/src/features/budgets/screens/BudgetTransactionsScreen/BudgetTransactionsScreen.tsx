import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { BudgetsNavigatorParamList } from '../../../../navigation/types/BudgetsNavigatorTypes';
import { BudgetsNavigatorProps } from '../../../../navigation/types/BudgetsNavigatorTypes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './BudgetTransactionsScreen.styles';
import { useGetBudgetDetails } from '../../hooks/useGetBudgetDetails';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';
import { truncateText } from '../../../../utils/textFormat';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../../../styles/colors';
import { formatDateMonthYear } from '../../../../utils/formatDate';

type BudgetTransactionScreenProps = {
    route: RouteProp<BudgetsNavigatorParamList, 'BudgetTransactions'>;
    navigation: BudgetsNavigatorProps;
}

export const BudgetTransactionsScreen = ({route, navigation}: BudgetTransactionScreenProps) => {
    const insets = useSafeAreaInsets();
    const {budgetId} = route.params;

    const {data : budgetData, isPending : isPendingBudgetData, error : errorBudgetData} = useGetBudgetDetails(budgetId);

    if (isPendingBudgetData || !budgetData) {
        return <LoadingScreen />;
    }
    if (errorBudgetData) {
        return <ErrorScreen
            errorText = "Error fetching budget details"
            errorSubText = "Please try again later"
            errorMessage = {errorBudgetData.message}
        />;
    }

    const month = formatDateMonthYear(budgetData.coreBudgetData.budgetPeriod).split(' ')[0];

    return (
        <View style = {[styles.container, {paddingTop: insets.top}]}>
            <View style = {styles.headerSection}>
                <BackButton />
                <Text style = {styles.headerTitle}>{truncateText(budgetData.coreBudgetData.budgetTitle, 18)} Transactions</Text>
                <FontAwesome6 name = "empty-space" size = {24} color = {colors.background} />
            </View>
            <View style = {styles.transactionListSection}>
                <View style = {styles.transactionListHeader}>
                    <Text style = {styles.transactionListTitle}>{month} Transactions</Text>
                </View>
            </View>
        </View>
    );
};
