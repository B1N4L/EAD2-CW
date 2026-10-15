import React from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import SiteLayout from "../../components/SiteLayout";
import usePageTitle from "../../components/usePageTitle";
import { whatsappLink } from "../../data/site";
import { PACKAGES } from "../../data/packages";

export default function BlogPost({ post }) {
  usePageTitle(post.title);

  return (
    <SiteLayout>
      <section className="page-band py-5">
        <div className="container" style={{ maxWidth: "48rem" }}>
          <Link to="/blogs" className="small">← All articles</Link>
          <h1 className="h2 mt-2 mb-0">{post.title}</h1>
        </div>
      </section>

      <article className="container py-5" style={{ maxWidth: "48rem" }}>
        {post.body ? (
          post.body.map((paragraph, index) => <p key={index} className="mb-4">{paragraph}</p>)
        ) : (
          <div className="panel p-4 mb-5">
            <p className="mb-0 text-secondary">
              This article is being moved to our new website and will be back soon. Questions about
              travelling in Sri Lanka? Message us and we'll help you plan.
            </p>
          </div>
        )}

        <div className="cta-band p-4 mt-5">
          <h2 className="h5 mb-2">Plan your Sri Lanka trip with us</h2>
          <p className="small opacity-75 mb-3">Private tours with your own driver, from 5 to 10 days.</p>
          <div className="d-flex flex-wrap gap-2">
            <a className="btn btn-accent btn-icon" href={whatsappLink(`Hi Tours 999, I read "${post.title}" and have a question.`)} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp /> Ask on WhatsApp
            </a>
            {PACKAGES.slice(0, 2).map((pkg) => (
              <Link key={pkg.slug} className="btn btn-outline-light" to={`/${pkg.slug}`}>{pkg.title}</Link>
            ))}
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
