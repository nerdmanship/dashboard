'use client';

import { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import TransactionModal from '@/components/Transactions/TransactionModal';
import TransactionsList from '@/components/Transactions/TransactionsList';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';

export default function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [optimisticTransaction, setOptimisticTransaction] = useState(null);
  const { user } = useAuth();

  const handleAddTransaction = async (transactionData) => {
    // Create optimistic transaction
    const tempTransaction = {
      ...transactionData,
      id: 'temp-' + Date.now(),
      status: 'pending'
    };
    
    setOptimisticTransaction(tempTransaction);
    setIsModalOpen(false);

    try {
      // Add the actual transaction to Firebase
      await addDoc(collection(db, 'transactions'), {
        ...transactionData,
        userId: user.uid,
        createdAt: new Date().toISOString()
      });
      
      // Clear optimistic transaction after success
      setOptimisticTransaction(null);
    } catch (error) {
      console.error('Error adding transaction:', error);
      setOptimisticTransaction(null);
      // You might want to add error handling UI here
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Transactions</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Transaction
          </button>
        </div>

        <TransactionsList optimisticTransaction={optimisticTransaction} />

        {isModalOpen && (
          <TransactionModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddTransaction}
          />
        )}
      </div>
    </MainLayout>
  );
} 