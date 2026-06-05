import Link from 'next/link';

interface HeaderProps {
  title?: string;
}

export const Header = ({ title = 'Portfolio types app' }: HeaderProps) => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">{title}</h1>
        <nav className="space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/posts" className="hover:underline">
            Posts
          </Link>
        </nav>
      </div>
    </header>
  );
};
