// Used only at build time (scripts/prerender.mjs) to turn each page into static HTML,
// so search engines and link previews see the full page without running JavaScript.
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import AppRoutes from './AppRoutes.jsx';
import { findBlog } from './data/blogs.js';
import { setPreloaded } from './seo/preload.js';

export { metaFor, allRoutes, sitemapEntries, SITE_URL } from './seo/routes.js';

const ARTICLES = import.meta.glob('./content/blogs/*.json', { import: 'default' });

export async function render(url) {
  const slug = url.replace(/^\/+|\/+$/g, '');
  const preload = {};
  if (findBlog(slug)) preload[`article:${slug}`] = await ARTICLES[`./content/blogs/${slug}.json`]();
  setPreloaded(preload);

  const html = renderToString(
    <div className="App">
      <StaticRouter location={url}>
        <AppRoutes/>
      </StaticRouter>
    </div>
  );
  return { html, preload };
}
