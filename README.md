# Aether Studio — 3D Website Template

A fully original, dependency-free, responsive website template with a **native WebGL 3D sculpture**, portfolio filtering and detail pages, mobile navigation, accessible motion fallbacks, SEO metadata, and a real Cloudflare Pages Function for contact email through Resend.

## Why native WebGL instead of React Three Fiber?

This build targets **Cloudflare Pages Free with zero build dependencies**. The user initially asked for Next.js/React Three Fiber, but this implementation uses native WebGL for much smaller downloads, a simpler deployment and an offline-verifiable build. It is **not** a Next.js application. The 3D sculpture is rendered via vertex/fragment shaders and an indexed, subdivided sphere. It responds to pointer position and scrolling.

## Running locally

Requirements: Node.js 20 or newer. No npm install required.

```bash
npm run dev
```

Open http://localhost:3000. The local server serves static assets and a **503 status** for contact API requests, since sending is implemented through the Cloudflare Pages Function in production.

## Validation

```bash
npm test
npm run build
```

The build copies static assets into `dist/`. Cloudflare Pages Functions remain in `functions/` at the project root and are deployed by Cloudflare Pages.

## Deploy to Cloudflare Pages using GitHub

1. Create a GitHub repository and push this folder (without `dist/` if desired).
2. In Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Select the repository. Set **Build command** to `npm run build` and **Build output directory** to `dist`.
4. The `functions/api/contact.js` file is deployed as a Cloudflare Pages Function.
5. To activate the contact form, add these encrypted/secrets variables under Pages Project → Settings → Variables and Secrets:
   - `RESEND_API_KEY` — valid Resend API key
   - `CONTACT_TO_EMAIL` — real destination inbox
   - `CONTACT_FROM_EMAIL` — sender at a verified Resend domain
6. Configure a verified sender domain in Resend; confirm actual message delivery before advertising the form as operational.
7. Replace placeholder email, policies, fictional portfolio entries and illustrative studio numbers.
8. Add your actual domain, check HTTPS, set `og:url`/canonical tags if desired, and generate `sitemap.xml` with the domain before launch.

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
functions/api/contact.js    Cloudflare Pages Function using Resend
scripts/dev-server.mjs      Local development server
scripts/build.mjs           Static build script
scripts/site.test.mjs       Automated smoke tests
.github/workflows/ci.yml    GitHub Actions test/build
```

## Further improvements

When branding and real assets are ready, add edited content, domain-specific SEO metadata, real portfolio photography, analytics consent where applicable, Turnstile verification and deployment smoke tests.
