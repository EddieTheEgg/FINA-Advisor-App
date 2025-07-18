import { View, Text } from 'react-native';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { styles } from './TransactionSubmissionBar.styles';
import { useCreateTransactionStore } from '../../store/useTransactionStore';
import { useState, useEffect } from 'react';
import { useCreateTransaction } from '../../hooks/useCreateTransaction';

export const TransactionSubmissionBar = () => {

    const {validateCreateTransaction, formatTransactionForBackend, setTransactionProcessingError, setIsTransactionProcessing} = useCreateTransactionStore();
    const {mutate, isPending, error} = useCreateTransaction();
    const [showError, setShowError] = useState(false);

    // Watch for changes in isPending state
    useEffect(() => {
        setIsTransactionProcessing(isPending);
    }, [isPending, setIsTransactionProcessing]);

    // Watch for changes in error state
    useEffect(() => {
        if (error) {
            const errorMessage = error.response?.data?.message ||
                               error.message ||
                               'An unknown error occurred';
            setTransactionProcessingError(errorMessage);
        } else {
            setTransactionProcessingError(null);
        }
    }, [error, setTransactionProcessingError]);

    const handleTransactionSubmission = () => {
        validateCreateTransaction();
        if (!validateCreateTransaction()) {
            setShowError(true);
        } else {
            setShowError(false);
            const formattedTransaction = formatTransactionForBackend();
            mutate(formattedTransaction);
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
