// Every page's URL, title, description, share image and structured data (schema.org JSON-LD).
// Used by the build step that writes each page to static HTML, and by the browser to set the tab title.
import { SITE } from "../data/site";
import { PACKAGES, RAMAYANA, findPackage } from "../data/packages";
import { BLOGS, findBlog } from "../data/blogs";
import { ABOUT, HOME } from "../data/pages";
import { photoUrl } from "../data/photos";

export const SITE_URL = SITE.url;

const clip = (text = "", max = 158) => {
  const t = text.replace(/\s+/g, " ").trim();
  return t.length <= max ? t : `${t.slice(0, max - 1).replace(/\s+\S*$/, "").replace(/[,;:–-]$/, "")}…`;
};
const imageUrl = (name) => {
  const url = photoUrl(name);
  return url ? `${SITE_URL}${url}` : null;
};

// "/about/" and "/about" are the same page; old WordPress URLs end in a slash, so canonical links do too.
export const normalisePath = (pathname) => pathname.replace(/\/+$/, "") || "/";
const canonicalFor = (path) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}/`);

const AGENCY = {
  "@type": "TravelAgency",
  "@id": `${SITE_URL}/#agency`,
  name: SITE.name,
  url: `${SITE_URL}/`,
  logo: imageUrl(SITE.logo),
  image: imageUrl(HOME.heroPhoto),
  description: "Private, tailor-made tours of Sri Lanka with an English-speaking driver-guide.",
  telephone: SITE.phone,
  email: SITE.email,
  address: { "@type": "PostalAddress", streetAddress: "No 91/3 Kalahugaswila", addressLocality: "Nittambuwa", addressCountry: "LK" },
  areaServed: { "@type": "Country", name: "Sri Lanka" },
  founder: { "@type": "Person", name: SITE.owner.name, jobTitle: SITE.owner.role },
  sameAs: [SITE.facebook],
};

const AGENCY_REF = { "@type": "TravelAgency", "@id": AGENCY["@id"], name: SITE.name, url: `${SITE_URL}/` };

const breadcrumbs = (...items) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: canonicalFor(path) })),
});

const STATIC_PAGES = {
  "/": {
    title: `${SITE.name} | Private Sri Lanka Tours with Driver`,
    description: "Private, tailor-made Sri Lanka tours with your own English-speaking driver-guide: 5 to 18-day packages, the Ramayana Trail, airport pickup and 24-hour support.",
    image: HOME.heroPhoto,
    jsonLd: [AGENCY, { "@type": "WebSite", name: SITE.name, url: `${SITE_URL}/` }],
  },
  "/itinerary": {
    title: "Sri Lanka Tour Packages",
    description: `Private Sri Lanka tour packages from ${Math.min(...PACKAGES.map((p) => p.days))} to ${Math.max(...PACKAGES.map((p) => p.days))} days with an air-conditioned vehicle and English-speaking driver-guide, plus the Ramayana Trail for travellers from India.`,
    image: PACKAGES[0]?.cover,
    jsonLd: [
      {
        "@type": "ItemList",
        name: "Sri Lanka tour packages",
        itemListElement: [...PACKAGES.map((p) => [p.title, p.slug]), [RAMAYANA.title, RAMAYANA.slug]]
          .map(([name, slug], i) => ({ "@type": "ListItem", position: i + 1, name, url: canonicalFor(`/${slug}`) })),
      },
      breadcrumbs(["Home", "/"], ["Tour packages", "/itinerary"]),
    ],
  },
  "/about": {
    title: "About Us",
    description: clip(ABOUT.intro[0]),
    image: ABOUT.photos[0],
    jsonLd: [AGENCY, breadcrumbs(["Home", "/"], ["About us", "/about"])],
  },
  "/gallery": {
    title: "Gallery",
    description: "Photos from Tours 999 trips around Sri Lanka: beaches, temples, wildlife safaris, tea country and our happy travellers.",
    image: HOME.memories[0],
    jsonLd: [breadcrumbs(["Home", "/"], ["Gallery", "/gallery"])],
  },
  "/blogs": {
    title: "Sri Lanka Travel Blog",
    description: "Sri Lanka travel guides from Tours 999: beaches, hiking, wildlife, food, festivals, culture and practical tips for planning your trip.",
    image: BLOGS[0]?.cover,
    jsonLd: [breadcrumbs(["Home", "/"], ["Blogs", "/blogs"])],
  },
  "/contact": {
    title: "Contact Us",
    description: `Plan your private Sri Lanka tour with ${SITE.name}. Call or WhatsApp ${SITE.phone} or email ${SITE.email}. We respond to all messages within 24 hours.`,
    image: HOME.heroPhoto,
    jsonLd: [AGENCY, breadcrumbs(["Home", "/"], ["Contact us", "/contact"])],
  },
};

