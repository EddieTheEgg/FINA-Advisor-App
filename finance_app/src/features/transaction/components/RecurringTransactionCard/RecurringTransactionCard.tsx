import { Text, View } from 'react-native';
import { styles } from './RecurringTransactionCard.styles';
import { useCreateTransactionStore } from '../../store/useTransactionStore';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { fontSize } from '../../../../styles/fontSizes';
import { colors } from '../../../../styles/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { RecurringTransactionDateSelector } from '../RecurringTransactionDateSelector/RecurringTransactionDateSelector';
import { RecurringTransactionFrequencySelector } from '../RecurringTransactionFrequencySelector/RecurringTransactionFrequencySelector';

export const RecurringTransactionCard = () => {
    const {recurringTransaction,
        setRecurringTransaction,
        recurringTransactionStartDate,
        setRecurringTransactionStartDate,
        recurringTransactionEndDate,
        setRecurringTransactionEndDate,
        recurringTransactionFrequency,
        setRecurringTransactionFrequency,
        validateRecurringTransaction,
        recurringTransactionError} = useCreateTransactionStore();

    const toggleRecurringTransaction = () => {
        setRecurringTransaction(!recurringTransaction);
        validateRecurringTransaction();
    };

    const handleStartDateSelect = (date: Date) => {
        setRecurringTransactionStartDate(date);
        validateRecurringTransaction();
    };

    const handleEndDateSelect = (date: Date) => {
        setRecurringTransactionEndDate(date);
        validateRecurringTransaction();
    };

    const handleFrequencySelect = (frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY') => {
        setRecurringTransactionFrequency(frequency);
    };

    return (
        <View style={styles.recurringTransactionContainer}>
            <View style={styles.recurringTransactionToggleContainer}>
                <AnimatedPressable
                    onPress={toggleRecurringTransaction}
                >
                    {recurringTransaction ? (
                        <FontAwesome6 name="square-check" size={fontSize.xxl} color={colors.darkerBackground} />
                    ) : (
                        <FontAwesome6 name="square" size={fontSize.xxl} color={colors.darkerBackground} />
                    )}
                </AnimatedPressable>
                <Text style={styles.recurringTransactionDetailsTitle}>This is a recurring transaction</Text>
            </View>
            {recurringTransactionError && (
                <Text style={styles.recurringTransactionError}>{recurringTransactionError}</Text>
            )}
            {recurringTransaction && (
                <View style={styles.recurringTransactionDetailsContainer}>
                    <RecurringTransactionDateSelector
                        onDateSelect={handleStartDateSelect}
                        title="Start Date"
                        value={recurringTransactionStartDate}
                    />
                    <RecurringTransactionDateSelector
                        onDateSelect={handleEndDateSelect}
                        title="End Date"
                        value={recurringTransactionEndDate}
                    />
                    <RecurringTransactionFrequencySelector
                        onFrequencySelect={handleFrequencySelect}
                        value={recurringTransactionFrequency}
                    />
                </View>
            )}
        </View>
    );
};

