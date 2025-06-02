import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/api';

export const useLogin = () => {
    return useMutation({
        mutationFn: loginUser,
        onError: (error: any) => {
            console.error('Login failed:', error);
            return {
                message: 'Login failed',
            };
        },
    });
};
