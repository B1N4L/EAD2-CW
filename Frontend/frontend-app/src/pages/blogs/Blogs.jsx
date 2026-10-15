import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import SiteLayout from "../../components/SiteLayout";
import PageBand from "../../components/PageBand";
import Photo from "../../components/Photo";
import usePageTitle from "../../components/usePageTitle";
import formatDate from "../../components/formatDate";
import { BLOGS } from "../../data/blogs";

export default function Blogs() {
  usePageTitle("Blogs");

  return (
    <SiteLayout>
      <PageBand eyebrow="Blogs" title="Sri Lanka travel guides">
        Ideas and practical tips for planning your trip, from the best beaches to hiking trails and festivals.
      </PageBand>

      <div className="container py-5">
        <div className="row g-4">
          {BLOGS.map((post) => (
            <div className="col-md-6 col-lg-4" key={post.slug}>
              <Link to={`/${post.slug}`} className="card tour-card blog-card h-100 text-decoration-none">
                <Photo name={post.cover} alt={post.shortTitle} className="card-img-top" />
                <div className="card-body d-flex flex-column p-4">
                  <span className="small text-secondary mb-2">{formatDate(post.date)}</span>
                  <h2 className="h6 text-body mb-2">{post.shortTitle}</h2>
                  <p className="small text-secondary text-clamp-3 flex-fill">{post.excerpt}</p>
                  <span className="small fw-medium d-inline-flex align-items-center gap-2 text-primary">Read article <FaArrowRight /></span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
