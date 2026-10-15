import React, { useState } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "../../components/SiteLayout";
import Photo from "../../components/Photo";
import PhotoStrip from "../../components/PhotoStrip";
import IncludedList from "../../components/IncludedList";
import EnquiryCard from "../../components/EnquiryCard";
import { RAMAYANA } from "../../data/packages";

export default function RamayanaTrail() {
  const [active, setActive] = useState(0);
  const [showFullStory, setShowFullStory] = useState(false);
  const variant = RAMAYANA.variants[active];
  const story = showFullStory ? RAMAYANA.story : RAMAYANA.story.slice(0, 3);

  return (
    <SiteLayout>
      <section className="page-band py-5">
        <div className="container">
          <Link to="/itinerary" className="small">← All tour packages</Link>
          <span className="eyebrow d-block mt-3">Ramayana Trail Sri Lanka</span>
          <h1 className="h2 mt-1 mb-0">{RAMAYANA.title}</h1>
        </div>
      </section>

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-8">
            <Photo name={RAMAYANA.cover} alt="Ramayana Trail Sri Lanka" className="detail-photo mb-4" />
            {story.map((paragraph) => <p className="text-secondary mb-3" key={paragraph}>{paragraph}</p>)}
            {RAMAYANA.story.length > 3 && (
              <button type="button" className="btn btn-link px-0 mb-4" onClick={() => setShowFullStory(!showFullStory)}>
                {showFullStory ? "Show less" : "Read the full story"}
              </button>
            )}

            <h2 className="h4 mt-4 mb-3">Itinerary</h2>
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
                  <Photo name={variant.photos[0]} alt={`Ramayana Trail, ${variant.label}`} className="gallery-thumb" />
                </div>
                <div className="col-md-7">
                  <h3 className="h5 mb-4">{variant.label} Trail</h3>
                  <ol className="timeline list-unstyled mb-0">
                    {variant.days.map((day, index) => (
                      <li className="timeline-item" key={index}>
                        <span className="timeline-day">Day {String(index + 1).padStart(2, "0")}</span>
                        <p className="small fw-medium mb-0">{day}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            <h2 className="h4 mb-4">What's included</h2>
            <div className="panel p-4 mb-5">
              <IncludedList includes={RAMAYANA.includes} excludes={RAMAYANA.excludes} />
            </div>

            <PhotoStrip names={variant.photos.slice(1, 4)} alt="Ramayana Trail Sri Lanka" />
          </div>

          <div className="col-lg-4">
            <EnquiryCard tourTitle={`Ramayana Trail (${variant.label})`} slug={RAMAYANA.slug} />
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
