import { Text, View } from 'react-native';
import { styles } from './TransferSubmissionBar.styles';
import { useTransferStore } from '../../store/useTransferStore';
import { TransferSubmission } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitTransfer } from '../../api/api';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { HomeNavigationProps } from '../../../../navigation/types/HomeNavigatorTypes';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';

export const TransferSubmissionBar = () => {
    const navigation = useNavigation<HomeNavigationProps>();
    const queryClient = useQueryClient();

    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const {
        fromAccount,
        toAccount,
        amount,
        title,
        note,
        location,
        resetTransfer,
        setTransferError,
        amountError,
        validateTransfer,
        setIsTransferProcessing,
    } = useTransferStore();

    const handleTransferSubmission = async() => {
        // Clear any previous transfer errors
        setTransferError('');
        validateTransfer();

        // Validation checks with specific error messages

        if (fromAccount === null || toAccount === null) {
            return;
        }

        if (amountError) {
            setTransferError('You have missing or invalid fields');
            return;
        }

        setIsTransferProcessing(true);

        const transferSubmissionData : TransferSubmission = {
            fromAccount: fromAccount.accountId,
            toAccount: toAccount.accountId,
            amount,
            title,
            note,
            location,
        };

        mutate(transferSubmissionData);
    };

    const {mutate} = useMutation({
        mutationFn: async (transferSubmissionData: TransferSubmission) => {
            return await submitTransfer(transferSubmissionData);
        },
        //Might need to use preFetchQuery and preFetchInfiniteQuery instead of invalidateQueries for better performance
        onSuccess: async () => {
            console.log('Transfer successful!');
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['grouped-accounts'] }),
                queryClient.invalidateQueries({ queryKey: ['account-details', fromAccount?.accountId] }),
                queryClient.invalidateQueries({ queryKey: ['account-details', toAccount?.accountId] }),
                queryClient.invalidateQueries({ queryKey: ['account-transactions', fromAccount?.accountId] }),
                queryClient.invalidateQueries({ queryKey: ['account-transactions', toAccount?.accountId] }),
                queryClient.invalidateQueries({ queryKey: ['dashboard', month, year] }),
            ]);
            // Reset transfer state - user can navigate back manually
            resetTransfer();
        },
        onError: (error) => {
            console.error('Transfer failed:', error);
            setTransferError(`Transfer failed: ${error.message || 'An unexpected error occurred'}`);
        },
    });

    return (
        <View style={styles.transferSubmissionBar}>
            <AnimatedPressable
                style={styles.completeTransferButton}
                onPress={handleTransferSubmission}
                scaleValue={0.9}
            >
                <Text style={styles.completeTransferButtonText}>Complete Transfer</Text>
            </AnimatedPressable>
        </View>
    );
};
