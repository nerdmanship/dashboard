'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import {
  ChartBarIcon,
  CreditCardIcon,
  PresentationChartLineIcon,
  BanknotesIcon,
  ChartBarSquareIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  
  const navItems = [
    { label: 'Overview', path: '/', icon: ChartBarIcon },
    { label: 'Transactions', path: '/transactions', icon: CreditCardIcon },
    { label: 'Portfolio', path: '/portfolio', icon: PresentationChartLineIcon, disabled: true },
    { label: 'Cashflow', path: '/cash-flow', icon: BanknotesIcon, disabled: true },
    { label: 'Budget', path: '/budget', icon: ChartBarSquareIcon, disabled: true },
    { label: 'RSUs', path: '/rsus', icon: DocumentTextIcon, disabled: true }
  ];

  return (
    <div className="flex h-screen">
      <nav className="w-64 text-white p-2 flex flex-col">
        <div className="mb-4 p-2">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.disabled ? '#' : item.path}
              className={`
                flex items-center p-2 rounded-lg text-sm
                ${item.disabled ? 'opacity-50 cursor-default' : 'hover:bg-neutral-800'}
                ${pathname === item.path ? 'bg-neutral-800' : ''}
              `}
            >
              <span className="mr-2">
                {item.icon === ChartBarIcon && <ChartBarIcon className="w-5 h-5" />}
                {item.icon === CreditCardIcon && <CreditCardIcon className="w-5 h-5" />}
                {item.icon === PresentationChartLineIcon && <PresentationChartLineIcon className="w-5 h-5" />}
                {item.icon === BanknotesIcon && <BanknotesIcon className="w-5 h-5" />}
                {item.icon === ChartBarSquareIcon && <ChartBarSquareIcon className="w-5 h-5" />}
                {item.icon === DocumentTextIcon && <DocumentTextIcon className="w-5 h-5" />}
              </span>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mt-auto p-2 flex items-center space-x-3 bg-neutral-900 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center">
            {user?.email?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs truncate">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="p-1.5 rounded hover:bg-neutral-800"
            title="Sign out"
          >
            <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <main className="flex-1 overflow-auto bg-gray-100 m-2 rounded-lg shadow-md">
        {children}
      </main>
    </div>
  );
} 