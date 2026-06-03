import { Button } from './Button';

import { ProductCard as ProductCardType } from '@/lib/types';

interface ProductCardProps {
  product: ProductCardType;
  onBuy?: (id: number) => void;
}

export const ProductCard = ({ product, onBuy }: ProductCardProps) => {
  const { id, title, price, inStock } = product;

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">${price.toFixed(2)}</p>
      <p className={`text-sm ${inStock ? 'text-green-600' : 'text-red-600'}`}>
        {inStock ? 'In Stock' : 'Out of Stock'}
      </p>
      <Button label="Buy" onClick={() => onBuy?.(id)} disabled={!inStock} variant="primary" />
    </div>
  );
};
