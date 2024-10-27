import React, { useState, useEffect } from 'react';

type Expense = {
  id: number; // Ensure id is part of the type
  amount: number;
  category: string;
  date: string;
  description: string;
};

type ExpenseFormProps = {
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
  editingExpense: Expense | null; // Prop to handle editing
  onUpdateExpense: (expense: Expense) => void; // Prop for updating
};

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense, editingExpense, onUpdateExpense }) => {
  const [amount, setAmount] = useState<number | ''>('');
  const [category, setCategory] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (editingExpense) {
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
      setDescription(editingExpense.description);
    } else {
      setAmount('');
      setCategory('');
      setDate('');
      setDescription('');
    }
  }, [editingExpense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense = {
      id: editingExpense ? editingExpense.id : Date.now(), // Keep the same id when updating
      amount: Number(amount),
      category,
      date,
      description,
    };

    if (editingExpense) {
      // Update existing expense
      onUpdateExpense(newExpense); // Pass the full expense object
    } else {
      // Add new expense
      onAddExpense({ amount: Number(amount), category, date, description });
    }

    // Reset form fields
    setAmount('');
    setCategory('');
    setDate('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount"
        className="border rounded w-full p-2 mb-2"
        required
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        className="border rounded w-full p-2 mb-2"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border rounded w-full p-2 mb-2"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border rounded w-full p-2 mb-2"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full">
        {editingExpense ? 'Update Expense' : 'Add Expense'}
      </button>
    </form>
  );
};

export default ExpenseForm;
