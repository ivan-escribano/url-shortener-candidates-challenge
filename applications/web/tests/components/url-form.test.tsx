import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import { UrlForm } from '../../app/components/custom/url-form/url-form.component';

vi.mock('react-router', () => ({
  Form: ({ children, ...props }: React.ComponentProps<'form'>) => <form {...props}>{children}</form>,
}));

describe('UrlForm', () => {
  it('renders input and submit button', () => {
    render(<UrlForm isSubmitting={false} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /shorten link/i })).toBeInTheDocument();
  });

  it('disables button and input when isSubmitting is true', () => {
    render(<UrlForm isSubmitting={true} />);

    const inputs = screen.getAllByPlaceholderText('https://example.com/very-long-link');
    expect(inputs.some((input) => input.hasAttribute('disabled'))).toBe(true);

    const buttons = screen.getAllByRole('button', { name: /shortening/i });
    expect(buttons.some((btn) => btn.hasAttribute('disabled'))).toBe(true);
  });

  it('shows error message when error prop is present', () => {
    render(<UrlForm isSubmitting={false} error="Invalid URL" />);

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid URL');
  });
});
