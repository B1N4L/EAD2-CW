import React from 'react';
import { Link } from "react-router-dom";
import { FaComments, FaGlobeAsia, FaHandshake, FaMapMarkedAlt, FaTags, FaUserTie, FaWhatsapp } from 'react-icons/fa';
import SiteLayout from '../../components/SiteLayout';
import PackageCard from '../../components/PackageCard';
import Photo from '../../components/Photo';
import usePageTitle from '../../components/usePageTitle';
import { SITE, whatsappLink } from '../../data/site';
import { HOME, WHY_US } from '../../data/pages';
import { PACKAGES, RAMAYANA } from '../../data/packages';
import { photoUrl } from '../../data/photos';

const WHY_ICONS = [<FaMapMarkedAlt key="a" />, <FaUserTie key="b" />, <FaTags key="c" />, <FaComments key="d" />, <FaGlobeAsia key="e" />, <FaHandshake key="f" />];

function Home() {
  usePageTitle(null);
  const hero = photoUrl(HOME.heroPhoto);
  const featured = PACKAGES.filter((pkg) => pkg.featured);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="hero" style={hero ? { "--hero-image": `url(${hero})` } : undefined}>
        <div className="container">
          <div className="col-lg-8">
            <span className="eyebrow">{HOME.heroEyebrow}</span>
            <h1 className="display-4 fw-bold mt-2 mb-4">{HOME.heroTitle}</h1>
            <div className="d-flex flex-wrap gap-2">
              <Link className="btn btn-accent btn-lg" to="/itinerary">View tour packages</Link>
              <a className="btn btn-outline-light btn-lg btn-icon" href={whatsappLink("Hi Tours 999, I'd like to plan a tour of Sri Lanka.")} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome */}
      <section className="py-5">
        <div className="container py-lg-4">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5 order-lg-2">
              <Photo name={HOME.welcomePhoto} alt="Travelling in Sri Lanka with Tours 999" className="feature-photo" />
            </div>
            <div className="col-lg-7">
              <span className="eyebrow">{SITE.yearsExperience} years of Sri Lanka tours</span>
              <h2 className="section-title mt-1 mb-3">{HOME.welcomeTitle}</h2>
              {HOME.welcome.map((paragraph) => <p className="text-secondary" key={paragraph}>{paragraph}</p>)}
              <div className="d-flex flex-wrap gap-2 mt-4">
                <Link className="btn btn-primary" to="/contact">Contact us</Link>
                <Link className="btn btn-outline-primary" to="/about">About us</Link>
              </div>
            </div>
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

      {/* Why us */}
      <section className="py-5 bg-sand">
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
        </div>
      </section>

      {/* Memories */}
      <section className="py-5">
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
      <section className="pt-2 pb-2">
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
