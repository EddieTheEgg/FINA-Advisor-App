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
        onSuccess: async (data, variables) => {
            // Store account IDs before resetting
            const fromAccountId = variables.fromAccount;
            const toAccountId = variables.toAccount;

            // First invalidate and refetch grouped accounts (the source of truth)
            await queryClient.invalidateQueries({queryKey: ['grouped-accounts']});
            await queryClient.refetchQueries({queryKey: ['grouped-accounts']});

            // Then invalidate and force refetch account details to override staleTime
            queryClient.invalidateQueries({queryKey: ['account-details', fromAccountId]});
            queryClient.invalidateQueries({queryKey: ['account-details', toAccountId]});
            await queryClient.refetchQueries({queryKey: ['account-details', fromAccountId]});
            await queryClient.refetchQueries({queryKey: ['account-details', toAccountId]});

            // Invalidate transaction history
            queryClient.invalidateQueries({queryKey: ['account-transactions', fromAccountId]});
            queryClient.invalidateQueries({queryKey: ['account-transactions', toAccountId]});
            // Invalidate dashboard data
            queryClient.invalidateQueries({queryKey: ['dashboard', month, year]});

            // Reset transfer state and navigate back
            resetTransfer();
            setOpenTransferSuccessModal(true);
        },
        onError: (_error) => {
            // Reset processing state on error
            useTransferStore.getState().setIsTransferProcessing(false);
        },
    });

    return {mutate, isPending, transferError, isSuccess};
};
