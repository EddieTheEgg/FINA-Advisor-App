

// Formats the given balance into a double digit decimal ending value
export const formatBalance = (balance: number | undefined) => {
        if (balance === undefined) {
            return '0.00';
        }
    return balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
