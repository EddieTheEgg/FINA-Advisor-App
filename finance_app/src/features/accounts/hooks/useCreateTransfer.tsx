import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TransferSubmission } from '../types';
import { submitTransfer } from '../api/api';
import { useTransferStore } from '../store/useTransferStore';

export const useCreateTransfer = () => {
    const queryClient = useQueryClient();
    const { resetTransfer, setOpenTransferSuccessModal } = useTransferStore();

    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const {mutate, isPending, error : transferError, isSuccess} = useMutation({
        mutationFn: async (transferSubmissionData: TransferSubmission) => {
            return await submitTransfer(transferSubmissionData);
        },
        onSuccess: (data, variables) => {
            // Store account IDs before resetting
            const fromAccountId = variables.fromAccount;
            const toAccountId = variables.toAccount;

            // Invalidate queries first
            Promise.all([
                queryClient.invalidateQueries({queryKey: ['grouped-accounts']}),
                queryClient.invalidateQueries({queryKey: ['account-details', fromAccountId]}),
                queryClient.invalidateQueries({queryKey: ['account-details', toAccountId]}),
                queryClient.invalidateQueries({queryKey: ['account-transactions', fromAccountId]}),
                queryClient.invalidateQueries({queryKey: ['account-transactions', toAccountId]}),
                queryClient.invalidateQueries({queryKey: ['dashboard', month, year]}),
            ]).catch(error => {
                console.error('Error invalidating queries:', error);
            });

            // Reset transfer state and navigate back
            resetTransfer();
            setOpenTransferSuccessModal(true);
        },
        onError: (_error) => {
            // Reset processing state on error
            useTransferStore.getState().setIsTransferProcessing(false);
        }
    });

    return {mutate, isPending, transferError, isSuccess};
};
