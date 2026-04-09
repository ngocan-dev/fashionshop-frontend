import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/features/cart/hooks', () => ({
  useCartQuery: () => ({ data: { items: [], total: 0 }, isLoading: false, isError: false }),
  useDeleteCartItemMutation: () => ({ mutate: vi.fn(), isPending: false }),
  useUpdateCartItemQuantityMutation: () => ({ mutate: vi.fn(), isPending: false }),
}));

import CartPage from './page';

describe('CartPage', () => {
  it('renders the cart screen', () => {
    render(<CartPage />);
    expect(screen.getByText('No items in cart')).toBeInTheDocument();
  });
});
