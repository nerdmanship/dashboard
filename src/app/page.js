import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Personal Finance Dashboard</h1>
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
