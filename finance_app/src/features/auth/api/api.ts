import { api } from '../../../api/axios';
import { Token } from '../types';

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



