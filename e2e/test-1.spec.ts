import { test, expect } from '@playwright/test';

test.skip('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="password"]').press('Enter');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Twitter' }).click();
  const page1 = await page1Promise;
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Facebook' }).click();
  const page2 = await page2Promise;
  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'LinkedIn' }).click();
  const page4 = await page3Promise;
});