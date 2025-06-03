import { User } from '../types';
import api from '../../../api/axios';

const normalizeUser = (data: any): User => ({
    userId: data.id,
    email: data.email,
    username: data.username,
    firstName: data.first_name,
    lastName: data.last_name,
});

// Gets basic user information
export const getUser = async (): Promise<User> => {
    const response = await api.get('/users/me');
    return normalizeUser(response.data);
};
