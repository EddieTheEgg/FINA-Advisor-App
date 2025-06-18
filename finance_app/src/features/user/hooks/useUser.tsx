import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api/api';

export const useUser = () => {
    const { data, isPending, error } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(),
    });

    return { data, isPending, error };
};
