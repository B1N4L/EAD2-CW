import React from "react";
import { Link } from "react-router-dom";
import { FaBullseye, FaEye, FaFacebookF } from "react-icons/fa";
import SiteLayout from "../../components/SiteLayout";
import PageBand from "../../components/PageBand";
import Photo from "../../components/Photo";
import PhotoStrip from "../../components/PhotoStrip";
import { SITE } from "../../data/site";
import { ABOUT, WHY_US } from "../../data/pages";

export default function About() {

  return (
    <SiteLayout>
      <PageBand eyebrow="About us" title={ABOUT.title}>
        {ABOUT.eyebrow}
      </PageBand>

      <div className="container py-5">
        <div className="row g-5 mb-5">
          <div className="col-lg-4">
            <div className="panel p-4 text-center">
              <Photo name={SITE.owner.photo} alt={SITE.owner.name} className="profile-photo mx-auto mb-3" />
              <h2 className="h5 mb-1">{SITE.owner.name}</h2>
              <p className="text-primary fw-medium mb-1">{SITE.owner.role}</p>
              <p className="small text-secondary mb-3">Sri Lanka</p>
              <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-light btn-sm btn-icon">
                <FaFacebookF /> Facebook
              </a>
            </div>
          </div>
          <div className="col-lg-8">
            {ABOUT.intro.map((paragraph) => <p className="text-secondary" key={paragraph}>{paragraph}</p>)}
            {ABOUT.whyIntro.map((paragraph) => <p className="text-secondary" key={paragraph}>{paragraph}</p>)}
            <Link className="btn btn-primary mt-2" to="/itinerary">See our tour packages</Link>
          </div>
        </div>

        <h2 className="section-title text-center mb-5">{ABOUT.whyTitle}</h2>
        <div className="row g-4 mb-5">
          {WHY_US.map((item, index) => (
            <div className="col-md-6 col-lg-4" key={item.title}>
              <div className="panel p-4 h-100">
                <span className="timeline-day">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="h6 mb-2">{item.title}</h3>
                <p className="small text-secondary mb-0">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <div className="panel p-4 h-100">
              <span className="feature-icon mb-3"><FaBullseye /></span>
              <h2 className="h5">Mission</h2>
              <p className="text-secondary mb-0">{ABOUT.mission}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="panel p-4 h-100">
              <span className="feature-icon mb-3"><FaEye /></span>
              <h2 className="h5">Vision</h2>
              <p className="text-secondary mb-0">{ABOUT.vision}</p>
            </div>
          </div>
        </div>

        <PhotoStrip names={ABOUT.photos} alt="Tours 999 travellers in Sri Lanka" />
      </div>
    </SiteLayout>
  );
}
