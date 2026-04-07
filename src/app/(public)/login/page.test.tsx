import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/features/auth/hooks', () => ({
  useLoginMutation: () => ({ isPending: false, mutate: vi.fn() }),
}));

import LoginPage from './page';

describe('LoginPage', () => {
  it('renders the login screen', () => {
    render(<LoginPage />);
    expect(screen.getByText('Log in')).toBeInTheDocument();
  });
});
