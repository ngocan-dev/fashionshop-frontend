# FashionShop Frontend

Production-ready Next.js App Router frontend for a Spring Boot fashion commerce backend.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4
- TanStack Query
- React Hook Form + Zod
- Axios
- Zustand for auth/session persistence
- Vitest + Testing Library

## Setup

1. Create `.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

2. Install dependencies:

```bash
npm install
```

3. Run the app:

```bash
npm run dev
```

## Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run test`

## Route coverage

- Public: home, products, product detail, login, register, forbidden, not-found
- Customer: account, edit profile, cart, wishlist, checkout, orders, payment detail, invoice detail
- Staff: product management, product create/edit, category management, order management, order detail
- Admin: dashboard, staff accounts, customer accounts, create staff account, delete flows

## API mapping

See the endpoint mapping in the final workspace output. The service layer lives under `src/features/*/services.ts` and the route protection lives in `src/middleware.ts`.
# fashionshop-frontend-