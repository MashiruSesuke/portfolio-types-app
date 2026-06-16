import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage and show header', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Portfolio App/);
    await expect(page.getByRole('heading', { name: /TypeScript Demo/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Posts/i })).toBeVisible();
  });

  test('should navigate to posts page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Posts/i }).click();
    await expect(page).toHaveURL(/.*\/posts/);
    await expect(page.getByText(/Posts \(server component\)/)).toBeVisible(); // fallback Suspense
    // wait for real posts appear
    await expect(page.getByRole('heading', { name: /TypeScript Demo/ })).toBeVisible();
  });

  test('should navigate to products page', async ({ page }) => {
    // mock API request to get products
    await page.route('https://fakestoreapi.com/products*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 1,
            title: 'Test Product',
            price: 99.99,
            image: 'https://via.placeholder.com/150',
            category: 'test',
          },
        ]),
      });
    });

    await page.goto('/');
    await page.getByRole('link', { name: /Products/i }).click();
    await expect(page).toHaveURL(/.*\/products/);
    // check for products cards is loaded
    await expect(page.getByRole('button', { name: /Like/i }).first()).toBeVisible({
      timeout: 10000,
    });
  });
});
