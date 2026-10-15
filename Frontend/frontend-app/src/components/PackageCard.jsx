import React from "react";
import { Link } from "react-router-dom";
import { FaRegClock } from "react-icons/fa";
import Photo from "./Photo";

// Card for one tour package, linking to its detail page.
export default function PackageCard({ pkg, duration }) {
  const tourTypes = pkg.facts?.["Tour Type"]?.split(",").map((t) => t.trim()) ?? [];

  return (
    <div className="card tour-card h-100">
      <Photo name={pkg.cover} alt={pkg.cardTitle ?? pkg.title} className="card-img-top" />
      <div className="card-body d-flex flex-column p-4">
        <span className="small text-secondary d-flex align-items-center gap-2 mb-2">
          <FaRegClock /> {duration ?? `${pkg.nights} nights / ${pkg.days} days`}
        </span>
        <h3 className="h5 card-title mb-2">{pkg.cardTitle ?? pkg.title}</h3>
        <p className="card-text text-secondary flex-fill">{pkg.summary}</p>
        {tourTypes.length > 0 && (
          <div className="d-flex flex-wrap gap-1 mb-3">
            {tourTypes.map((type) => <span className="tag" key={type}>{type}</span>)}
          </div>
        )}
        <Link className="btn btn-outline-primary" to={`/${pkg.slug}`}>More details</Link>
      </div>
    </div>
  );
}
