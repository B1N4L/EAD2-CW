# Tours 999 — website

Static website for [Tours 999](https://tours999.com), a Sri Lankan tour company offering private tours with a driver. It replaces the old WordPress site and runs on GitHub + Netlify only: no server, database or plugins.

The site lives in [`Frontend/frontend-app`](Frontend/frontend-app). The Spring Boot folders (`adminBackend`, `booking-backend-app`, `vehicleBackend`, `ReviewBackend`, `FleetBackend`) are from the earlier EAD2 coursework project and aren't used by the site.

## Pages

| Page | URL |
|---|---|
| Home | `/` |
| Tour packages | `/itinerary` |
| 5, 7, 8 and 10-day tours | `/5-day-sri-lanka-tour-package`, `/7-day-sri-lanka-tour-package`, `/8-day-sri-lanka-tour-package`, `/10-days-tour-package` |
| Ramayana Trail | `/ramayana-trail-sri-lanka` |
| About, Gallery, Blogs, Contact | `/about`, `/gallery`, `/blogs`, `/contact` |
| Blog posts | `/<post-slug>` (same slugs as the old site) |

All URLs match the old WordPress site, so existing links and search results keep working.

There's no server, so the contact form and "Plan this tour" buttons open WhatsApp (or email) with the visitor's message already filled in.

## Editing content

| What | File |
|---|---|
| Phone, email, address, WhatsApp, Facebook, owner | [`src/data/site.js`](Frontend/frontend-app/src/data/site.js) |
| Home, About and Contact wording | [`src/data/pages.js`](Frontend/frontend-app/src/data/pages.js) |
| Tour packages, itineraries and the Ramayana Trail | [`src/data/packages.js`](Frontend/frontend-app/src/data/packages.js) |
| Blog list (titles, dates, cover photos) | [`src/data/blogs.js`](Frontend/frontend-app/src/data/blogs.js) |
| Blog article text | [`src/content/blogs/<slug>.json`](Frontend/frontend-app/src/content/blogs) |
| Photos | [`src/assets/photos/`](Frontend/frontend-app/src/assets/photos) (referenced by file name) |
| Gallery | [`src/assets/gallery/`](Frontend/frontend-app/src/assets/gallery) (every image in the folder is shown) |

All of this content was imported from the old site's WordPress export in October 2026.

## Running it locally

```bash
cd Frontend/frontend-app
npm install
npm run dev
```

Open http://localhost:5173. `npm run build` produces the static files in `dist/`; [`netlify.toml`](netlify.toml) has the build settings for Netlify.

## SEO

`npm run build` writes every page as its own HTML file ([`scripts/prerender.mjs`](Frontend/frontend-app/scripts/prerender.mjs)), so search engines and WhatsApp/Facebook link previews see the full page without running JavaScript. Each page gets its own title, description, canonical URL, share image and schema.org data (travel agency, tours, blog posts, breadcrumbs), all defined in [`src/seo/routes.js`](Frontend/frontend-app/src/seo/routes.js). The build also writes `sitemap.xml`, `robots.txt` and a `404.html` that Netlify serves with a real 404 status.

The site address used in canonical links and the sitemap is `url` in [`src/data/site.js`](Frontend/frontend-app/src/data/site.js).

## Tech

React 18, Vite 5, React Router 6, Bootstrap 5 / React-Bootstrap, React Icons.
