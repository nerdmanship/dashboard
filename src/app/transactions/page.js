'use client';

import { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import TransactionModal from '@/components/Transactions/TransactionModal';
import TransactionsList from '@/components/Transactions/TransactionsList';

export default function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [optimisticTransaction, setOptimisticTransaction] = useState(null);

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
      // Actual transaction addition logic here
      // If successful, optimisticTransaction will be replaced with real data
      // If failed, we'll need to remove the optimistic transaction
    } catch (error) {
      setOptimisticTransaction(null);
      // Show error notification
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