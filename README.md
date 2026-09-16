# Sujan Lama — Portfolio

Personal portfolio of **Sujan Lama**, Full Stack Developer — live at [lamasujan.com.np](https://lamasujan.com.np).

Built with React 19, TypeScript, Vite, Tailwind CSS v4, [shadcn/ui](https://ui.shadcn.com) and [animate.css](https://animate.style). The contact form stores messages in Firebase Firestore.

## Getting started

Requires Node.js 20.19+ and [pnpm](https://pnpm.io) (the version is pinned in `package.json`).

```bash
pnpm install
pnpm dev        # start the dev server
pnpm build      # type-check and build to dist/
pnpm preview    # serve the production build locally
pnpm lint       # lint with oxlint
```

## Updating content

All text — profile, work and projects, education, skills and the architecture diagram — lives in
[`src/data/portfolio.ts`](src/data/portfolio.ts). Edit that file; the components don't need to change.

| What                | Where                                   |
| ------------------- | --------------------------------------- |
| Hero photo          | `src/assets/sujan.jpg` (4:5 portrait)    |
| Resume download     | `public/Sujan-Lama-Resume.pdf`          |
| Social share image  | `public/og-image.jpg` (1200×630)        |
| Colors & animations | `src/index.css`                         |
| SEO / meta tags     | `index.html`                            |

## Project structure

```
src/
  components/
    layout/      header and footer
    sections/    hero, about, work (+ illustrations), skills, architecture, contact
    theme/       light/dark theme provider and toggle
    ui/          shadcn/ui components
    reveal.tsx   scroll-triggered animate.css entrances
  data/          portfolio content
  hooks/         in-view, active-section and scroll hooks
  lib/           Firebase client
```

## Contact form (Firebase)

Messages are stored in Cloud Firestore (Firebase project `portfolio-2439f`, set in `.firebaserc`).
Without Firebase keys, or if saving fails, visitors can still send their message as a pre-filled email.

1. In the [Firebase console](https://console.firebase.google.com), open the project and create a **Cloud Firestore** database
   (Build → Firestore Database → Create database, production mode).
2. Copy `.env.example` to `.env` and fill in the web app config values (`.env` is gitignored).
3. Deploy the security rules, which only allow creating well-formed messages (no public reads).
   Either paste `firestore.rules` into Firestore → Rules and publish, or run:
   ```bash
   pnpm dlx firebase-tools login
   pnpm dlx firebase-tools deploy --only firestore:rules
   ```
4. Messages appear in the `messages` collection in the Firebase console.

## Deployment

The site is a static build served by **Cloudflare Workers** (static assets), configured in
[`wrangler.jsonc`](wrangler.jsonc). `wrangler deploy` runs `pnpm run build` itself and uploads `dist/`.

- **Automatic:** Cloudflare Workers Builds deploys every push to `main`. Deploy command: `pnpm run deploy`
  (or `npx wrangler deploy`). A separate build command isn't required.
- **Manual:** `pnpm dlx wrangler login`, then `pnpm run deploy`.

`.env` is not committed, so add each `VITE_FIREBASE_*` value in the Cloudflare dashboard under
**Workers & Pages → sujanlama-portfolio → Settings → Build → Variables and secrets**. Otherwise the deployed contact form
falls back to email.

The custom domains `lamasujan.com.np` and `www.lamasujan.com.np` are declared under `routes` in `wrangler.jsonc`, so each
deploy keeps them attached to the Worker (Wrangler replaces conflicting DNS records when it runs in CI).

pnpm 12 only runs dependency install scripts that are approved in `pnpm-workspace.yaml` (`allowBuilds`);
`esbuild` and `workerd` must stay approved for Wrangler to install.
