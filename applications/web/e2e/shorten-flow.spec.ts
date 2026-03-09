import { test, expect } from '@playwright/test';
import { shortenUrl } from './helpers';

test.describe('Shorten flow', () => {
  test('shortens a URL and shows the result', async ({ page }) => {
    await page.goto('/');

    const shortCode = await shortenUrl(page, 'https://example.com');

    expect(shortCode).toMatch(/^[A-Za-z0-9]+$/);
  });

  test('short URL redirects (server returns 302)', async ({ page }) => {
    await page.goto('/');

    const shortCode = await shortenUrl(page, 'https://example.com');
    const response = await page.request.get(`/s/${shortCode}`, { maxRedirects: 0 });

    expect(response.status()).toBe(302);
    expect(response.headers()['location']).toBeTruthy();
  });
});
