# Demo Lab Playwright automation

This example automates the It’s Watts Demo Lab from sign-in through a safe fake checkout. It does not process payments or use real customer data.

## Setup

1. Create a Playwright project:

   ```bash
   npm init playwright@latest
   ```

2. Save `demo-lab-playwright.spec.ts` in the new project's `tests` folder.
3. Run the test:

   ```bash
   npx playwright test tests/demo-lab-playwright.spec.ts
   ```

## Test a different deployment

Use `DEMO_BASE_URL` to point the same test to a preview or local version:

```bash
DEMO_BASE_URL=https://your-preview-url.vercel.app npx playwright test tests/demo-lab-playwright.spec.ts
```

## What it covers

- Protected catalog before sign-in
- Demo credentials
- Product add-to-cart behavior
- Cart quantity state
- Promo-code feedback
- Fake checkout confirmation
