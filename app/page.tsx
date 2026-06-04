import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { List } from '@/components/ui/List';
import { PostsList } from '@/components/ui/PostsList';
import { ProductsList } from '@/components/ui/ProductsList';
import { UserProfile } from '@/components/ui/UserProfile';

const demoProducts = [
  { id: 1, title: 'Laptop', price: 999.99, inStock: true },
  { id: 2, title: 'Mouse', price: 19.99, inStock: false },
  { id: 3, title: 'Keyboard', price: 49.99, inStock: true },
];

export default function Home() {
  return (
    <main>
      <Header title="TypeScript Demo" />
      <div className="p-4 grid gap-4">
        <section>
          <h2 className="text-lg font-semibold mb-2">Product List</h2>
          <ProductsList products={demoProducts} />
          <List
            items={demoProducts}
            keyExtractor={(p) => p.id}
            renderItem={(p) => `${p.title} - $${p.price}`}
          />
        </section>
        <section>
          <UserProfile />
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">Posts from API</h2>
          <PostsList />
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">Button Variants</h2>
          <div className="flex gap-2">
            <Button label="Primary" variant="primary" />
            <Button label="Secondary" variant="secondary" />
            <Button label="Danger" variant="danger" disabled />
          </div>
        </section>
      </div>
    </main>
  );
}
