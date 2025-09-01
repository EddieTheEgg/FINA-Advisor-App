import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../api/api';

interface ResetPasswordRequest {
    token: string;
    new_password: string;
}

export const useResetPassword = () => {
    return useMutation({
        mutationFn: (data: ResetPasswordRequest) => resetPassword(data),
        onError: (error) => {
            console.error('Reset password error:', error);
        },
    });
};
