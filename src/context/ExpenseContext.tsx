
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Expense, getStoredExpenses, saveExpensesToStorage, generateId } from '@/utils/mockData';
import { toast } from '@/components/ui/use-toast';

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (id: string, expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  getExpense: (id: string) => Expense | undefined;
  loading: boolean;
}

const ExpenseContext = createContext<ExpenseContextType>({
  expenses: [],
  addExpense: () => {},
  updateExpense: () => {},
  deleteExpense: () => {},
  getExpense: () => undefined,
  loading: true,
});

export const useExpenses = () => useContext(ExpenseContext);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  // Load expenses from local storage on initial render
  useEffect(() => {
    try {
      const storedExpenses = getStoredExpenses();
      setExpenses(storedExpenses);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load expenses:', error);
      toast({
        title: 'Error',
        description: 'Failed to load expense data',
        variant: 'destructive',
      });
      setLoading(false);
    }
  }, []);

  // Save expenses to local storage whenever they change
  useEffect(() => {
    if (!loading) {
      saveExpensesToStorage(expenses);
    }
  }, [expenses, loading]);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = { ...expense, id: generateId() };
    setExpenses(prev => [newExpense, ...prev]);
    toast({
      title: 'Expense Added',
      description: 'Your expense has been successfully added.',
    });
  };

  const updateExpense = (id: string, expense: Omit<Expense, 'id'>) => {
    setExpenses(prev =>
      prev.map(e => (e.id === id ? { ...expense, id } : e))
    );
    toast({
      title: 'Expense Updated',
      description: 'Your expense has been successfully updated.',
    });
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
    toast({
      title: 'Expense Deleted',
      description: 'Your expense has been successfully deleted.',
    });
  };

  const getExpense = (id: string) => {
    return expenses.find(e => e.id === id);
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        updateExpense,
        deleteExpense,
        getExpense,
        loading,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
