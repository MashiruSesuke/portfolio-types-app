/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useMemo } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ProductListClientProps {
  initialProducts: Product[];
}

type SortOrder = 'asc' | 'desc' | 'none';

export const ProductListClient = ({ initialProducts }: ProductListClientProps) => {
  const [products] = useState(initialProducts); // server data
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());

  const sortedProducts = useMemo(() => {
    if (sortOrder === 'none') return products;
    return [...products].sort((a, b) =>
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );
  }, [products, sortOrder]);

  const toggleLike = (id: number) => {
    const newLiked = new Set(likedProducts);
    if (newLiked.has(id)) newLiked.delete(id);
    else newLiked.add(id);
    setLikedProducts(newLiked);
  };

  if (!initialProducts || initialProducts.length === 0) {
    return (
      <div className="text-center mt-40">
        No products found. Please try again later or build the app locally.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <button onClick={() => setSortOrder('asc')} className="px-3 py-1 bg-gray-400 rounded">
          Price: low to high
        </button>
        <button onClick={() => setSortOrder('desc')} className="px-3 py-1 bg-gray-400 rounded">
          Price: high to low
        </button>
        <button onClick={() => setSortOrder('none')} className="px-3 py-1 bg-gray-400 rounded">
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <div key={product.id} className="border rounded p-4 shadow-sm">
            <img src={product.image} alt={product.title} className="h-32 object-contain mb-2" />
            <h3 className="font-semibold">{product.title}</h3>
            <p className="text-sm text-gray-600">${product.price}</p>
            <button
              onClick={() => toggleLike(product.id)}
              className={`mt-2 px-2 py-1 rounded ${
                likedProducts.has(product.id) ? 'bg-red-500 text-white' : 'bg-gray-400'
              }`}
            >
              {likedProducts.has(product.id) ? '❤️ Liked' : '🤍 Like'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
