import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

export async function shortenUrl(page: Page, url: string): Promise<string> {
  await page.locator('input[name="url"]').fill(url);
  await page.locator('button:has-text("Shorten Link")').click();

  const resultLink = page.locator('a[href*="/s/"]').first();
  await expect(resultLink).toBeVisible();

  const href = await resultLink.getAttribute('href');
  return href!.split('/s/')[1];
}
