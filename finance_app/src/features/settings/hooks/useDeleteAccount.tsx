//Use this hook carefully, make sure you have a valid user and password before calling this hook

import { useMutation } from '@tanstack/react-query';
import { deleteAccount } from '../api/api';


//Deletes entire user not just account
export const useDeleteAccount = () => {
    const {mutate, isPending, error, isSuccess} = useMutation({
        mutationFn: () => deleteAccount(),
    });
    return {mutate, isPending, error, isSuccess};
};
