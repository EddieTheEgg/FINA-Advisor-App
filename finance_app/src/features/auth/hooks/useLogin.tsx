import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/api';
import { useAuth } from './useAuth';
import { Token } from '../types';

// Custom error class for better error handling
class LoginError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'LoginError';
    }
}

export const useLogin = () => {
    const { signInTokens } = useAuth();
    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data: Token) => {
            console.log('Login successful:', data);
            signInTokens(data.accessToken, data.refreshToken);
        },
        onError: (error: any) => {
            // Handle different error types
            if (error?.response?.status === 422) {
                // Check if it's a validation error or wrong credentials
                const detail = error.response.data?.detail;
                if (detail === 'Could not validate user') {
                    throw new LoginError('Invalid email or password');
                }

                // Validation error - show specific field errors
                if (Array.isArray(detail)) {
                    const fieldErrors = detail.map((err: any) => err.msg).join(', ');
                    throw new LoginError(`Validation error: ${fieldErrors}`);
                }
                throw new LoginError('Please check your email and password format');
            }

            if (error?.response?.status === 401) {
                throw new LoginError('Invalid email or password');
            }

            if (error?.response?.status === 404) {
                throw new LoginError('User not found');
            }

            if (error?.code === 'NETWORK_ERROR' || error?.code === 'ECONNABORTED') {
                throw new LoginError('Network error. Please check your connection');
            }

            // Default error message
            throw new LoginError('Login unsuccessful, please try again');
        },
    });
};
