import React from 'react';

type ExpenseSummaryProps = {
  totalAmount: number;
};

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ totalAmount }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md shadow-md mt-4 text-center">
      <h2 className="text-lg font-semibold text-gray-700">Total Spending</h2>
      <p className="text-2xl font-bold text-green-600 mt-1">${totalAmount.toFixed(2)}</p>
    </div>
  );
};

export default ExpenseSummary;
