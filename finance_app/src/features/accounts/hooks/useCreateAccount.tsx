import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAccount } from '../api/api';
import { useAddAccountStore } from '../store/useAddAccountStore';



export const useCreateAccount = () => {
    const {
        accountName,
        accountType,
        accountBank,
        accountBalance,
        creditLimit,
        accountNumber,
        routingNumber,
    } = useAddAccountStore();

    const accountCreationData = {
        account_name: accountName,
        account_type: accountType,
        balance: accountBalance,
        credit_limit: creditLimit,
        bank_name: accountBank,
        account_number: accountNumber,
        routing_number: routingNumber,
    };

    const queryClient = useQueryClient();
    const {mutate, isPending, error, isSuccess} = useMutation({
        mutationFn: () => createAccount(accountCreationData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['grouped-accounts']});
        },
        onError: (accountCreationError: Error) => {
            console.error('Error creating account:', accountCreationError.message);
        },
    });

    return {mutate, isPending, error, isSuccess};
};
