import { expect, test } from '@playwright/test';

import { shortenUrl } from './helpers';

test.describe('CRUD flow', () => {
  test('edits a URL inline and updates the table', async ({ page }) => {
    await page.goto('/');

    const shortCode = await shortenUrl(page, `https://edit-test-${Date.now()}.com`);
    const row = page.locator('tr', { hasText: shortCode });

    await row.locator('button[title="Edit"]').click();
    const editInput = row.locator('input');
    await editInput.clear();
    await editInput.fill('https://edited-url.com');
    await row.locator('button[title="Save"]').click();

    await expect(row.getByText('https://edited-url.com')).toBeVisible();
  });

  test('deletes a URL with confirmation dialog', async ({ page }) => {
    await page.goto('/');

    const shortCode = await shortenUrl(page, `https://delete-test-${Date.now()}.com`);
    const row = page.locator('tr', { hasText: shortCode });

    await row.locator('button[title="Delete"]').click();
    const dialog = page.getByRole('alertdialog');
    await expect(dialog).toBeVisible();
    await dialog.locator('button', { hasText: 'Delete' }).click();

    await expect(row).toBeHidden();
  });

  test('cancels delete — URL stays in the table', async ({ page }) => {
    await page.goto('/');

    const shortCode = await shortenUrl(page, `https://cancel-test-${Date.now()}.com`);
    const row = page.locator('tr', { hasText: shortCode });

    await row.locator('button[title="Delete"]').click();
    const dialog = page.getByRole('alertdialog');
    await expect(dialog).toBeVisible();
    await dialog.locator('button', { hasText: 'Cancel' }).click();

    await expect(row).toBeVisible();
  });
});
