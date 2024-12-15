'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useAsyncAction } from '@/hooks/useAsyncAction';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();
  const { isLoading, executeAsync } = useAsyncAction();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;
      
      try {
        const q = query(
          collection(db, 'transactions'),
          where('userId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const transactionData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTransactions(transactionData);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) {
      return;
    }

    const deleteAction = async () => {
      await deleteDoc(doc(db, 'transactions', id));
      setTransactions(transactions.filter(transaction => transaction.id !== id));
    };

    try {
      await executeAsync(`delete-${id}`, deleteAction);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  if (!user) {
    router.push('/');
    return null;
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-xl text-gray-900">Loading...</div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <button
          onClick={() => router.push('/add')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium"
        >
          Add Transaction
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">Currency</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">Notes</th>
              <th className="px-6 py-3 border-b border-gray-200"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.currency}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{transaction.notes}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDelete(transaction.id)}
                    disabled={isLoading[`delete-${transaction.id}`]}
                    className="text-red-600 hover:text-red-900 disabled:text-red-300 disabled:cursor-not-allowed"
                  >
                    {isLoading[`delete-${transaction.id}`] ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 