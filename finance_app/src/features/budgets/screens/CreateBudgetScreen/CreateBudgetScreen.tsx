import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './CreateBudgetScreen.styles';
import { BudgetMonthSelector } from '../../components/BudgetMonthSelector/BudgetMonthSelector';
import { BudgetCategorySelector } from '../../components/BudgetCategorySelector/BudgetCategorySelector';
import { BudgetsNavigatorProps } from '../../../../navigation/types/BudgetsNavigatorTypes';
import { useNavigation } from '@react-navigation/native';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

type CreateBudgetScreenProps = {
    navigation: BudgetsNavigatorProps;
}

const BudgetHomeBackButton = () => {
    const navigation = useNavigation<BudgetsNavigatorProps>();

    return (
        <AnimatedPressable
            scaleValue={0.8}
            delay={200}
            onPress={() => navigation.navigate('BudgetsHome')}>
            <FontAwesome6 name="arrow-left" size={24} color="black" solid />
        </AnimatedPressable>
    );
};

export const CreateBudgetScreen = ({navigation} : CreateBudgetScreenProps) => {

    const insets = useSafeAreaInsets();
    return (
        <View style = {[styles.container, {paddingTop: insets.top}]}>
            <ScrollView
                contentContainerStyle = {styles.scrollViewContent}
            >
                <View style = {styles.headerRowContainer}>
                    <BudgetHomeBackButton />
                    <Text style = {styles.headerTitle}>Create Category Budget</Text>
                </View>
                <BudgetMonthSelector />
                <BudgetCategorySelector navigation={navigation} />
            </ScrollView>
        </View>
    );
};
