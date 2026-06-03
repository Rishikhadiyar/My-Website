# Rishi Khadiyar — Portfolio Landing Page

Immersive portfolio site built with Vite, React, Three.js (R3F), GSAP, and Lenis smooth scroll.

## Prerequisites

- Node.js 20+
- npm 10+

## Development

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm test` | Vitest smoke tests |

## Deploy

Build static assets and host on any static provider (Vercel, Netlify, Cloudflare Pages, GitHub Pages, etc.):

```bash
npm run build
```

Upload the `dist/` folder or connect the repo with build command `npm run build` and output directory `dist`.

Update `public/sitemap.xml`, `index.html` canonical/OG URLs, and `src/data/social.js` with your production domain and profile links before launch.

## Configuration

- **Content**: `src/data/projects.js`, `src/data/services.js`, `src/data/social.js`
- **SEO**: `index.html`, `public/robots.txt`, `public/sitemap.xml`
- **Work images**: `public/work/*.svg` (replace with WebP/photos when ready)

## Accessibility

- Respects `prefers-reduced-motion` (disables Lenis, section GSAP fades, marquee animation, 3D scene, custom cursor)
- Skip link, mobile nav focus trap, keyboard-focus parity on services list
