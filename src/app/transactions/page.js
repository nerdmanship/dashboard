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
    const tempTransaction = {
      ...transactionData,
      id: 'temp-' + Date.now(),
      status: 'pending'
    };
    
    setOptimisticTransaction(tempTransaction);
    setIsModalOpen(false);

    try {
      await addDoc(collection(db, 'transactions'), {
        ...transactionData,
        userId: user.uid,
        createdAt: new Date().toISOString()
      });
      setOptimisticTransaction(null);
    } catch (error) {
      console.error('Error adding transaction:', error);
      setOptimisticTransaction(null);
    }
  };

  return (
    <MainLayout>
      <TransactionsList 
        optimisticTransaction={optimisticTransaction} 
        onAddClick={() => setIsModalOpen(true)}
      />

      {isModalOpen && (
        <TransactionModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddTransaction}
        />
      )}
    </MainLayout>
  );
} 