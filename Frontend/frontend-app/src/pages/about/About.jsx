import React from "react";
import { Link } from "react-router-dom";
import { FaBullseye, FaEye } from "react-icons/fa";
import SiteLayout from "../../components/SiteLayout";
import PageBand from "../../components/PageBand";
import Photo from "../../components/Photo";
import usePageTitle from "../../components/usePageTitle";
import { SITE, WHY_US } from "../../data/site";

// Draft wording: replace with the owner's own text from the WordPress export when it arrives.
export default function About() {
  usePageTitle("About Us");

  return (
    <SiteLayout>
      <PageBand eyebrow="About us" title={`Explore Sri Lanka with ${SITE.name}`}>
        A local team with {SITE.yearsExperience} years of experience planning private tours across the island.
      </PageBand>

      <div className="container py-5">
        <div className="row g-5 align-items-center mb-5">
          <div className="col-lg-6">
            <Photo name="img_01.jpg" alt="Travelling in Sri Lanka with Tours 999" className="feature-photo" />
          </div>
          <div className="col-lg-6">
            <h2 className="section-title mb-3">Welcome to {SITE.name}</h2>
            <p className="text-secondary">
              We are based in Nittambuwa, between Colombo and Kandy, and run private tours for couples,
              families and groups visiting Sri Lanka. Each trip comes with its own vehicle and an
              English-speaking driver who stays with you from arrival to departure.
            </p>
            <p className="text-secondary mb-4">
              Over the years we have welcomed travellers from {SITE.travellerCountries.slice(0, -1).join(", ")} and {SITE.travellerCountries.at(-1)}.
            </p>
            <Link className="btn btn-primary" to="/itinerary">See our tours</Link>
          </div>
        </div>

        <div className="panel p-4 p-lg-5 mb-5">
          <div className="row g-4 align-items-center">
            <div className="col-md-4 col-lg-3">
              <Photo name={SITE.owner.photo} alt={SITE.owner.name} className="profile-photo" />
            </div>
            <div className="col-md-8 col-lg-9">
              <span className="eyebrow">Meet the founder</span>
              <h2 className="h4 mt-1 mb-1">{SITE.owner.name}</h2>
              <p className="text-primary fw-medium mb-3">{SITE.owner.role}</p>
              <p className="text-secondary mb-0">
                {SITE.owner.name.split(" ")[0]} leads {SITE.name} and guides many of our tours personally, so the
                person you plan your trip with is often the person who shows you the island.
              </p>
            </div>
          </div>
        </div>

        <h2 className="section-title text-center mb-5">Why choose us as your travel guide?</h2>
        <div className="row g-4 mb-5">
          {WHY_US.map((item) => (
            <div className="col-md-6 col-lg-4" key={item.title}>
              <div className="panel p-4 h-100">
                <h3 className="h6 mb-2">{item.title}</h3>
                <p className="small text-secondary mb-0">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="panel p-4 h-100">
              <span className="feature-icon mb-3"><FaBullseye /></span>
              <h2 className="h5">Mission</h2>
              <p className="text-secondary mb-0">
                To give every traveller a safe, comfortable and personal way to see Sri Lanka, with honest
                prices and local knowledge at every stop.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="panel p-4 h-100">
              <span className="feature-icon mb-3"><FaEye /></span>
              <h2 className="h5">Vision</h2>
              <p className="text-secondary mb-0">
                To be the tour company travellers recommend to friends when they ask how to see the real Sri Lanka.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
