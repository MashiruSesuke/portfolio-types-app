'use client';

import { ProductCard } from './ProductCard';
import { ProductCard as ProductCardType } from '@/lib/types';

interface ProductListProps {
  products: ProductCardType[];
}

export const ProductsList = ({ products }: ProductListProps) => {
  const handleBuy = (id: number) => {
    alert(`Product ${id} added to cart (demo)`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onBuy={handleBuy} />
      ))}
    </div>
  );
};
