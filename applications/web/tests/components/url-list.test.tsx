import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UrlList } from '../../app/components/custom/url-list/url-list.component';

vi.mock('react-router', () => ({
  Form: ({ children, ...props }: React.ComponentProps<'form'>) => <form {...props}>{children}</form>,
  useFetcher: () => ({ submit: vi.fn() }),
  useSearchParams: () => [new URLSearchParams(), vi.fn()],
}));

const mockUrls = [
  {
    id: '1',
    shortCode: 'aBcDeFg',
    originalUrl: 'https://example.com',
    clicks: 5,
    createdAt: new Date('2025-01-01'),
  },
  {
    id: '2',
    shortCode: 'xYzWvUt',
    originalUrl: 'https://google.com',
    clicks: 10,
    createdAt: new Date('2025-02-01'),
  },
];

describe('UrlList', () => {
  it('shows empty state when array is empty', () => {
    render(<UrlList urls={[]} />);

    expect(screen.getByText('No URLs yet. Paste one above.')).toBeInTheDocument();
  });

  it('renders rows with URL data', () => {
    render(<UrlList urls={mockUrls} total={2} page={1} totalPages={1} />);

    expect(screen.getByText('Your Links')).toBeInTheDocument();
    expect(screen.getByText('https://example.com')).toBeInTheDocument();
    expect(screen.getByText('https://google.com')).toBeInTheDocument();
  });
});
