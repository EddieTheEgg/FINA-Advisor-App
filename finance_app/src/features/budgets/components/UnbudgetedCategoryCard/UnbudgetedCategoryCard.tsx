import { View, Text } from 'react-native';
import { BudgetCategoryData } from '../../types';
import { useCreateBudgetStore } from '../../store/useCreateBudgetStore';
import { styles } from './UnbudgetedCategoryCard.styles';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { BudgetsNavigatorProps } from '../../../../navigation/types/BudgetsNavigatorTypes';


type UnbudgetedCategoryCardProps = {
    data: BudgetCategoryData;
    navigation: BudgetsNavigatorProps;
}

export const UnbudgetedCategoryCard = ({data, navigation} : UnbudgetedCategoryCardProps) => {

    const {selectedCategoryInfo, setSelectedCategoryInfo, setCategoryId} = useCreateBudgetStore();

    const handlePress = () => {
        setSelectedCategoryInfo(data);
        setCategoryId(data.categoryId); // Also set the categoryId
        navigation.navigate('CreateBudget');
    };

    return (
        <AnimatedPressable
            scaleValue={0.9}
            delay={200}
            style={[
                styles.categoryCardContainer,
                selectedCategoryInfo && data.categoryId === selectedCategoryInfo.categoryId ? styles.selectedCategoryCard : null,
]}
            onPress={handlePress}
        >
            <View style={[styles.iconContainer, { backgroundColor: data.categoryColor }]}>
                <Text style={styles.iconText}>{data.categoryIcon}</Text>
            </View>
            <View>
                <Text style={styles.categoryNameText}>{data.categoryName}</Text>
                {data.categoryDescription && (
                    <Text style={styles.categorySubInfoText}>{data.categoryDescription}</Text>
                )}
            </View>
        </AnimatedPressable>
    );
};
