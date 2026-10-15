import React from "react";
import { Link } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import SiteLayout from "../../components/SiteLayout";
import PageBand from "../../components/PageBand";
import { GALLERY } from "../../data/photos";

export default function Gallery() {

  return (
    <SiteLayout>
      <PageBand eyebrow="Gallery" title="Memories with our happy travellers">
        Moments from tours around Sri Lanka with our guests.
      </PageBand>

      <div className="container py-5">
        {GALLERY.length === 0 ? (
          <div className="panel p-5 text-center">
            <FaCamera size={36} className="text-primary mb-3" />
            <h2 className="h5">Photos coming soon</h2>
            <p className="text-secondary mb-4">We're adding photos from recent tours. In the meantime, have a look at our tour packages.</p>
            <Link className="btn btn-primary" to="/itinerary">See tour packages</Link>
          </div>
        ) : (
          <div className="row g-3">
            {GALLERY.map((photo) => (
              <div className="col-6 col-md-4 col-lg-3" key={photo.name}>
                <a href={photo.url} target="_blank" rel="noopener noreferrer">
                  <img src={photo.url} alt="Tours 999 travellers in Sri Lanka" className="gallery-thumb" loading="lazy" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
