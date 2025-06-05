export const mockDashboardData = {
    user: {
      name: 'John Doe',
      user_id: 'mock-user-123',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@gmail.com',
    },
    period: {
      month: 6,
      year: 2025,
      month_name: 'June 2025',
    },
    financial_summary: {
      total_balance: 4206.69,
      monthly_income: 2379.00,
      monthly_expenses: 879.00,
      monthly_net: 1500.00,
      savings_rate: 63.1,
      expense_change_percent: -12.5,
    },
    accounts: {
      count: 3,
      balances: [
        { name: 'Chase Checking', type: 'checking', balance: 2500.00, color: '#3B82F6' },
        { name: 'Savings', type: 'savings', balance: 1200.00, color: '#10B981' },
        { name: 'Investment', type: 'investment', balance: 506.69, color: '#8B5CF6' },
      ],
    },
    recent_transactions: [
      {
        transaction_id: '1',
        title: 'Starbucks Coffee',
        amount: 4.50,
        is_income: false,
        category: 'Food & Dining',
        account: 'Chase Checking',
        date: '2025-06-02T12:30:00Z',
      },
      {
        transaction_id: '2',
        title: 'Salary Deposit',
        amount: 2100.00,
        is_income: true,
        category: 'Income',
        account: 'Chase Checking',
        date: '2025-06-01T09:00:00Z',
      },
    ],
  };
