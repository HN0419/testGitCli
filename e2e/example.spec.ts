import { test, expect, Page } from '@playwright/test';
import {LaunchPage_test} from '../SauceDemoPages/LaunchPage.test';
import {testData} from '../testData.json';

let launchPage: LaunchPage_test;

test.beforeEach(async ({ page, context }, testInfo) => {
  launchPage = new LaunchPage_test(page, context);
  let url:string = launchPage.actualURL;
  await page.goto(url);
});

test.describe('Set of sample cases',() => {
test('Launch and verify URL', async ({ page }) => {
  // await page.goto('https://www.saucedemo.com/');
  await launchPage.verifyNavigation_URL('saucedemo', page);
  await launchPage.verifyNavigation_Title('Swag Labs', page);
  // await expect(page).toHaveTitle('Swag Labs');
  // await expect(page).toHaveURL(/.*saucedemo/);
});

test('Login and verify', async ({ page }) => {
  await launchPage.loginApplication();
  // await page.goto('https://www.saucedemo.com/');
  // inputs the fields :: username and password
  // await page.fill('input#user-name','standard_user');
  // await page.fill('input#password','secret_sauce');
  // Click the login button.
  // await page.click('input#login-button');
  // await page.getByRole('link', { name: 'Get started' }).click();
  // await expect(page).toHaveURL(/.*inventory/); // Expects the URL to contain inventory.
  // await page.isVisible('span.title');
});

test('select products', async({page}) => {
  await launchPage.loginApplication();
  var testName = test.info().title.toString();
  await launchPage.getItemName("",testName);
})
testData.forEach(testData => {
  test('select product from TD', async({page}) => {
    await launchPage.loginApplication();
    var testName = test.info().title.toString();
    await launchPage.getItemName(testData.productName, testName);
  })
})

test('social links validation', async({page}) =>{
  await launchPage.loginApplication();
  await launchPage.validateSocialLinks();

})

})
