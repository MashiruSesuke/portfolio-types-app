interface HeaderProps {
  title?: string;
}

export const Header = ({ title = 'Portfolio types app' }: HeaderProps) => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-xl font-bold">{title}</h1>
    </header>
  );
};
