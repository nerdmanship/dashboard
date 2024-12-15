'use client';
import { useAuth } from '@/context/AuthContext';
import MainLayout from '@/components/Layout/MainLayout';
import LoginView from '@/components/Auth/LoginView';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-900">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginView />;
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Monthly Spending</h2>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              Chart Placeholder
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              Transactions List Placeholder
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Budget Overview</h2>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              Budget Status Placeholder
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
