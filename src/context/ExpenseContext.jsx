
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredExpenses, saveExpensesToStorage, generateId } from '@/utils/mockData';
import { toast } from '@/components/ui/use-toast';

const ExpenseContext = createContext({
  expenses: [],
  addExpense: () => {},
  updateExpense: () => {},
  deleteExpense: () => {},
  getExpense: () => undefined,
  loading: true,
});

export const useExpenses = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    if (!loading) {
      saveExpensesToStorage(expenses);
    }
  }, [expenses, loading]);

  const addExpense = (expense) => {
    const newExpense = { ...expense, id: generateId() };
    setExpenses(prev => [newExpense, ...prev]);
    toast({
      title: 'Expense Added',
      description: 'Your expense has been successfully added.',
    });
  };

  const updateExpense = (id, expense) => {
    setExpenses(prev =>
      prev.map(e => (e.id === id ? { ...expense, id } : e))
    );
    toast({
      title: 'Expense Updated',
      description: 'Your expense has been successfully updated.',
    });
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
    toast({
      title: 'Expense Deleted',
      description: 'Your expense has been successfully deleted.',
    });
  };

  const getExpense = (id) => {
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
