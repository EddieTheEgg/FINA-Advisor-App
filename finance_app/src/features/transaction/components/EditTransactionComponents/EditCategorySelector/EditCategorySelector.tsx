import { Text, View } from 'react-native';
import { RootNavigationProps } from '../../../../../navigation/types/RootNavigatorTypes';
import { useEditTransactionStore } from '../../../store/useEditTransactionStore';
import { AnimatedPressable } from '../../../../../components/AnimatedPressable/AnimatedPressable';
import { styles } from './EditCategorySelector.styles';
import { EditSelectedCategoryCard } from '../EditSelectedCategoryCard/EditSelectedCategoryCard';

type EditCategorySelectorProps = {
    navigation : RootNavigationProps;
}

export const EditCategorySelector = ({navigation} : EditCategorySelectorProps) => {

    const { categoryError } = useEditTransactionStore();

    const navigateToCategorySelection = () => {
        navigation.navigate('EditSelectCategory');
    };

    return (
    <View style = {styles.categorySelectorContainer}>
        <Text style = {styles.categoryTitle}>Category</Text>
        <AnimatedPressable
            onPress = {navigateToCategorySelection}
        >
            <EditSelectedCategoryCard />
        </AnimatedPressable>
        {categoryError && (
            <Text style = {styles.selectedCategoryError}>{categoryError}</Text>
        )}
    </View>
    );
};
