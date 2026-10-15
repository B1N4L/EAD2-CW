import React from "react";
import { Link } from "react-router-dom";
import { FaRegClock, FaRoute, FaUserFriends, FaUserTie } from "react-icons/fa";
import SiteLayout from "../../components/SiteLayout";
import Photo from "../../components/Photo";
import PhotoStrip from "../../components/PhotoStrip";
import Itinerary from "../../components/Itinerary";
import IncludedList from "../../components/IncludedList";
import EnquiryCard from "../../components/EnquiryCard";
import usePageTitle from "../../components/usePageTitle";
import { PACKAGES } from "../../data/packages";

const FACT_ICONS = { "Duration": <FaRegClock />, "Tour Type": <FaRoute />, "Group Size": <FaUserFriends />, "Tour Guide": <FaUserTie /> };

export default function PackageDetail({ pkg }) {
  usePageTitle(pkg.title);
  const others = PACKAGES.filter((p) => p.slug !== pkg.slug);
  const [heading, ...paragraphs] = pkg.intro;
  const introHeading = heading?.type === "heading" ? heading.text : null;
  const introText = (introHeading ? paragraphs : pkg.intro).map((b) => b.text);

  return (
    <SiteLayout>
      <section className="page-band py-5">
        <div className="container">
          <Link to="/itinerary" className="small">← All tour packages</Link>
          <h1 className="h2 mt-2 mb-3">{pkg.title}</h1>
          <div className="row g-3">
            {Object.entries(pkg.facts).map(([label, value]) => (
              <div className="col-6 col-lg-3" key={label}>
                <div className="d-flex gap-2 align-items-start">
                  <span className="text-primary mt-1">{FACT_ICONS[label]}</span>
                  <div>
                    <div className="small text-secondary">{label}</div>
                    <div className="small fw-medium">{value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-8">
            <Photo name={pkg.cover} alt={pkg.title} className="detail-photo mb-4" />
            {introHeading && <h2 className="h4 mb-3">{introHeading}</h2>}
            {introText.map((t) => <p className="lead fs-6 text-secondary mb-4" key={t}>{t}</p>)}

            <h2 className="h4 mt-4 mb-4">Day-by-day itinerary</h2>
            <div className="panel p-4 mb-5">
              <Itinerary days={pkg.itinerary} />
            </div>

            <h2 className="h4 mb-4">What's included</h2>
            <div className="panel p-4 mb-5">
              <IncludedList includes={pkg.includes} excludes={pkg.excludes} />
            </div>

            <PhotoStrip names={pkg.photos.filter((name) => name !== pkg.cover)} alt={pkg.title} />
          </div>

          <div className="col-lg-4">
            <EnquiryCard tourTitle={pkg.title} slug={pkg.slug} />
          </div>
        </div>

        <h2 className="h4 mt-5 mb-4">Other tours</h2>
        <div className="d-flex flex-wrap gap-2">
          {others.map((p) => (
            <Link key={p.slug} className="btn btn-light" to={`/${p.slug}`}>{p.cardTitle ?? p.title}</Link>
          ))}
          <Link className="btn btn-light" to="/ramayana-trail-sri-lanka">Ramayana Trail</Link>
        </div>
      </div>
    </SiteLayout>
  );
}
