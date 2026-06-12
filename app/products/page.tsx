import { Metadata } from 'next';

import { ProductListClient } from '@/components/ProductListClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Products list (server + client)',
};

async function getProducts() {
  try {
    const res = await fetch('https://fakestoreapi.com/products?limit=6');
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  } catch (error) {
    console.error('Error fetching products, returning empty array:', error);
    return [];
  }
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
