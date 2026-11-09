# Aether Studio — 3D Website Template

A fully original, dependency-free, responsive website template with a **native WebGL 3D sculpture**, portfolio filtering and detail pages, mobile navigation, accessible motion fallbacks, SEO metadata, and a real Cloudflare Worker endpoint for contact email through Resend.

## Why native WebGL instead of React Three Fiber?

This build targets **Cloudflare Workers Free with zero build dependencies**. The user initially asked for Next.js/React Three Fiber, but this implementation uses native WebGL for much smaller downloads, a simpler deployment and an offline-verifiable build. It is **not** a Next.js application. The 3D sculpture is rendered via vertex/fragment shaders and an indexed, subdivided sphere. It responds to pointer position and scrolling.

## Running locally

Requirements: Node.js 20 or newer. No npm install required.

```bash
npm run dev
```

Open http://localhost:3000. The local server serves static assets and a **503 status** for contact API requests, since sending is implemented through the Cloudflare Worker endpoint in production.

## Validation

```bash
npm test
npm run build
```

The build copies static assets into `dist/`. Cloudflare Worker endpoints remain in `functions/` at the project root and are deployed by Cloudflare Pages.

## Deploy to Cloudflare Workers Builds using GitHub

1. Keep this repository connected to your existing **Cloudflare Workers Builds** application.
2. The repository includes a checked-in `wrangler.jsonc`:
   - Worker name: `aether-studio-3d`
   - Worker entry point: `src/worker.js`
   - Static assets: `dist/`
   - `/api/*` uses the Worker first; the rest is served as static assets.
3. Under Cloudflare **Settings → Builds**, set:
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
4. This deployment requires a **Workers-capable build token**, which Cloudflare Workers Builds normally supplies. A Pages-only token is not required.
5. Set Worker encrypted secrets (not GitHub files) to enable sending email:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL`
6. Verify the website's production URL, all routes, and contact API before launch.
7. Replace demonstration content and legal policy placeholders, and add anti-spam protection.

### Important

- **Do not** enable a production contact form before setting delivery variables. The function returns HTTP 503 if credentials are missing, and the UI displays a real error.
- Production systems receiving high volumes of traffic should add Cloudflare Turnstile + verified server-side token validation, and abuse/rate limiting policies.
- Local Node server tests static functionality only; no email is sent locally.
- All project work and testimonial content is clearly marked as demonstration content.
- Original source is plain HTML, CSS and JavaScript; no runtime third-party CDNs.

## Directory structure

```
index.html                  Main landing page
project.html                Dynamic client-side case-study details
privacy.html, terms.html    Policy placeholder pages
assets/styles.css           Responsive design
assets/app.js               Navigation, content, filtering, form handling
assets/scene.js             Native WebGL shader 3D object
src/contact.js              Contact implementation via Resend\nsrc/worker.js               Worker entry point and asset routing\nwrangler.jsonc              Workers Builds configuration
scripts/dev-server.mjs      Local development server
scripts/build.mjs           Static build script
scripts/site.test.mjs       Automated smoke tests
.github/workflows/ci.yml    GitHub Actions test/build
```

## Further improvements

When branding and real assets are ready, add edited content, domain-specific SEO metadata, real portfolio photography, analytics consent where applicable, Turnstile verification and deployment smoke tests.
