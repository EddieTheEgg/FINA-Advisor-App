import { View, Text } from 'react-native';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { styles } from './TransactionSubmissionBar.styles';
import { useCreateTransactionStore } from '../../store/useTransactionStore';
import { useState } from 'react';

export const TransactionSubmissionBar = () => {

    const {validateCreateTransaction} = useCreateTransactionStore();

    const [showError, setShowError] = useState(false);

    const handleTransactionSubmission = () => {
        validateCreateTransaction();
        if (!validateCreateTransaction()) {
            setShowError(true);
        } else {
            setShowError(false);
        }
    };

    return (
          <View style={styles.transactionSubmissionBar}>
            <View style={styles.errorContainer}>
                {showError && (
                    <Text style={styles.errorText}>Some fields above are invalid</Text>
                )}
            </View>
            <AnimatedPressable
                style={styles.completeTransactionButton}
                onPress={handleTransactionSubmission}
                scaleValue={0.9}
            >
                <Text style={styles.completeTransactionButtonText}>Create Transaction</Text>
            </AnimatedPressable>
        </View>
    );
};
