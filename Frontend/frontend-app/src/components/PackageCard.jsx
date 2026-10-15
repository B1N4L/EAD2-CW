import React from "react";
import { Link } from "react-router-dom";
import { FaRegClock } from "react-icons/fa";
import Photo from "./Photo";

// Card for one tour package, linking to its detail page.
export default function PackageCard({ pkg, duration }) {
  return (
    <div className="card tour-card h-100">
      <Photo name={pkg.cover} alt={pkg.title} className="card-img-top" />
      <div className="card-body d-flex flex-column p-4">
        <span className="small text-secondary d-flex align-items-center gap-2 mb-2">
          <FaRegClock /> {duration ?? `${pkg.nights} nights / ${pkg.days} days`}
        </span>
        <h3 className="h5 card-title mb-1">{pkg.title}</h3>
        <p className="small fw-medium text-primary mb-2">{pkg.tagline}</p>
        <p className="card-text text-secondary flex-fill">{pkg.summary}</p>
        <div className="d-flex flex-wrap gap-1 mb-3">
          {pkg.highlights.slice(0, 4).map((place) => (
            <span className="tag" key={place}>{place}</span>
          ))}
        </div>
        <Link className="btn btn-outline-primary" to={`/${pkg.slug}`}>More details</Link>
      </div>
    </div>
  );
}
