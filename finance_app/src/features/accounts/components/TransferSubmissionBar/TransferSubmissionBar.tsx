import { Text, View } from 'react-native';
import { styles } from './TransferSubmissionBar.styles';
import { useTransferStore } from '../../store/useTransferStore';
import { TransferSubmission } from '../../types';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { useCreateTransfer } from '../../hooks/useCreateTransfer';
import { useEffect, useState } from 'react';

export const TransferSubmissionBar = () => {
    const {
        fromAccount,
        toAccount,
        amount,
        title,
        note,
        location,
        setTransferError,
        amountError,
        validateTransfer,
        setIsTransferProcessing,
    } = useTransferStore();

    const {mutate, isPending: processingTransfer, transferError} = useCreateTransfer();
    const [showError, setShowError] = useState(false);

    // Sync loading state with API call state
    useEffect(() => {
        setIsTransferProcessing(processingTransfer);
    }, [processingTransfer, setIsTransferProcessing]);

    // Handle transfer error - reset processing state
    useEffect(() => {
        if (transferError) {
            setIsTransferProcessing(false);
        }
    }, [transferError, setIsTransferProcessing]);

    const handleTransferSubmission = async() => {
        // Clear any previous transfer errors
        setTransferError('');
        validateTransfer();

        // Validation checks with specific error messages
        if (fromAccount === null || toAccount === null || amountError) {
            setShowError(true);
            return;
        }

        setShowError(false);
        const transferSubmissionData : TransferSubmission = {
            fromAccount: fromAccount.accountId,
            toAccount: toAccount.accountId,
            amount,
            title,
            note,
            location,
        };

        // Set processing state immediately before API call
        setIsTransferProcessing(true);
        mutate(transferSubmissionData);
    };

    return (
        <View style={styles.transferSubmissionBar}>
            <View style={styles.errorContainer}>
                {showError && (
                    <Text style={styles.errorText}>Some fields above are invalid</Text>
                )}
            </View>
            <AnimatedPressable
                style={styles.completeTransferButton}
                onPress={handleTransferSubmission}
                scaleValue={0.9}
                disabled={processingTransfer}
            >
                <Text style={styles.completeTransferButtonText}>
                    {processingTransfer ? 'Processing...' : 'Complete Transfer'}
                </Text>
            </AnimatedPressable>
        </View>
    );
};
