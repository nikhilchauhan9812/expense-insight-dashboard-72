
import { format } from 'date-fns';

export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export const categories = [
  'Food & Dining',
  'Transportation',
  'Entertainment',
  'Housing',
  'Utilities',
  'Healthcare',
  'Shopping',
  'Personal Care',
  'Travel',
  'Education',
  'Other'
];

export const defaultExpenses: Expense[] = [
  {
    id: '1',
    amount: 35.50,
    category: 'Food & Dining',
    description: 'Lunch at Italian restaurant',
    date: format(new Date(2023, 3, 15), 'yyyy-MM-dd'),
  },
  {
    id: '2',
    amount: 125.00,
    category: 'Transportation',
    description: 'Monthly bus pass',
    date: format(new Date(2023, 3, 5), 'yyyy-MM-dd'),
  },
  {
    id: '3',
    amount: 75.20,
    category: 'Entertainment',
    description: 'Movie tickets and popcorn',
    date: format(new Date(2023, 3, 10), 'yyyy-MM-dd'),
  },
  {
    id: '4',
    amount: 800.00,
    category: 'Housing',
    description: 'Rent payment',
    date: format(new Date(2023, 3, 1), 'yyyy-MM-dd'),
  },
  {
    id: '5',
    amount: 120.35,
    category: 'Utilities',
    description: 'Electricity bill',
    date: format(new Date(2023, 3, 8), 'yyyy-MM-dd'),
  },
  {
    id: '6',
    amount: 45.99,
    category: 'Food & Dining',
    description: 'Groceries',
    date: format(new Date(2023, 3, 18), 'yyyy-MM-dd'),
  },
  {
    id: '7',
    amount: 200.00,
    category: 'Healthcare',
    description: 'Doctor visit',
    date: format(new Date(2023, 3, 22), 'yyyy-MM-dd'),
  },
  {
    id: '8',
    amount: 65.40,
    category: 'Shopping',
    description: 'New shirt',
    date: format(new Date(2023, 3, 19), 'yyyy-MM-dd'),
  },
];

// Get expenses from local storage or use default ones
export const getStoredExpenses = (): Expense[] => {
  const storedExpenses = localStorage.getItem('expenses');
  if (storedExpenses) {
    return JSON.parse(storedExpenses);
  }
  return defaultExpenses;
};

// Save expenses to local storage
export const saveExpensesToStorage = (expenses: Expense[]): void => {
  localStorage.setItem('expenses', JSON.stringify(expenses));
};

// Calculate expenses by category
export const calculateExpensesByCategory = (expenses: Expense[]): { name: string; value: number }[] => {
  const categorySums = expenses.reduce((acc, expense) => {
    // Ensure expense.amount is a number
    const amount = typeof expense.amount === 'number' ? expense.amount : Number(expense.amount);
    acc[expense.category] = (acc[expense.category] || 0) + amount;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(categorySums).map(([name, value]) => ({
    name,
    value: typeof value === 'number' ? Number(value.toFixed(2)) : 0
  }));
};

// Calculate expenses by month
export const calculateExpensesByMonth = (expenses: Expense[]): { name: string; value: number }[] => {
  const monthlyExpenses: Record<string, number> = {};
  
  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthYear = format(date, 'MMM yyyy');
    
    if (!monthlyExpenses[monthYear]) {
      monthlyExpenses[monthYear] = 0;
    }
    
    // Ensure expense.amount is a number
    const amount = typeof expense.amount === 'number' ? expense.amount : Number(expense.amount);
    monthlyExpenses[monthYear] += amount;
  });

  // Convert to array and sort by date
  return Object.entries(monthlyExpenses)
    .map(([name, value]) => ({
      name,
      value: typeof value === 'number' ? Number(value.toFixed(2)) : 0
    }))
    .sort((a, b) => {
      const dateA = new Date(a.name);
      const dateB = new Date(b.name);
      return dateA.getTime() - dateB.getTime();
    });
};

// Get total expenses
export const getTotalExpenses = (expenses: Expense[]): number => {
  const total = expenses.reduce((total, expense) => {
    // Ensure expense.amount is a number
    const amount = typeof expense.amount === 'number' ? expense.amount : Number(expense.amount);
    return total + amount;
  }, 0);
  
  return Number(total.toFixed(2));
};

// Generate a new unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};
