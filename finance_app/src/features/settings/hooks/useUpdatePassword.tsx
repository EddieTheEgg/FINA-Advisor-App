import { useMutation } from '@tanstack/react-query';
import { updatePassword } from '../api/api';
import { UpdatePasswordRequest } from '../types';


export const useUpdatePassword = () => {
    const { mutateAsync, isPending, error, isSuccess } = useMutation({
        mutationFn: (passwordData: UpdatePasswordRequest) => updatePassword(passwordData),
        onSuccess: () => {
            console.log('Password updated successfully');
        },
        onError: (passwordUpdateError: Error) => {
            console.error('Password update error:', passwordUpdateError);
        },
    });

    return {
        mutateAsync,
        isPending,
        error,
        isSuccess,
    };
};
