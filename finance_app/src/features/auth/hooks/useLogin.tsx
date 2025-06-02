import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/api';
import { useAuth } from './useAuth';
import { Token } from '../types';

export const useLogin = () => {
    const { signInTokens } = useAuth();
    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data: Token) => {
            console.log('Login successful:', data);
            signInTokens(data.accessToken, data.refreshToken);
        },
        onError: (error: any) => {
            console.error('Login failed:', error);
            return {
                message: 'Login failed',
            };
        },
    });
};
