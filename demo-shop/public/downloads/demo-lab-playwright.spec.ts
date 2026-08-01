import { expect, test } from '@playwright/test'

// Setup: npm init playwright@latest
// Save this file in the generated project's tests folder, then run:
// npx playwright test tests/demo-lab-playwright.spec.ts
// You can override this when testing a preview deployment or a local copy.
const baseUrl = process.env.DEMO_BASE_URL ?? 'https://demo.itswatts.com'

test.describe('it’s wattϟ Demo Lab', () => {
  test('a learner can sign in and complete a demo purchase flow', async ({ page }) => {
    await page.goto(`${baseUrl}#retail-view`)

    await expect(page.getByRole('heading', { name: 'Choose a product.' })).toBeHidden()

    await page.locator('#login-email').fill('tester@itswatts.demo')
    await page.locator('#login-password').fill('DemoPass123!')
    await page.getByTestId('sign-in').click()

    await expect(page.getByText('Signed in. The shop is now unlocked.')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Choose a product.' })).toBeVisible()

    await page.getByTestId('add-focus-lamp').click()
    await page.locator('#cart-nav').click()
    await expect(page.getByTestId('cart-item-focus-lamp')).toBeVisible()
    await expect(page.getByTestId('quantity-focus-lamp')).toHaveText('1')

    await page.locator('#promo').fill('WELCOME10')
    await page.locator('#apply-promo').click()
    await expect(page.locator('#promo-message')).toHaveText('WELCOME10 applied: 10% off.')

    await page.locator('#checkout-name').fill('Demo Learner')
    await page.locator('#checkout-email').fill('learner@example.test')
    await page.getByTestId('checkout').click()
    await expect(page.locator('#checkout-message')).toContainText('Demo order placed')
  })
})
