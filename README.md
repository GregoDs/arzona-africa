# Arzona Africa Resource Centre

React and Vite website with Home, About Us and Services pages. Contact links open the shared footer contact section. No backend or environment variables are required.

## Local development

Use Node.js 22 (22.12 or newer within the 22.x release line).

```sh
npm ci
npm run dev
```

## Production verification

```sh
npm run check
npm run preview
```

The check runs ESLint, builds the site and verifies deployed image/font paths, case-sensitive filenames, the favicon and page routing. Preview serves the `dist` output locally.

## Deploy to Vercel

Import the repository into Vercel with the project root as its Root Directory. The committed `vercel.json` supplies these settings:

- Framework: Vite
- Node.js: 22.x (from `package.json`)
- Build command: `npm run check`
- Output directory: `dist`

About Us and Services have explicit rewrites so opening or refreshing their URLs works. Images and fonts are bundled locally; no files from Downloads or localhost are needed. Fingerprinted build assets use long-lived caching; images revalidate so replacements can propagate.

After deployment, open `/`, `/about-us/` and `/services/` directly, refresh each route and confirm the browser icon. A live deployment must still be checked against its actual Vercel URL.

## Review content

The client carousel uses illustrative company logos and is labelled accordingly. Confirm actual client permissions and names before presenting them as established clients. Contact currently uses the supplied email address, not a contact form. The final custom domain is needed before adding canonical URLs and a sitemap.

Vercel documentation: https://vercel.com/docs/frameworks/frontend/vite