function tourMeta(pkg) {
  const path = `/${pkg.slug}`;
  return {
    title: pkg.title,
    description: clip(`${pkg.summary} ${pkg.nights} nights / ${pkg.days} days with a private vehicle and English-speaking driver-guide.`),
    image: pkg.cover,
    jsonLd: [
      {
        "@type": "TouristTrip",
        name: pkg.title,
        description: pkg.summary,
        url: canonicalFor(path),
        image: pkg.photos.map(imageUrl).filter(Boolean),
        touristType: pkg.facts?.["Tour Type"],
        provider: AGENCY_REF,
        itinerary: {
          "@type": "ItemList",
          numberOfItems: pkg.itinerary.length,
          itemListElement: pkg.itinerary.map((d, i) => ({ "@type": "ListItem", position: i + 1, name: `Day ${d.day}: ${d.title}` })),
        },
      },
      breadcrumbs(["Home", "/"], ["Tour packages", "/itinerary"], [pkg.cardTitle ?? pkg.title, path]),
    ],
  };
}

function ramayanaMeta() {
  const path = `/${RAMAYANA.slug}`;
  const description = "Ramayana Trail tours in Sri Lanka for travellers from India: 5 to 8-day trails to Munneswaram, Sita Eliya, Ramboda Falls, Kelaniya and more, with hotels, meals and a chauffeur guide.";
  return {
    title: "Ramayana Trail Tour Sri Lanka from India",
    description,
    image: RAMAYANA.cover,
    jsonLd: [
      { "@type": "TouristTrip", name: "Ramayana Trail Sri Lanka", description, url: canonicalFor(path), image: RAMAYANA.photos.map(imageUrl).filter(Boolean), provider: AGENCY_REF },
      breadcrumbs(["Home", "/"], ["Tour packages", "/itinerary"], ["Ramayana Trail", path]),
    ],
  };
}

function blogMeta(post) {
  const path = `/${post.slug}`;
  return {
    title: post.title,
    description: clip(post.excerpt),
    image: post.cover,
    type: "article",
    published: post.date,
    jsonLd: [
      {
        "@type": "BlogPosting",
        headline: post.title.length > 110 ? post.shortTitle : post.title,
        description: clip(post.excerpt),
        datePublished: post.date,
        image: imageUrl(post.cover),
        mainEntityOfPage: canonicalFor(path),
        author: AGENCY_REF,
        publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: imageUrl(SITE.logo) } },
      },
      breadcrumbs(["Home", "/"], ["Blogs", "/blogs"], [post.shortTitle, path]),
    ],
  };
}

const NOT_FOUND = {
  title: `Page not found | ${SITE.name}`,
  description: "The page you're looking for doesn't exist.",
  notFound: true,
};

// Title, description, canonical URL, share image and JSON-LD for a URL path.
export function metaFor(pathname) {
  const path = normalisePath(pathname);
  const slug = path.slice(1);
  let meta = STATIC_PAGES[path];
  if (!meta && slug === RAMAYANA.slug) meta = ramayanaMeta();
  if (!meta && findPackage(slug)) meta = tourMeta(findPackage(slug));
  if (!meta && findBlog(slug)) meta = blogMeta(findBlog(slug));
  if (!meta) return { ...NOT_FOUND, type: "website", image: imageUrl(HOME.heroPhoto), jsonLd: [] };

  const imageName = photoUrl(meta.image) ? meta.image : HOME.heroPhoto;
  return {
    type: "website",
    ...meta,
    title: path === "/" ? meta.title : `${meta.title} | ${SITE.name}`,
    canonical: canonicalFor(path),
    // The build swaps in a 1200x630 JPEG from public/share/ when one exists for this photo.
    imageName,
    image: imageUrl(imageName),
    jsonLd: meta.jsonLd.map((item) => ({ "@context": "https://schema.org", ...item })),
  };
}

// Every page on the site, for pre-rendering and the sitemap.
export function allRoutes() {
  return [
    ...Object.keys(STATIC_PAGES),
    ...PACKAGES.map((p) => `/${p.slug}`),
    `/${RAMAYANA.slug}`,
    ...BLOGS.map((b) => `/${b.slug}`),
  ];
}

export function sitemapEntries() {
  return allRoutes().map((path) => ({ loc: canonicalFor(path), lastmod: findBlog(path.slice(1))?.date }));
}
