import React from 'react';
import { Link } from "react-router-dom";
import { FaArrowRight, FaCarSide, FaComments, FaGlobeAsia, FaHandshake, FaMapMarkedAlt, FaPlaneArrival, FaRegCalendarAlt, FaTags, FaUserTie, FaWhatsapp } from 'react-icons/fa';
import SiteLayout from '../../components/SiteLayout';
import PackageCard from '../../components/PackageCard';
import Photo from '../../components/Photo';
import usePageTitle from '../../components/usePageTitle';
import { SITE, whatsappLink } from '../../data/site';
import { HOME, WHY_US } from '../../data/pages';
import { PACKAGES, RAMAYANA } from '../../data/packages';

const WHY_ICONS = [<FaMapMarkedAlt key="a" />, <FaUserTie key="b" />, <FaTags key="c" />, <FaComments key="d" />, <FaGlobeAsia key="e" />, <FaHandshake key="f" />];

const shortestTour = Math.min(...PACKAGES.map((p) => p.days));
const longestTour = Math.max(...PACKAGES.map((p) => p.days));

const HERO_FACTS = [
  { icon: <FaRegCalendarAlt />, text: `${shortestTour} to ${longestTour}-day tours` },
  { icon: <FaCarSide />, text: "Private vehicle & driver-guide" },
  { icon: <FaPlaneArrival />, text: "Airport pickup included" },
];

function Home() {
  usePageTitle(null);
  const featured = PACKAGES.filter((pkg) => pkg.featured);
  const [mainPhoto, ...sidePhotos] = HOME.heroPhotos;

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="hero-home">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <span className="hero-badge">
                <span className="hero-badge-dot" /> {SITE.yearsExperience} years guiding travellers in Sri Lanka
              </span>
              <h1 className="hero-title mt-4 mb-3">{HOME.heroTitle}</h1>
              <p className="hero-lead mb-4">{HOME.heroLead}</p>
              <div className="d-flex flex-wrap gap-2 mb-4">
                <Link className="btn btn-accent btn-lg" to="/itinerary">Explore tour packages</Link>
                <a className="btn btn-outline-light btn-lg btn-icon" href={whatsappLink("Hi Tours 999, I'd like to plan a tour of Sri Lanka.")} target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp /> Chat on WhatsApp
                </a>
              </div>
              <ul className="hero-facts list-unstyled d-flex flex-wrap gap-3 mb-0">
                {HERO_FACTS.map((fact) => (
                  <li key={fact.text}>{fact.icon} {fact.text}</li>
                ))}
              </ul>
            </div>

            <div className="col-lg-6">
              <div className="hero-mosaic">
                <Photo name={mainPhoto} alt="Sigiriya Lion Rock" className="hero-mosaic-photo" />
                {sidePhotos.map((name) => (
                  <Photo key={name} name={name} alt="Touring Sri Lanka with Tours 999" className="hero-mosaic-photo" />
                ))}
                <Link to={`/${RAMAYANA.slug}`} className="hero-float">
                  <span className="eyebrow">Special tour</span>
                  <span className="d-block fw-semibold mt-1">Ramayana Trail</span>
                  <span className="small text-secondary d-flex align-items-center gap-2">
                    5 to 8-day trails <FaArrowRight />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tour packages */}
      <section id="tours" className="py-5">
        <div className="container py-lg-4">
          <div className="text-center mb-5">
            <span className="eyebrow">{HOME.packagesEyebrow}</span>
            <h2 className="section-title mt-2">{HOME.packagesTitle}</h2>
          </div>
          <div className="row g-4">
            {featured.map((pkg) => (
              <div className="col-md-6 col-xl-3" key={pkg.slug}>
                <PackageCard pkg={pkg} />
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link className="btn btn-outline-primary" to="/itinerary">More tour packages</Link>
          </div>
        </div>
      </section>

      {/* Ramayana Trail */}
      <section className="py-5 bg-sand">
        <div className="container py-lg-4">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <Photo name={HOME.ramayanaPhoto} alt="Ramayana Trail Sri Lanka" className="feature-photo" />
            </div>
            <div className="col-lg-6">
              <span className="eyebrow">{HOME.ramayanaEyebrow}</span>
              <h2 className="section-title mt-2 mb-3">Ramayana Trail</h2>
              <p className="text-secondary mb-4">{HOME.ramayanaText}</p>
              <Link className="btn btn-primary" to={`/${RAMAYANA.slug}`}>View our package details</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-5">
        <div className="container py-lg-4">
          <div className="text-center mb-5">
            <span className="eyebrow">Why travel with us</span>
            <h2 className="section-title mt-1">Why choose {SITE.name}</h2>
          </div>
          <div className="row g-4">
            {WHY_US.map((item, index) => (
              <div className="col-md-6 col-lg-4" key={item.title}>
                <div className="d-flex gap-3">
                  <span className="feature-icon flex-shrink-0">{WHY_ICONS[index]}</span>
                  <div>
                    <h3 className="h6 mb-1">{item.title}</h3>
                    <p className="small text-secondary mb-0 text-clamp-4">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link className="btn btn-outline-primary" to="/about">More about us</Link>
          </div>
        </div>
      </section>

      {/* Memories */}
      <section className="py-5 bg-sand">
        <div className="container py-lg-4">
          <div className="text-center mb-5">
            <span className="eyebrow">{HOME.memoriesEyebrow}</span>
            <h2 className="section-title mt-2">{HOME.memoriesTitle}</h2>
          </div>
          <div className="row g-3">
            {HOME.memories.slice(0, 8).map((name) => (
              <div className="col-6 col-md-3" key={name}>
                <Photo name={name} alt="Tours 999 travellers in Sri Lanka" className="gallery-thumb" />
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link className="btn btn-outline-primary" to="/gallery">View the gallery</Link>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="pt-5 pb-2">
        <div className="container">
          <div className="cta-band p-4 p-lg-5 d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
            <div>
              <h2 className="h3 mb-1">Ready to plan your Sri Lanka trip?</h2>
              <p className="mb-0 opacity-75">Send us your dates and group size and we'll reply with a route and a quote.</p>
            </div>
            <a className="btn btn-accent btn-lg btn-icon" href={whatsappLink("Hi Tours 999, I'd like a quote for a tour.")} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp /> Get a quote
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

export default Home;
