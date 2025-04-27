
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useExpenses } from '@/context/ExpenseContext';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import ExpenseDashboard, { ExpenseDashboardSkeleton } from '@/components/ExpenseDashboard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Expense } from '@/utils/mockData';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const { expenses, addExpense, updateExpense, deleteExpense, loading } = useExpenses();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<Expense | undefined>(undefined);
  
  const handleAdd = (data: Omit<Expense, 'id'>) => {
    addExpense(data);
    setIsAddDialogOpen(false);
  };

  const handleEdit = (expense: Expense) => {
    setCurrentExpense(expense);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = (data: Omit<Expense, 'id'>) => {
    if (currentExpense) {
      updateExpense(currentExpense.id, data);
      setIsEditDialogOpen(false);
      setCurrentExpense(undefined);
    }
  };

  const handleDelete = (id: string) => {
    // Confirm deletion
    if (window.confirm('Are you sure you want to delete this expense?')) {
      deleteExpense(id);
    }
  };

  return (
    <div className="min-h-screen bg-expense-background">
      <header className="bg-expense-primary text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Expense Tracker</h1>
          <p className="text-expense-primary-foreground mt-1">
            Track and visualize your spending patterns
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-expense-text">Your Expenses</h2>
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-expense-primary hover:bg-expense-primary/90"
          >
            <Plus className="h-5 w-5 mr-1" /> Add Expense
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
            {loading ? (
              <>
                <Skeleton className="w-full h-[450px]" />
                <Skeleton className="w-full h-[500px]" />
              </>
            ) : (
              <>
                <ExpenseDashboard expenses={expenses} />
                <ExpenseList 
                  expenses={expenses} 
                  onDelete={handleDelete} 
                  onEdit={handleEdit} 
                />
              </>
            )}
          </div>
          <div className="lg:col-span-1 order-1 lg:order-2">
            {loading ? (
              <Skeleton className="w-full h-[400px]" />
            ) : (
              <ExpenseForm 
                onSubmit={handleAdd} 
                buttonText="Add Expense"
              />
            )}
          </div>
        </div>
      </main>

      {/* Add Expense Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Expense</DialogTitle>
          </DialogHeader>
          <ExpenseForm 
            onSubmit={handleAdd} 
            buttonText="Add Expense"
          />
        </DialogContent>
      </Dialog>

      {/* Edit Expense Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
          </DialogHeader>
          {currentExpense && (
            <ExpenseForm 
              onSubmit={handleUpdate} 
              defaultValues={currentExpense}
              buttonText="Update Expense"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
