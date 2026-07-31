# It’s Watts Demo Shop

A small, self-contained storefront for manual testing and automation practice. It includes login, search, product filters, cart quantity controls, a promo code, and a safe fake checkout.

## Demo credentials

- Email: `tester@itswatts.demo`
- Password: `DemoPass123!`
- Promo: `WELCOME10`

## Run locally

```bash
npm install
npm run dev
```

## Deploy with Vercel

Import the `itswatts` repository as a separate Vercel project and set **Root Directory** to `demo-shop`. Use the Vite framework preset. The app does not collect information or process payments.
