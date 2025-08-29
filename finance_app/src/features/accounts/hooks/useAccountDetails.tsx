import { useQuery } from '@tanstack/react-query';
import { AccountResponse } from '../types';
import { useGroupAccounts } from './useGroupAccounts';

export const useAccountDetails = (accountId: string) => {
    const { data: groupedAccounts, isPending: isGroupedAccountsPending, error: groupedAccountsError } = useGroupAccounts();

    return useQuery({
        queryKey: ['account-details', accountId],
        queryFn: async (): Promise<AccountResponse> => {
            if (isGroupedAccountsPending || groupedAccountsError || !groupedAccounts) {
                throw new Error('Failed to load grouped accounts data, cannot fetch account details');
            }

            for (const groupName in groupedAccounts.accountGroupsData) {
                const account = groupedAccounts.accountGroupsData[groupName].find(
                    (acc: AccountResponse) => acc.accountId === accountId
                );
                if (account) {
                    return account;
                }
            }
            throw new Error(`Account with ID ${accountId} not found`);
        },
        enabled: !isGroupedAccountsPending && !groupedAccountsError && !!groupedAccounts,
        staleTime: 0, // Always refetch when invalidated
    });
};
