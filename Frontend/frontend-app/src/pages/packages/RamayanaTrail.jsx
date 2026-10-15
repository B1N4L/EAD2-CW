import React, { useState } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "../../components/SiteLayout";
import Photo from "../../components/Photo";
import Itinerary from "../../components/Itinerary";
import IncludedList from "../../components/IncludedList";
import EnquiryCard from "../../components/EnquiryCard";
import usePageTitle from "../../components/usePageTitle";
import { RAMAYANA } from "../../data/packages";

export default function RamayanaTrail() {
  usePageTitle("Ramayana Trail Tour Sri Lanka from India");
  const [active, setActive] = useState(0);
  const variant = RAMAYANA.variants[active];

  return (
    <SiteLayout>
      <section className="page-band py-5">
        <div className="container">
          <Link to="/itinerary" className="small">← All tour packages</Link>
          <h1 className="h2 mt-2 mb-2">{RAMAYANA.title}</h1>
          <p className="text-secondary mb-3">{RAMAYANA.tagline}</p>
          <div className="d-flex flex-wrap gap-2">
            {RAMAYANA.highlights.map((place) => <span className="tag" key={place}>{place}</span>)}
          </div>
        </div>
      </section>

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-8">
            <Photo name={RAMAYANA.cover} alt={RAMAYANA.title} className="detail-photo mb-4" />
            <p className="lead mb-5">{RAMAYANA.summary}</p>

            <h2 className="h4 mb-3">Choose your trail</h2>
            <div className="d-flex flex-wrap gap-2 mb-4" role="tablist">
              {RAMAYANA.variants.map((v, index) => (
                <button key={v.label} type="button" role="tab" aria-selected={index === active}
                  className={`btn ${index === active ? "btn-primary" : "btn-light"}`} onClick={() => setActive(index)}>
                  {v.label}
                </button>
              ))}
            </div>

            <div className="panel p-4 mb-5">
              <div className="row g-4">
                <div className="col-md-5">
                  <Photo name={variant.cover} alt={`Ramayana Trail, ${variant.label}`} className="gallery-thumb" />
                </div>
                <div className="col-md-7">
                  <h3 className="h5 mb-4">{variant.label}</h3>
                  <Itinerary days={variant.itinerary} />
                </div>
              </div>
            </div>

            <h2 className="h4 mb-4">What's included</h2>
            <div className="panel p-4 mb-5">
              <IncludedList includes={RAMAYANA.includes} excludes={RAMAYANA.excludes} />
            </div>

            <div className="row g-3">
              {RAMAYANA.photos.slice(1).map((name) => (
                <div className="col-6" key={name}>
                  <Photo name={name} alt={RAMAYANA.title} className="gallery-thumb" />
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-4">
            <EnquiryCard tourTitle={`Ramayana Trail (${variant.label})`} slug={RAMAYANA.slug} />
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
