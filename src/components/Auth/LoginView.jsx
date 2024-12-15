'use client';
import { useAuth } from '@/context/AuthContext';

export default function LoginView() {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Personal Finance Dashboard
          </h1>
          <button
            onClick={signInWithGoogle}
            className="bg-white px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
} 