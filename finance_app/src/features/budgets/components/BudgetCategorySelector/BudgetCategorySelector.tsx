import { View, Text } from 'react-native';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { SelectedCategoryCard } from '../SelectedCategoryCard/SelectedCategoryCard';
import { styles } from './BudgetCategorySelector.styles';
import { BudgetsNavigatorProps } from '../../../../navigation/types/BudgetsNavigatorTypes';

type BudgetCategorySelectorProps = {
    navigation: BudgetsNavigatorProps;
}

export const BudgetCategorySelector = ({navigation} : BudgetCategorySelectorProps) => {
    return (
        <View style = {styles.categorySelectorContainer}>
            <Text style = {styles.categorySelectorTitle}>Category</Text>
            <AnimatedPressable
                onPress = {() => {
                    navigation.navigate('BudgetCategoryList');
                }}
            >
                <SelectedCategoryCard />
            </AnimatedPressable>
        </View>
    );
};
