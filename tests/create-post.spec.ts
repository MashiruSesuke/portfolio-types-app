import { test, expect } from '@playwright/test';

test.describe('Create post form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/create-post');
  });

  test('should display validation errors when form is empty', async ({ page }) => {
    await page.getByRole('button', { name: /Create Post/i }).click();
    // checking for errors
    await expect(page.getByText(/Title: min 3 chars/i)).toBeVisible();
    await expect(page.getByText(/Content: min 10 chars/i)).toBeVisible();
  });

  // TODO: add local api with the mock for POST req
  // test('should submit form successfully with valid data', async ({ page }) => {
  //   await page.getByPlaceholder(/Post title/i).fill('My E2E Test Post');
  //   await page
  //     .getByPlaceholder(/Write something/i)
  //     .fill('This is a long enough content for the post body.');
  //   await page.getByRole('button', { name: /Create Post/i }).click();

  //   // waiting a successful message
  //   await expect(page.getByText(/Post created successfully/i)).toBeVisible({
  //     timeout: 5000,
  //   });
  //   // check for form reset
  //   await expect(page.getByPlaceholder(/Post title/i)).toHaveValue('');
  // });
});
