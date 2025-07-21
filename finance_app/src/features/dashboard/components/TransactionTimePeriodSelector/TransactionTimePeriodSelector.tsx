import { View, Text } from 'react-native';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { useCreateTransactionListStore } from '../../store/useTransactionListStore';
import { styles } from './TransactionTimePeriodSelector.styles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { fontSize } from '../../../../styles/fontSizes';

export const TransactionTimePeriodSelector = () => {

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const {date, setDate} = useCreateTransactionListStore();

    return (
        <View style = {styles.dateSelectorContainer}>
            <AnimatedPressable
                onPress={() => {
                    const newDateCopy = new Date(date);
                    newDateCopy.setMonth(newDateCopy.getMonth() - 1);
                    setDate(newDateCopy);
                }}
            >
                <FontAwesome6 name="chevron-left" size={fontSize.lg} color="#000" />
            </AnimatedPressable>
                <Text style = {styles.dateSelectorTitle}>{monthNames[date.getMonth()]} {date.getFullYear()}</Text>
            <AnimatedPressable
                onPress={() => {
                    const newDateCopy = new Date(date);
                    newDateCopy.setMonth(newDateCopy.getMonth() + 1);
                    setDate(newDateCopy);
                }}
            >
                <FontAwesome6 name="chevron-right" size={fontSize.lg} color="#000" />
            </AnimatedPressable>
        </View>
    );
};
