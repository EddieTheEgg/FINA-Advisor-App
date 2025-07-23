import { View, Text } from 'react-native';
import { useCreateTransactionListStore } from '../../store/useTransactionListStore';
import { styles } from './SortOrderSelector.styles.ts';
import { FilterButton } from '../FilterButton/FilterButton';

export const SortOrderSelector = () => {

    const {sortOrderDraft, setSortOrderDraft} = useCreateTransactionListStore();
    return (
        <View style = {styles.sortOrderSelectorContainer}>
            <Text style = {styles.sortOrderLabel}>Sort Order</Text>
            <View style = {styles.filterButtonContainer}>
                <FilterButton
                    label = "⬇️ Descending"
                    onPress = {() => setSortOrderDraft('DESC')}
                    isActive = {sortOrderDraft === 'DESC'}
                />
                <FilterButton
                    label = "⬆️ Ascending"
                    onPress = {() => setSortOrderDraft('ASC')}
                    isActive = {sortOrderDraft === 'ASC'}
                />
            </View>
        </View>
    );
};
