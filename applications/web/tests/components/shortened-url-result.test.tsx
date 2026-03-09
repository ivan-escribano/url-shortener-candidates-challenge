import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ShortenedUrlResult } from '../../app/components/custom/shortened-url-result/shortened-url-result.component';

describe('ShortenedUrlResult', () => {
  it('shows the short URL', () => {
    render(<ShortenedUrlResult shortCode="aBcDeFg" />);

    expect(screen.getByText(/\/s\/aBcDeFg/)).toBeInTheDocument();
  });

  it('has a copy button', () => {
    render(<ShortenedUrlResult shortCode="aBcDeFg" />);

    const copyButtons = screen.getAllByRole('button', { name: /copy/i });

    expect(copyButtons.length).toBeGreaterThanOrEqual(1);
  });
});
