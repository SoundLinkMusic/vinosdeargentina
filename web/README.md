# De Altura Wines — storefront (Next.js)

Next.js port of the public storefront (catalog, checkout, confirmation) for De Altura Wines.
Admin (`admin.html`) and CRM (`crm.html`) are intentionally out of scope — they stay as static
HTML until replaced by a separate Doyo OS module.

## Development

```bash
npm install
npm run dev
```

Requires `.env.local` with the Supabase and Stripe keys (see `.env.local` for the current values,
gitignored). The Stripe `create-payment-intent` Edge Function is not part of this project — it's
deployed separately in `supabase/functions/` at the repo root and is called as-is.

## Deploy

Auto-deployed by Vercel on every push to `feature/nextjs-migration`
(Root Directory: `web`, Production Branch: `feature/nextjs-migration`).
