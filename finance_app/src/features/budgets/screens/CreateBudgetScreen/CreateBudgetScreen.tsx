import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './CreateBudgetScreen.styles';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { BudgetMonthSelector } from '../../components/BudgetMonthSelector/BudgetMonthSelector';


export const CreateBudgetScreen = () => {

    const insets = useSafeAreaInsets();
    return (
        <View style = {[styles.container, {paddingTop: insets.top}]}>
            <ScrollView
                contentContainerStyle = {styles.scrollViewContent}
            >
                <View style = {styles.headerRowContainer}>
                    <BackButton />
                    <Text style = {styles.headerTitle}>Create Category Budget</Text>
                </View>
                <BudgetMonthSelector />
            </ScrollView>
        </View>
    );
};
