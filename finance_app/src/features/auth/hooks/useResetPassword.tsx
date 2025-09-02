import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../api/api';

interface ResetPasswordRequest {
    verification_code: string;
    new_password: string;
}

export const useResetPassword = () => {
    return useMutation({
        mutationFn: (data: ResetPasswordRequest) => resetPassword(data),
        onSuccess: (data) => {
            if (!data.success) {
                throw new Error(data.message || 'Password reset failed');
            }
        },
        onError: (error) => {
            throw new Error(error.message || 'Password reset failed');
        },
    });
};
