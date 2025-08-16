import { View, Text, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { BudgetsNavigatorParamList } from '../../../../navigation/types/BudgetsNavigatorTypes';
import { BudgetsNavigatorProps } from '../../../../navigation/types/BudgetsNavigatorTypes';
import { useEditBudgetStore } from '../../store/useEditBudgetStore';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { useEffect } from 'react';
import { useGetBudgetDetails } from '../../hooks/useGetBudgetDetails';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';
import { styles } from './BudgetEditScreen.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { truncateText } from '../../../../utils/textFormat';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { colors } from '../../../../styles/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { CurrentBudgetInfo } from '../../components/EditBudgetComponents/CurrentBudgetInfo/CurrentBudgetInfo';
import { BudgetCategoryDetails } from '../../components/EditBudgetComponents/BudgetCategoryDetails/BudgetCategoryDetails';
import { UpdateBudgetAmount } from '../../components/EditBudgetComponents/UpdateBudgetAmount/UpdateBudgetAmount';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';

type BudgetEditScreenProps = {
    route: RouteProp<BudgetsNavigatorParamList, 'EditBudget'>;
    navigation: BudgetsNavigatorProps;
}

export const BudgetEditScreen = ({route, navigation}: BudgetEditScreenProps) => {
    const insets = useSafeAreaInsets();
    const {budgetId} = route.params;

    const {data, isPending, error} = useGetBudgetDetails(budgetId);

    const {
        initializeDraftFromBudget,
    } = useEditBudgetStore();


    useEffect(() => {
        if (data) {
            initializeDraftFromBudget(data);
        }
    }, [data, initializeDraftFromBudget]);


    if (isPending || !data) {
        return <LoadingScreen />;
    }
    if (error) {
        return <ErrorScreen
            errorText = "Error fetching budget details"
            errorSubText = "There is no budget data to display!"
            errorMessage = {error.message || 'Some unknown error occured, no message provided'}
        />;
    }


    return (
        <ScrollView style = {[styles.backgroundContainer, {paddingTop: insets.top}]}>
            <View style = {styles.headerContainer}>
                <BackButton />
                <Text style = {styles.headerText}>Edit {truncateText(data.coreBudgetData.budgetTitle, 15)} Budget</Text>
                <FontAwesome6 name = "empty-space" size = {24} color = {colors.background} />
            </View>
            <CurrentBudgetInfo  data = {data.coreBudgetData}/>
            <BudgetCategoryDetails data = {data.coreBudgetData} />
            <UpdateBudgetAmount data = {data.coreBudgetData} />
            <AnimatedPressable>
                <Text>Save Budget</Text>
            </AnimatedPressable>
        </ScrollView>
    );
};
