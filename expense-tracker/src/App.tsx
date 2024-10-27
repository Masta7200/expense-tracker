import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import ExpenseChart from './components/ExpenseChart';

type Expense = {
  id: number;
  amount: number;
  category: string;
  date: string;
  description: string;
};

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [groupBy, setGroupBy] = useState<'category' | 'date'>('category');
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null); // State for editing

  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = { ...expense, id: Date.now() };
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    setEditingExpense(null); // Reset editing state
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense); // Set the expense to edit
  };

  const handleUpdateExpense = (updatedExpense: Expense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) => (expense.id === updatedExpense.id ? updatedExpense : expense))
    );
    setEditingExpense(null); // Reset editing state
  };

  const handleDeleteExpense = (id: number) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  };

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const groupedExpenses = () => {
    const groups: { [key: string]: Expense[] } = {};
    expenses.forEach((expense) => {
      const key = groupBy === 'category' ? expense.category : expense.date;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(expense);
    });
    return groups;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Expense Tracker</h1>
        <ExpenseForm onAddExpense={handleAddExpense} editingExpense={editingExpense} onUpdateExpense={handleUpdateExpense} />
        <ExpenseSummary totalAmount={totalAmount} />
        <div className="mb-4">
          <label className="mr-2">Group By:</label>
          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value as 'category' | 'date')}
            className="border rounded p-2"
          >
            <option value="category">Category</option>
            <option value="date">Date</option>
          </select>
        </div>
        <ExpenseList expenses={groupedExpenses()} onDelete={handleDeleteExpense} onEdit={handleEditExpense} />
        <ExpenseChart expenses={expenses} />
      </div>
    </div>
  );
};

export default App;
