import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { deleteAccount } from '../api/api';

export const useDeleteAccount = () => {
    const queryClient = useQueryClient();
    const {mutate, isPending, error, isSuccess} = useMutation({
        mutationFn: (accountId: string) => deleteAccount(accountId),
        onSuccess: () => {
            //Look over all validations if anything else has other account queries
            queryClient.invalidateQueries({queryKey: ['grouped-accounts']});
        },
        onError: (deleteAccountError: Error) => {
            console.error('Error deleting account:', deleteAccountError.message);
        },
    });

    return {mutate, isPending, error, isSuccess};
};
