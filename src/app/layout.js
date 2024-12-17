import { AuthContextProvider } from '@/context/AuthContext';
import './globals.css';

export const metadata = {
  title: 'Personal Finance Dashboard',
  description: 'Track your personal finances',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
