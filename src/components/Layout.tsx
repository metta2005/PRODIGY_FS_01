import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Determine if this is a public page (login, register, etc.)
  const isPublicPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex flex-col">
        {isPublicPage ? (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
            <div className="w-full max-w-md">
              {children}
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 py-8 flex-grow">
            {children}
          </div>
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Secure Auth. All rights reserved.</p>
          <p className="mt-2">This site uses secure authentication to protect your data.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;