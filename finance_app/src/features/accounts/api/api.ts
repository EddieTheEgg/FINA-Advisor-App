import axios from 'axios';
import api from '../../../api/axios';
import { GroupedAccountsResponse, AccountResponse, BackendAccountResponse } from '../types';

export const getUserGroupedAccounts = async(): Promise<GroupedAccountsResponse> => {
    try {
        const response = await api.get('/accounts/user-accounts-grouped');
        const data = response.data;

        const groupedAccountsData: Record<string, AccountResponse[]> = {};
        for (const group in data.account_groups) {
            groupedAccountsData[group] = data.account_groups[group].map((account: BackendAccountResponse) => ({
                accountId: account.account_id,
                name: account.name,
                accountType: account.account_type,
                balance: account.balance,
                color: account.color,
                icon: account.icon,
                isDefault: account.is_default,
                includeInTotals: account.include_in_totals,
                isActive: account.is_active,
                bankName: account.bank_name,
                accountNumber: account.account_number,
                routingNumber: account.routing_number,
            }));
        }
        return { accountGroupsData: groupedAccountsData };
    } catch (error : unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            throw new Error('No accounts found for this user');
        }
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            throw new Error('Please log in to view your accounts');
        }
        if (axios.isAxiosError(error) && error.response?.status === 500) {
            throw new Error('Unable to load accounts at this time');
        }
        throw new Error('Failed to fetch grouped accounts');
    }
};
