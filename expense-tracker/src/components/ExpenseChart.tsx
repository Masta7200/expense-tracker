import React from 'react';
import { Pie } from 'react-chartjs-2';

type Expense = {
  amount: number;
  category: string;
};

type ExpenseChartProps = {
  expenses: Expense[];
};

const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  // Prepare data for the pie chart
  const categoryData = expenses.reduce((acc: { [key: string]: number }, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">Expenses by Category</h2>
      <Pie data={data} />
    </div>
  );
};

export default ExpenseChart;
export {}