import { View, Text } from 'react-native';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { styles } from './CategoryTypeCard.styles';
import { useCreateCategoryStore } from '../../store/useCreateCategoryStore';

export const CategoryTypeCard = () => {

    const {categoryType, setCategoryType} = useCreateCategoryStore();

    const getCategoryTypeStyles = (type: 'EXPENSE' | 'INCOME' | 'TRANSFER') => {
        const isActive = categoryType === type;
        return {
            buttonStyle: [styles.categoryTypeButton, isActive && styles.activeCategoryTypeButton],
            textStyle: [styles.categoryTypeText, isActive && styles.activeCategoryTypeText]
        };
    };

    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>Category Type</Text>
            <View style = {styles.categoryTypeContainer}>
                <AnimatedPressable
                    style = {getCategoryTypeStyles('EXPENSE').buttonStyle}
                    onPress = {() => setCategoryType('EXPENSE')}
                >
                    <Text style = {getCategoryTypeStyles('EXPENSE').textStyle}>Expense</Text>
                </AnimatedPressable>
                <AnimatedPressable
                    style = {getCategoryTypeStyles('INCOME').buttonStyle}
                    onPress = {() => setCategoryType('INCOME')}
                >
                    <Text style = {getCategoryTypeStyles('INCOME').textStyle}>Income</Text>
                </AnimatedPressable>
                <AnimatedPressable
                    style = {getCategoryTypeStyles('TRANSFER').buttonStyle}
                    onPress = {() => setCategoryType('TRANSFER')}
                >
                    <Text style = {getCategoryTypeStyles('TRANSFER').textStyle}>Transfer</Text>
                </AnimatedPressable>
            </View>
        </View>
    );
};
