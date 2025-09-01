import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '../api/api';

interface ForgotPasswordRequest {
    email: string;
}

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: (data: ForgotPasswordRequest) => forgotPassword(data),
        onError: (error) => {
            console.error('Forgot password error:', error);
        },
    });
};
