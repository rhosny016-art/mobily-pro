# دلّني | Dalni — Digital Marketing Agency Website

نضع عملك على خريطة النجاح — Premium Arabic (RTL) marketing agency website:
Google Maps ranking, reviews management, and paid campaigns.

## Stack

- **Frontend:** React 19 · TypeScript · Vite 7 · Tailwind CSS 4 · Framer Motion · React Router 7
- **Backend:** Express (chatbot `/api/chat` + leads `/api/contact`)
- **Deploy:** single-file build (`vite-plugin-singlefile`) → `dist/`

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000 (chat works with smart fallback)
```

Optional: create `.env.local` with `GEMINI_API_KEY` for real AI chat replies.

## Build & serve

```bash
npm run build      # → dist/ (index.html + server.cjs)
npm run start      # serves dist on :3000
```

## Structure

```
src/
  lib/            constants (content & prices), motion variants, utils, page meta
  components/
    layout/       Navbar (glass + progress + mobile menu), Footer, Layout
    ui/           Logo, Reveal, TiltCard, AnimatedCounter, Accordion, Stars, PageHero, Icon
    home/         Hero + MapCanvas + all home sections
    chat/         Dalloub AI assistant widget
  pages/          Home, Services, About, Blog, BlogPost, Contact, NotFound
server.ts         Express + Vite middleware + API routes
public/           og.jpg (social card), robots.txt
```

## Content

All site content lives in `src/lib/constants.ts` — update the WhatsApp number,
phone, packages, testimonials and blog posts there before launch.

## Quality checks

- `npm run typecheck` — strict TypeScript, zero errors
- `npm run build` — passes; ~179KB gzipped single file
- Accessibility: skip link, ARIA labels, focus-visible, `prefers-reduced-motion`
- Performance: GPU-only animations, canvas pauses offscreen, no heavy assets
