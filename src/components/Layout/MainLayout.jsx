'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const { logout } = useAuth();
  
  const navItems = [
    { label: 'Overview', path: '/', icon: '📊' },
    { label: 'Transactions', path: '/transactions', icon: '💳' },
    // Placeholder items for future features
    { label: 'Portfolio', path: '/portfolio', icon: '📈', disabled: true },
    { label: 'Cash Flow', path: '/cash-flow', icon: '💰', disabled: true },
    { label: 'Budget', path: '/budget', icon: '🎯', disabled: true },
    { label: 'RSUs', path: '/rsus', icon: '📑', disabled: true }
  ];

  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-gray-900 text-white p-4">
        <div className="mb-8 p-4">
          <h1 className="text-xl font-bold">Finance Dashboard</h1>
        </div>
        
        <div className="flex flex-col h-full">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.disabled ? '#' : item.path}
                className={`
                  flex items-center p-3 rounded-lg
                  ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}
                  ${pathname === item.path ? 'bg-gray-800' : ''}
                `}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="mt-auto pt-4">
            <button
              onClick={logout}
              className="flex items-center p-3 w-full rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <span className="mr-3">👋</span>
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 overflow-auto bg-gray-100 p-8">
        {children}
      </main>
    </div>
  );
} 