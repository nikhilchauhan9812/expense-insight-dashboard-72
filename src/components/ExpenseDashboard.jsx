import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { calculateExpensesByCategory, calculateExpensesByMonth, getTotalExpenses } from '@/utils/mockData';
import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const COLORS = ['#6366f1', '#10b981', '#f97316', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#14b8a6', '#f43f5e'];

const ExpenseDashboard = ({ expenses }) => {
  const expensesByCategory = calculateExpensesByCategory(expenses);
  const expensesByMonth = calculateExpensesByMonth(expenses);
  const totalExpenses = getTotalExpenses(expenses);
  
  if (expenses.length === 0) {
    return (
      <Card className="w-full h-[450px] flex flex-col items-center justify-center">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-expense-primary">Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-gray-500">
          <p>No expense data available. Add your first expense to see insights.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-expense-primary">Dashboard</CardTitle>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-2">
          <div className="bg-expense-secondary/10 p-3 rounded-lg">
            <h3 className="text-sm text-expense-secondary font-medium">Total Expenses</h3>
            <p className="text-2xl font-bold text-expense-secondary">${totalExpenses.toFixed(2)}</p>
          </div>
          <div className="bg-expense-primary/10 p-3 rounded-lg mt-2 sm:mt-0">
            <h3 className="text-sm text-expense-primary font-medium">Categories</h3>
            <p className="text-2xl font-bold text-expense-primary">{expensesByCategory.length}</p>
          </div>
          <div className="bg-expense-accent/10 p-3 rounded-lg mt-2 sm:mt-0">
            <h3 className="text-sm text-expense-accent font-medium">Transactions</h3>
            <p className="text-2xl font-bold text-expense-accent">{expenses.length}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="category" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="category">By Category</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Trends</TabsTrigger>
          </TabsList>
          <TabsContent value="category" className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="monthly" className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expensesByMonth} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value}`} />
                <Bar dataKey="value" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Skeleton loader for the dashboard
export const ExpenseDashboardSkeleton = () => (
  <Card className="w-full">
    <CardHeader>
      <Skeleton className="h-8 w-1/3 mx-auto" />
      <div className="flex flex-col sm:flex-row justify-between items-center mt-2">
        <Skeleton className="h-16 w-32" />
        <Skeleton className="h-16 w-32 mt-2 sm:mt-0" />
        <Skeleton className="h-16 w-32 mt-2 sm:mt-0" />
      </div>
    </CardHeader>
    <CardContent>
      <Skeleton className="h-8 w-1/2 mb-4" />
      <Skeleton className="h-[380px] w-full" />
    </CardContent>
  </Card>
);

export default ExpenseDashboard;
