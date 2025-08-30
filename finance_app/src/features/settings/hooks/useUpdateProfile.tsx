import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '../api/api';
import { UpdateProfileRequest } from '../types';
import { useEditProfileStore } from '../store/useEditProfileStore';

export const useUpdateProfile = () => {

    const {firstName, lastName, email} = useEditProfileStore();

    const updateProfileRequest: UpdateProfileRequest = {
        first_name: firstName,
        last_name: lastName,
        email: email,
    };

    const queryClient = useQueryClient();
    const {mutate, isPending, error, isSuccess} = useMutation({
        mutationFn: () => updateProfile(updateProfileRequest),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['dashboard']});
        },
    });
    return {mutate, isPending, error, isSuccess};
};
