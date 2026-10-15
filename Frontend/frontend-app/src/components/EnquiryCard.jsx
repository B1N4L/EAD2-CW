import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { SITE, whatsappLink } from "../data/site";

// Sidebar card on a tour page with ways to ask about that tour.
export default function EnquiryCard({ tourTitle, slug }) {
  return (
    <div className="panel p-4 sticky-lg-top" style={{ top: "1.5rem" }}>
      <h2 className="h5 mb-2">Plan this tour</h2>
      <p className="small text-secondary mb-4">
        Tell us your dates and group size. We'll reply with a quote and can adjust the route to suit you.
      </p>
      <div className="d-grid gap-2">
        <a className="btn btn-whatsapp btn-icon justify-content-center" target="_blank" rel="noopener noreferrer"
          href={whatsappLink(`Hi Tours 999, I'm interested in the ${tourTitle}.`)}>
          <FaWhatsapp /> Ask on WhatsApp
        </a>
        <Link className="btn btn-outline-primary" to={`/contact?package=${slug}`}>Send an enquiry</Link>
      </div>
      <hr className="my-4" />
      <ul className="list-unstyled small mb-0">
        <li className="d-flex gap-2 mb-2"><FaPhoneAlt className="text-primary mt-1" /><a href={SITE.phoneHref}>{SITE.phone}</a></li>
        <li className="d-flex gap-2"><FaEnvelope className="text-primary mt-1" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
      </ul>
    </div>
  );
}
