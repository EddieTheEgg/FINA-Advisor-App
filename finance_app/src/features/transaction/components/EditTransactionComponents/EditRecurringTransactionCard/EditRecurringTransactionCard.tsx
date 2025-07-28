import { Text, View } from 'react-native';
import { styles } from './EditRecurringTransactionCard.styles';
import { AnimatedPressable } from '../../../../../components/AnimatedPressable/AnimatedPressable';
import { fontSize } from '../../../../../styles/fontSizes';
import { colors } from '../../../../../styles/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { useEditTransactionStore } from '../../../store/useEditTransactionStore';
import { RecurringTransactionDateSelector } from '../../RecurringTransactionDateSelector/RecurringTransactionDateSelector';
import { RecurringTransactionFrequencySelector } from '../../RecurringTransactionFrequencySelector/RecurringTransactionFrequencySelector';

export const EditRecurringTransactionCard = () => {
    const {isSubscriptionDraft,
        setIsSubscriptionDraft,
        subscriptionStartDateDraft,
        setSubscriptionStartDateDraft,
        subscriptionEndDateDraft,
        setSubscriptionEndDateDraft,
        subscriptionFrequencyDraft,
        setSubscriptionFrequencyDraft,
        validateSubscription,
        subscriptionError} = useEditTransactionStore();

    const toggleIsSubscriptionTransaction = () => {
        setIsSubscriptionDraft(!isSubscriptionDraft);
        validateSubscription();
    };

    const handleStartDateSelect = (date: Date) => {
        setSubscriptionStartDateDraft(date);
        validateSubscription();
    };

    const handleEndDateSelect = (date: Date) => {
        setSubscriptionEndDateDraft(date);
        validateSubscription();
    };

    const handleFrequencySelect = (frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY') => {
        setSubscriptionFrequencyDraft(frequency);
    };

    return (
        <View style={styles.recurringTransactionContainer}>
            <View style={styles.recurringTransactionToggleContainer}>
                <AnimatedPressable
                    onPress={toggleIsSubscriptionTransaction}
                >
                    {isSubscriptionDraft ? (
                        <FontAwesome6 name="square-check" size={fontSize.xxl} color={colors.darkerBackground} />
                    ) : (
                        <FontAwesome6 name="square" size={fontSize.xxl} color={colors.darkerBackground} />
                    )}
                </AnimatedPressable>
                <Text style={styles.recurringTransactionDetailsTitle}>This is a recurring transaction</Text>
            </View>
            {subscriptionError && (
                <Text style={styles.recurringTransactionError}>{subscriptionError}</Text>
            )}
            {isSubscriptionDraft && (
                <View style={styles.recurringTransactionDetailsContainer}>
                    <RecurringTransactionDateSelector
                        onDateSelect={handleStartDateSelect}
                        title="Start Date"
                        value={subscriptionStartDateDraft}
                    />
                    <RecurringTransactionDateSelector
                        onDateSelect={handleEndDateSelect}
                        title="End Date"
                        value={subscriptionEndDateDraft}
                    />
                    <RecurringTransactionFrequencySelector
                        onFrequencySelect={handleFrequencySelect}
                        value={subscriptionFrequencyDraft}
                    />
                </View>
            )}
        </View>
    );
};

