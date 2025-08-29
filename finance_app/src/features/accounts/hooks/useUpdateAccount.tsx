import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEditAccountStore } from '../store/useEditAccountStore';
import { AccountUpdateRequest } from '../types';
import { updateAccount } from '../api/api';

export const useUpdateAccount = () => {

    const {
        accountId,
        accountNameDraft,
        accountBankNameDraft,
        accountBalanceDraft,
        creditLimitDraft,
        accountNumberDraft,
        routingNumberDraft,
    } = useEditAccountStore();

    const accountUpdateDetails: AccountUpdateRequest = {
        account_id: accountId,
        account_name: accountNameDraft,
        balance: accountBalanceDraft,
        credit_limit: creditLimitDraft,
        bank_name: accountBankNameDraft,
        account_number: accountNumberDraft,
        routing_number: routingNumberDraft,
    };

    const queryClient = useQueryClient();

    const {mutate, isPending, error, isSuccess} = useMutation({
        mutationFn: () => updateAccount(accountUpdateDetails),
        onSuccess: async () => {
            // First invalidate and refetch grouped accounts (the source of truth)
            await queryClient.invalidateQueries({queryKey: ['grouped-accounts']});
            await queryClient.refetchQueries({queryKey: ['grouped-accounts']});

            // Then invalidate and force refetch account details to override staleTime
            queryClient.invalidateQueries({queryKey: ['account-details', accountId]});
            await queryClient.refetchQueries({queryKey: ['account-details', accountId]});

            // Invalidate transaction history
            queryClient.invalidateQueries({queryKey: ['account-transactions', accountId]});

            // Invalidate dashboard data since account balance changes affect it
            queryClient.invalidateQueries({queryKey: ['dashboard']});

            // Invalidate insights data since account changes can affect financial insights
            queryClient.invalidateQueries({queryKey: ['insights', 'monthly']});
        },
        onError: (updateError: Error) => {
            console.error('Error updating account:', updateError);
        },
    });

    return {mutate, isPending, error, isSuccess};
};
