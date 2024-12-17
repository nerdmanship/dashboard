'use client';
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';

export default function TransactionsList({ optimisticTransaction, onAddClick }) {
  const [transactions, setTransactions] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;
      
      try {
        const q = query(
          collection(db, 'transactions'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedTransactions = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [user, optimisticTransaction]);

  // Combine real transactions with optimistic transaction if it exists
  const displayTransactions = optimisticTransaction 
    ? [optimisticTransaction, ...transactions]
    : transactions;

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-fixed bg-white">
        <thead>
          <tr className="bg-neutral-200">
            <th className="px-6 py-2 text-left text-xs font-medium text-neutral-500 tracking-wider w-[15%] max-w-[15%] whitespace-nowrap overflow-hidden text-ellipsis">Date</th>
            <th className="px-6 py-2 text-left text-xs font-medium text-neutral-500 tracking-wider w-[20%] max-w-[20%] whitespace-nowrap overflow-hidden text-ellipsis">Category</th>
            <th className="px-6 py-2 text-left text-xs font-medium text-neutral-500 tracking-wider w-[15%] max-w-[15%] whitespace-nowrap overflow-hidden text-ellipsis">Type</th>
            <th className="px-6 py-2 text-left text-xs font-medium text-neutral-500 tracking-wider w-[15%] max-w-[15%] whitespace-nowrap overflow-hidden text-ellipsis">Amount</th>
            <th className="px-6 py-2 text-left text-xs font-medium text-neutral-500 tracking-wider w-[35%] max-w-[35%] whitespace-nowrap overflow-hidden text-ellipsis">Notes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr 
            onClick={onAddClick}
            className="cursor-pointer hover:bg-gray-50"
          >
            <td colSpan="5" className="px-6 py-3 text-xs text-neutral-900 font-bold">
              + Add
            </td>
          </tr>
          
          {displayTransactions.map((transaction) => (
            <tr key={transaction.id} className={transaction.status === 'pending' ? 'opacity-50' : ''}>
              <td className="px-6 py-4 text-xs text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis w-[15%] max-w-[15%]">
                {new Date(transaction.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-xs text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis w-[20%] max-w-[20%]">
                {transaction.category}
              </td>
              <td className="px-6 py-4 text-xs text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis w-[15%] max-w-[15%]">
                {transaction.type}
              </td>
              <td className="px-6 py-4 text-xs text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis w-[15%] max-w-[15%]">
                {transaction.amount} {transaction.currency}
              </td>
              <td className="px-6 py-4 text-xs text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis w-[35%] max-w-[35%]">
                {transaction.notes}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 