This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Google Tag Manager and GA4

This project supports Google Tag Manager in production only.

Set these environment variables:

```bash
NEXT_PUBLIC_GTM_ID=GTM-KXGDV2PF
NEXT_PUBLIC_SITE_ENV=production
```

The code also falls back to `GTM-KXGDV2PF` for production builds of this site, but keeping the env var set in hosting is still the preferred setup.

Recommended environment values:

- `production`: GTM loads and client-side events are pushed to `window.dataLayer`
- `preview`: GTM stays disabled
- `development`: GTM stays disabled

Tracked events in v1:

- `page_view` on initial load and App Router navigations
- `generate_lead` after a successful contact form submit
- `cta_click` on key buttons that route to `/contact`
- `outbound_click` on tracked external links such as LinkedIn

Suggested GTM setup:

- Add a GA4 Configuration tag and disable any automatic pageview if you want to rely on the custom `page_view` event from the app
- Add GA4 Event tags for `generate_lead`, `cta_click`, and `outbound_click`
- Map event parameters such as `page_path`, `cta_label`, `cta_location`, `form_name`, `link_url`, and `outbound_location`

QA flow:

- Use GTM Preview mode to confirm `page_view`, `cta_click`, `generate_lead`, and `outbound_click`
- Use GA4 DebugView to verify events and parameters arrive as expected
