'use client';

import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useAsyncAction } from '@/hooks/useAsyncAction';

export default function AddTransaction() {
  const router = useRouter();
  const { user } = useAuth();
  const { isLoading, executeAsync } = useAsyncAction();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: '',
    type: '',
    amount: '',
    currency: 'USD',
    notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addAction = async () => {
      await addDoc(collection(db, 'transactions'), {
        ...formData,
        amount: parseFloat(formData.amount),
        date: new Date(formData.date).toISOString(),
        userId: user.uid,
        createdAt: new Date().toISOString()
      });
      router.push('/transactions');
    };

    try {
      await executeAsync('add-transaction', addAction);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!user) {
    router.push('/');
    return null;
  }

  const isSubmitting = isLoading['add-transaction'];

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Transaction</h1>
        <button
          onClick={() => router.push('/transactions')}
          className="text-gray-600 hover:text-gray-900 font-medium"
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 disabled:bg-gray-50 disabled:text-gray-500"
              required
              disabled={isSubmitting}
            >
              <option value="">Select category</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
              <option value="Savings">Savings</option>
              <option value="Debt">Debt</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Type</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="e.g., Salary, Rent, RSU"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Currency</label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 disabled:bg-gray-50 disabled:text-gray-500"
              required
              disabled={isSubmitting}
            >
              <option value="USD">USD</option>
              <option value="SEK">SEK</option>
              <option value="EUR">EUR</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              rows="3"
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isSubmitting ? 'Adding...' : 'Add Transaction'}
          </button>
        </form>
      </div>
    </div>
  );
} 