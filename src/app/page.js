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
      <div className="space-y-6 p-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full text-neutral-400">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <h2 className="text-md font-semibold mb-4">Networth placeholder</h2>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center w-full">
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <h2 className="text-md font-semibold mb-4">Portfolio placeholder</h2>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center w-full">
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <h2 className="text-md font-semibold mb-4">Cashflow placeholder</h2>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center w-full">
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <h2 className="text-md font-semibold mb-4">Budget placeholder</h2>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center w-full">
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
