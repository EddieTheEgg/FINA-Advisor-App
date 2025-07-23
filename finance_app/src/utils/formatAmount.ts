// Formats the transaction amount with appropriate sign based on transaction type
export const formatAmount = (transactionType: string, amount: number): string => {
    const sign = transactionType === 'INCOME' ? '+' :
                 transactionType === 'EXPENSE' ? '-' : '';
    return `${sign}$${Math.abs(amount).toFixed(2)}`;
};
