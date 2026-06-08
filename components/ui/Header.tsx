'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
}

const NavItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/posts', label: 'Posts' },
  { href: '/products', label: 'Products' },
];

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
          {NavItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${isActive(href) ? 'font-bold underline' : ''} hover:underline`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
