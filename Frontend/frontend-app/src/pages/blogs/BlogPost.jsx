import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import SiteLayout from "../../components/SiteLayout";
import Photo from "../../components/Photo";
import { whatsappLink } from "../../data/site";
import { getPreloaded } from "../../seo/preload";
import { PACKAGES } from "../../data/packages";
import formatDate from "../../components/formatDate";

// Article text lives in src/content/blogs/<slug>.json and is only downloaded when the article is opened.
const ARTICLES = import.meta.glob("../../content/blogs/*.json", { import: "default" });

function Block({ block }) {
  switch (block.type) {
    case "heading":
      return block.level === 2 ? <h2 className="h4 mt-5 mb-3">{block.text}</h2> : <h3 className="h5 mt-4 mb-2">{block.text}</h3>;
    case "image":
      return <Photo name={block.src} alt={block.alt} className="detail-photo my-4" />;
    case "list":
      return <ul className="mb-4">{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
    case "html":
      // Imported from the owner's WordPress export and cleaned to a short list of safe tags at import time.
      return <div className="article-html" dangerouslySetInnerHTML={{ __html: block.html }} />;
    default:
      return null;
  }
}

export default function BlogPost({ post }) {
  const navigate = useNavigate();
  // On the first page load the text is already in the HTML; after moving between pages it's fetched.
  const [blocks, setBlocks] = useState(() => getPreloaded(`article:${post.slug}`) ?? null);

  useEffect(() => {
    if (blocks) return undefined;
    let cancelled = false;
    const load = ARTICLES[`../../content/blogs/${post.slug}.json`];
    (load ? load() : Promise.resolve([])).then((data) => { if (!cancelled) setBlocks(data); });
    return () => { cancelled = true; };
  }, [post.slug]);

  // Links inside the article to other pages on this site open without a full page reload.
  const onArticleClick = (e) => {
    const link = e.target.closest("a");
    const href = link?.getAttribute("href");
    if (href && href.startsWith("/") && !link.target) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <SiteLayout>
      <section className="page-band py-5">
        <div className="container" style={{ maxWidth: "48rem" }}>
          <Link to="/blogs" className="small">← All articles</Link>
          <h1 className="h2 mt-2 mb-2">{post.title}</h1>
          <p className="small text-secondary mb-0">{formatDate(post.date)}</p>
        </div>
      </section>

      <article className="container py-5 article" style={{ maxWidth: "48rem" }} onClick={onArticleClick}>
        {post.cover && <Photo name={post.cover} alt={post.shortTitle} className="detail-photo mb-4" />}
        {blocks === null ? (
          <p className="text-secondary">Loading article…</p>
        ) : (
          blocks.map((block, index) => <Block block={block} key={index} />)
        )}

        <div className="cta-band p-4 mt-5">
          <h2 className="h5 mb-2">Plan your Sri Lanka trip with us</h2>
          <p className="small opacity-75 mb-3">Private tours with your own driver-guide, from 5 to 18 days.</p>
          <div className="d-flex flex-wrap gap-2">
            <a className="btn btn-accent btn-icon" href={whatsappLink(`Hi Tours 999, I read "${post.shortTitle}" and have a question.`)} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp /> Ask on WhatsApp
            </a>
            {PACKAGES.filter((pkg) => pkg.featured).slice(0, 2).map((pkg) => (
              <Link key={pkg.slug} className="btn btn-outline-light" to={`/${pkg.slug}`}>{pkg.cardTitle}</Link>
            ))}
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
