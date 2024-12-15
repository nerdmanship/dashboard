'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { user, signInWithGoogle, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Personal Finance Dashboard</h1>
            <button
              onClick={signInWithGoogle}
              className="bg-white px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Personal Finance Dashboard</h1>
            <button
              onClick={logout}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Sign Out
            </button>
          </div>
          <div className="space-y-4">
            <Link 
              href="/transactions"
              className="block w-full bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-xl font-semibold text-gray-900">View Transactions</h2>
              <p className="mt-2 text-gray-600">Browse and manage your financial transactions</p>
            </Link>
            
            <Link 
              href="/add"
              className="block w-full bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-xl font-semibold text-gray-900">Add Transaction</h2>
              <p className="mt-2 text-gray-600">Record a new financial transaction</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
