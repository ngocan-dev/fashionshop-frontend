import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/features/products/hooks', () => ({
  useStoreProductsQuery: () => ({ data: [{ id: '1', name: 'Test Product', price: 99, stock: 1, images: [] }], isLoading: false, isError: false }),
  useProductSearchQuery: () => ({ data: [], isLoading: false, isError: false }),
}));

import ProductsPage from './page';

describe('ProductsPage', () => {
  it('renders the product listing page', () => {
    render(<ProductsPage />);
    expect(screen.getByText('Products')).toBeInTheDocument();
  });
});
