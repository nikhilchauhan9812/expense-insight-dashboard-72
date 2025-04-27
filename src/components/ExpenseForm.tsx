
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { categories, Expense } from '@/utils/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

interface ExpenseFormProps {
  onSubmit: (data: Omit<Expense, 'id'>) => void;
  defaultValues?: Expense;
  buttonText?: string;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  onSubmit,
  defaultValues = {
    id: '',
    amount: 0,
    category: '',
    description: '',
    date: format(new Date(), 'yyyy-MM-dd'),
  },
  buttonText = 'Add Expense',
}) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Omit<Expense, 'id'>>({
    defaultValues: {
      amount: defaultValues.amount,
      category: defaultValues.category,
      description: defaultValues.description,
      date: defaultValues.date,
    },
  });

  const watchCategory = watch('category');

  const handleSelectCategory = (value: string) => {
    setValue('category', value);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-expense-primary">
          {buttonText === 'Add Expense' ? 'Add New Expense' : 'Update Expense'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium">
                Amount ($)
              </label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register('amount', {
                  required: 'Amount is required',
                  min: { value: 0.01, message: 'Amount must be positive' },
                })}
                className="w-full"
              />
              {errors.amount && (
                <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">
                Date
              </label>
              <Input
                id="date"
                type="date"
                {...register('date', { required: 'Date is required' })}
                className="w-full"
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <Select
              value={watchCategory}
              onValueChange={handleSelectCategory}
            >
              <SelectTrigger className="w-full" id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input
              type="hidden"
              {...register('category', { required: 'Category is required' })}
              value={watchCategory}
            />
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Describe your expense"
              {...register('description', {
                required: 'Description is required',
                maxLength: {
                  value: 100,
                  message: 'Description cannot exceed 100 characters',
                },
              })}
              className="w-full"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full bg-expense-primary hover:bg-expense-primary/90">
            {buttonText}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;
