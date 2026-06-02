import { Header } from '@/components/ui/Header';

export default function Home() {
  return (
    <main>
      <Header />
      <section className="p-4">
        <h2 className="text-lg font-semibold">Welcome to my portfolio</h2>
        <p className="mt-2">This project demonstrates modern Next.js + TypeScript practices.</p>
      </section>
    </main>
  );
}
