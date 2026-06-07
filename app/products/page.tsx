import { ProductListClient } from '@/components/ProductListClient';

async function getProducts() {
  const res = await fetch('https://fakestoreapi.com/products?limit=6');
  if (!res.ok) throw new Error('Failer to fetch products');
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products (server + client)</h1>
      <ProductListClient initialProducts={products} />
    </div>
  );
}
