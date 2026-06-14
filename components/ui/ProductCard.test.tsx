import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ProductCard } from './ProductCard';

import { ProductCard as ProductCardType } from '@/lib/types';

const mockProduct: ProductCardType = {
  id: 1,
  title: 'Test product',
  price: 99.99,
  inStock: true,
};

describe('ProductCard', () => {
  it('renders product info', () => {
    render(<ProductCard product={mockProduct} onBuy={vi.fn()} />);
    expect(screen.getByText('Test product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('In Stock')).toBeInTheDocument();
  });

  it('shows "Out of Stock" when inStock is false', () => {
    render(<ProductCard product={{ ...mockProduct, inStock: false }} onBuy={vi.fn()} />);
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
    const buyButton = screen.getByRole('button', { name: /buy/i });
    expect(buyButton).toBeDisabled();
  });

  it('calls onBuy with product id when buy button clicked', async () => {
    const onBuyMock = vi.fn();
    render(<ProductCard product={mockProduct} onBuy={onBuyMock} />);
    const buyButton = screen.getByRole('button', { name: /buy/i });
    await userEvent.click(buyButton);
    expect(onBuyMock).toHaveBeenCalledWith(mockProduct.id);
  });
});
