import React from "react";
import { Link } from "react-router-dom";
import { FaRegClock } from "react-icons/fa";
import SiteLayout from "../../components/SiteLayout";
import Photo from "../../components/Photo";
import Itinerary from "../../components/Itinerary";
import IncludedList from "../../components/IncludedList";
import EnquiryCard from "../../components/EnquiryCard";
import usePageTitle from "../../components/usePageTitle";
import { PACKAGES } from "../../data/packages";

export default function PackageDetail({ pkg }) {
  usePageTitle(`${pkg.title}: ${pkg.tagline}`);
  const others = PACKAGES.filter((p) => p.slug !== pkg.slug);

  return (
    <SiteLayout>
      <section className="page-band py-5">
        <div className="container">
          <Link to="/itinerary" className="small">← All tour packages</Link>
          <h1 className="h2 mt-2 mb-2">{pkg.title}</h1>
          <p className="text-secondary mb-3">{pkg.tagline}</p>
          <div className="d-flex flex-wrap align-items-center gap-2">
            <span className="badge rounded-pill bg-primary d-inline-flex align-items-center gap-1 py-2 px-3">
              <FaRegClock /> {pkg.nights} nights / {pkg.days} days
            </span>
            {pkg.highlights.map((place) => <span className="tag" key={place}>{place}</span>)}
          </div>
        </div>
      </section>

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-8">
            <Photo name={pkg.cover} alt={pkg.title} className="detail-photo mb-4" />
            <p className="lead mb-5">{pkg.summary}</p>

            <h2 className="h4 mb-4">Day-by-day itinerary</h2>
            <div className="panel p-4 mb-5">
              <Itinerary days={pkg.itinerary} />
            </div>

            <h2 className="h4 mb-4">What's included</h2>
            <div className="panel p-4 mb-5">
              <IncludedList includes={pkg.includes} excludes={pkg.excludes} />
            </div>

            {pkg.photos.length > 1 && (
              <div className="row g-3">
                {pkg.photos.slice(1).map((name) => (
                  <div className="col-6 col-md-4" key={name}>
                    <Photo name={name} alt={pkg.title} className="gallery-thumb" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-lg-4">
            <EnquiryCard tourTitle={pkg.title} slug={pkg.slug} />
          </div>
        </div>

        <h2 className="h4 mt-5 mb-4">Other tours</h2>
        <div className="d-flex flex-wrap gap-2">
          {others.map((p) => (
            <Link key={p.slug} className="btn btn-light" to={`/${p.slug}`}>{p.title}</Link>
          ))}
          <Link className="btn btn-light" to="/ramayana-trail-sri-lanka">Ramayana Trail</Link>
        </div>
      </div>
    </SiteLayout>
  );
}
