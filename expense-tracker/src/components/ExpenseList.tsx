import React from 'react';

type Expense = {
  id: number;
  amount: number;
  category: string;
  date: string;
  description: string;
};

type ExpenseListProps = {
  expenses: { [key: string]: Expense[] };
  onDelete: (id: number) => void;
  onEdit: (expense: Expense) => void; // New prop for editing
};

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete, onEdit }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md shadow-md mt-4">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">Expenses</h2>
      {Object.keys(expenses).length === 0 ? (
        <p className="text-gray-500">No expenses added yet.</p>
      ) : (
        Object.entries(expenses).map(([key, groupedExpenses]) => (
          <div key={key} className="mb-4">
            <h3 className="font-bold text-lg text-gray-800">{key}</h3>
            <ul>
              {groupedExpenses.map((expense) => (
                <li key={expense.id} className="flex justify-between items-center border-b py-2">
                  <div>
                    <p className="text-gray-800 font-medium">{expense.description}</p>
                    <p className="text-gray-500 text-sm">
                      {expense.category} | {expense.date} | ${expense.amount}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => onEdit(expense)} // Edit button
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(expense.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default ExpenseList;
