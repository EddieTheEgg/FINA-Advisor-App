// Formats the transaction amount with appropriate sign based on transaction type
export const formatAmount = (transactionType: string, amount: number): string => {
    const sign = transactionType === 'INCOME' ? '+' :
                 transactionType === 'EXPENSE' ? '-' : '';
    return `${sign}$${Math.abs(amount).toFixed(2)}`;
};

// Formats a number to show decimals only if they exist
export const formatNumberWithConditionalDecimals = (amount: number): string => {
    return amount % 1 === 0 ? amount.toString() : amount.toFixed(2);
};

// Formats currency with conditional decimals
export const formatCurrencyWithConditionalDecimals = (amount: number): string => {
    return formatNumberWithConditionalDecimals(amount);
};
