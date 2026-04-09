import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ replace: vi.fn() }),
  usePathname: () => '/products',
}));

vi.mock('@/features/products/hooks', () => ({
  useStoreProductsQuery: () => ({
    isLoading: false,
    isError: false,
    data: [
      {
        id: 'modular-tech-parka',
        slug: 'modular-tech-parka',
        name: 'Modular Tech Parka',
        price: 840,
        stock: 30,
        categoryName: 'Outerwear',
        color: 'black',
        size: 'M',
        images: [{ url: '/images/product-blazer.svg', alt: 'Modular Tech Parka' }],
      },
    ],
  }),
}));

import ProductsPage from './page';

describe('ProductsPage', () => {
  it('renders the product listing page', () => {
    render(<ProductsPage />);

    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
    expect(screen.getByText(/Results Found/i)).toBeInTheDocument();
    expect(screen.getByText('Modular Tech Parka')).toBeInTheDocument();
  });
});
