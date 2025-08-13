import { View, Text } from 'react-native';
import { styles } from './BudgetDisplayCard.styles';
import { BudgetData } from '../../types';

type BudgetDisplayCardProps = {
    budgetData: BudgetData
}

export const BudgetDisplayCard = ({budgetData}: BudgetDisplayCardProps) => {
    return (
        <View style = {styles.container}>
            <Text>Budget Card</Text>
        </View>
    );
};
