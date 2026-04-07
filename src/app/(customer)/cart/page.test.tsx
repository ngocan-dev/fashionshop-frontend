import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/features/cart/hooks', () => ({
  useCartQuery: () => ({ data: { items: [], total: 0 }, isLoading: false }),
  useDeleteCartItemMutation: () => ({ mutate: vi.fn() }),
  useUpdateCartItemQuantityMutation: () => ({ mutate: vi.fn() }),
}));

import CartPage from './page';

describe('CartPage', () => {
  it('renders the cart screen', () => {
    render(<CartPage />);
    expect(screen.getByText('Cart is empty')).toBeInTheDocument();
  });
});
