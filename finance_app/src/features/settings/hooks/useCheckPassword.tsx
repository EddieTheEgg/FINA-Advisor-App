import { useMutation } from '@tanstack/react-query';
import { validatePassword } from '../../auth/api/api';

export const useCheckPassword = () => {
    const { mutateAsync: checkPassword, isPending, error, data } = useMutation({
        mutationFn: (password: string) => validatePassword(password),
        onError: (passwordValidaitonError: Error) => {
            console.error('Password validation error:', passwordValidaitonError);
        },
    });

    return {
        checkPassword,
        isValidating: isPending,
        error,
        isValid: data?.is_valid,
    };
};
