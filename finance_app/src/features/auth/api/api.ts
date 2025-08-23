import { AxiosError } from 'axios';
import { api } from '../../../api/axios';
import { Token, EmailAvailabilityResponse } from '../types';

//Converts the response from the API to Token type
const normalizeToken = (data : any): Token => ({
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    tokenType: data.token_type,
});

export const loginUser = async ({ email, password }: { email: string; password: string }) => {
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



