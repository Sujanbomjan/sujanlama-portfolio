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

Pushing to `main` builds and deploys the site to GitHub Pages via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

One-time setup in the GitHub repository:

1. **Settings → Pages → Build and deployment → Source:** select **GitHub Actions**. Keep the custom domain `lamasujan.com.np`.
2. **Settings → Secrets and variables → Actions:** add each `VITE_FIREBASE_*` value from `.env.example` as a repository secret.
