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



