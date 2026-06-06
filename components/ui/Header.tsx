'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  title?: string;
}

export const Header = ({ title = 'Portfolio types app' }: HeaderProps) => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">{title}</h1>
        <nav className="space-x-4">
          <Link
            href="/"
            className={`${isActive('/') ? 'font-bold underline' : ''} hover:underline`}
          >
            Home
          </Link>
          <Link
            href="/posts"
            className={`${isActive('/posts') ? 'font-bold underline' : ''} hover:underline`}
          >
            Posts
          </Link>
        </nav>
      </div>
    </header>
  );
};
