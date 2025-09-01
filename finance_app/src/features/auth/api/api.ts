import { AxiosError } from 'axios';
import { api } from '../../../api/axios';
import { Token, EmailAvailabilityResponse, CreateAccountRequest, PasswordValidationResponse, UpdatePasswordRequest } from '../types';

//Converts the response from the API to Token type
const normalizeToken = (data : any): Token => ({
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    tokenType: data.token_type,
});

export const signupUser = async (signupData: CreateAccountRequest): Promise<Token> => {
    try {
    const response = await api.post('/auth/signup', signupData);
        return normalizeToken(response.data);
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 400) {
            throw new Error(error.response.data.message);
        } else if (error instanceof AxiosError && error.response?.status === 500) {
            throw new Error('Failed to signup user');
        } else {
            throw new Error(`An unexpected error occurred: ${error}`);
        }
    }
};

export const loginUser = async ({ email, password }: { email: string; password: string }) => {
    console.log('🚀 Attempting login to:', api.defaults.baseURL + '/auth/login');
    const response = await api.post('/auth/login', {email, password});
    return normalizeToken(response.data);
};

// Refreshes the access token using the refresh token (if the access token is expired)
export const refreshToken = async (fetchRefreshToken: string) => {
    const response = await api.post('/auth/refresh', { refresh_token: fetchRefreshToken });
    return normalizeToken(response.data);
};

// Check if email is available for registration
export const checkEmailAvailability = async (email: string): Promise<EmailAvailabilityResponse> => {
    try {
        const response = await api.post('/auth/check-email', { email });
        return {
            available: response.data.available,
            message: response.data.message,
        };
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 400) {
            throw new Error(error.response.data.message);
        } else if (error instanceof AxiosError && error.response?.status === 500) {
            throw new Error('Failed to check email availability');
        } else if (error instanceof AxiosError && error.response?.status === 401) {
            throw new Error('Unauthorized');
        } else if (error instanceof AxiosError && error.response?.status === 403) {
            throw new Error('Forbidden');
        } else if (error instanceof AxiosError && error.response?.status === 404) {
            throw new Error('Not Found');
        } else {
            throw new Error(`An unexpected error occurred: ${error}`);
        }
    }
};

// Validate user's current password
export const validatePassword = async (password: string): Promise<PasswordValidationResponse> => {
    try {
        const response = await api.post('/auth/validate-password', { password });
        return {
            is_valid: response.data.is_valid,
        };
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 400) {
            throw new Error(error.response.data.message || 'Invalid password format');
        } else if (error instanceof AxiosError && error.response?.status === 401) {
            throw new Error('Authentication required');
        } else if (error instanceof AxiosError && error.response?.status === 403) {
            throw new Error('Access denied');
        } else if (error instanceof AxiosError && error.response?.status === 500) {
            throw new Error('Failed to validate password');
        } else {
            throw new Error(`An unexpected error occurred: ${error}`);
        }
    }
};

export const updatePassword = async (updatePasswordRequest: UpdatePasswordRequest) => {
    try {
        await api.put('/users/update-password', updatePasswordRequest);
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 400) {
            throw new Error(error.response.data.message);
        } else if (error instanceof AxiosError && error.response?.status === 401) {
            throw new Error('Authentication required');
        } else if (error instanceof AxiosError && error.response?.status === 403) {
            throw new Error('Access denied');
        } else if (error instanceof AxiosError && error.response?.status === 500) {
            throw new Error('Failed to update password');
        } else {
            throw new Error(`An unexpected error occurred: ${error}`);
        }
    }
};

// Request password reset
export const forgotPassword = async ({ email }: { email: string }) => {
    try {
        const response = await api.post('/auth/forgot-password', { email });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 400) {
            throw new Error(error.response.data.message);
        } else if (error instanceof AxiosError && error.response?.status === 500) {
            throw new Error('Failed to send password reset email');
        } else {
            throw new Error(`An unexpected error occurred: ${error}`);
        }
    }
};

// Reset password with verification code
export const resetPassword = async ({ verification_code, new_password }: { verification_code: string; new_password: string }) => {
    try {
        const response = await api.post('/auth/reset-password', { verification_code, new_password });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 400) {
            throw new Error(error.response.data.message);
        } else if (error instanceof AxiosError && error.response?.status === 401) {
            throw new Error('Invalid or expired verification code');
        } else if (error instanceof AxiosError && error.response?.status === 500) {
            throw new Error('Failed to reset password');
        } else {
            throw new Error(`An unexpected error occurred: ${error}`);
        }
    }
};

