import React, { ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full bg-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">English Trivia Game</h1>
          <nav>
            {/* Add navigation menu items */}
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="hover:text-secondary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-secondary">
                  Categories
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content - Responsive Container */}
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} English Trivia Game. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
