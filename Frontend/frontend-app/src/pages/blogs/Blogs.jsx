import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import SiteLayout from "../../components/SiteLayout";
import PageBand from "../../components/PageBand";
import usePageTitle from "../../components/usePageTitle";
import { BLOGS } from "../../data/blogs";

export default function Blogs() {
  usePageTitle("Blogs");

  return (
    <SiteLayout>
      <PageBand eyebrow="Blogs" title="Sri Lanka travel guides">
        Ideas and practical tips for planning your trip, from the best beaches to hiking trails and festivals.
      </PageBand>

      <div className="container py-5">
        <div className="row g-3">
          {BLOGS.map((post) => (
            <div className="col-md-6 col-lg-4" key={post.slug}>
              <Link to={`/${post.slug}`} className="panel blog-card p-4 h-100 d-flex flex-column text-decoration-none">
                <h2 className="h6 text-body flex-fill mb-3">{post.title}</h2>
                <span className="small fw-medium d-inline-flex align-items-center gap-2">Read article <FaArrowRight /></span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
