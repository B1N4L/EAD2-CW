import React from 'react';
import { Link } from "react-router-dom";
import { FaComments, FaGlobeAsia, FaHandshake, FaMapMarkedAlt, FaTags, FaUserTie, FaWhatsapp } from 'react-icons/fa';
import SiteLayout from '../../components/SiteLayout';
import PackageCard from '../../components/PackageCard';
import Photo from '../../components/Photo';
import usePageTitle from '../../components/usePageTitle';
import { SITE, WHY_US, whatsappLink } from '../../data/site';
import { PACKAGES, RAMAYANA } from '../../data/packages';
import { GALLERY, photoUrl } from '../../data/photos';

const WHY_ICONS = [<FaMapMarkedAlt key="a" />, <FaUserTie key="b" />, <FaTags key="c" />, <FaComments key="d" />, <FaGlobeAsia key="e" />, <FaHandshake key="f" />];

function Home() {
  usePageTitle(null);
  const hero = photoUrl("hero.jpg");

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="hero" style={hero ? { "--hero-image": `url(${hero})` } : undefined}>
        <div className="container">
          <div className="col-lg-7">
            <span className="eyebrow">Private tours with your own driver</span>
            <h1 className="display-4 fw-bold mt-2 mb-3">Explore Sri Lanka at your own pace</h1>
            <p className="lead mb-4">
              Tailor-made tours with airport pickup, an air-conditioned vehicle and an
              English-speaking driver from the day you land to the day you leave.
            </p>
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
            <div className="col-lg-7">
              <span className="eyebrow">Welcome to {SITE.name}</span>
              <h2 className="section-title mt-1 mb-3">Your local travel partner in Sri Lanka</h2>
              <p className="text-secondary">
                {SITE.name} is a Sri Lankan tour company based in Nittambuwa. For more than six years we
                have been showing visitors the island's ancient cities, tea country, wildlife and beaches
                on private tours planned around them.
              </p>
              <p className="text-secondary mb-4">
                Choose one of our packages or tell us what you'd like to see, and we'll put together a
                route, a vehicle and a driver that fit your group.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <Link className="btn btn-primary" to="/contact">Contact us</Link>
                <Link className="btn btn-outline-primary" to="/about">About us</Link>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="row g-3 text-center">
                <div className="col-6">
                  <div className="panel p-4 h-100">
                    <div className="stat-value text-primary">{SITE.yearsExperience}</div>
                    <div className="small text-secondary">Years guiding visitors</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="panel p-4 h-100">
                    <div className="stat-value text-primary">{PACKAGES.length + 1}</div>
                    <div className="small text-secondary">Ready-made tour packages</div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="panel p-4">
                    <div className="small text-secondary mb-1">Travellers from</div>
                    <div className="fw-medium">{SITE.travellerCountries.join(" · ")}</div>
                  </div>
                </div>
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
              <Photo name={RAMAYANA.cover} alt="Ramayana Trail Sri Lanka" className="feature-photo" />
            </div>
            <div className="col-lg-6">
              <span className="eyebrow">Special tour</span>
              <h2 className="section-title mt-1 mb-3">{RAMAYANA.title}</h2>
              <p className="text-secondary mb-3">{RAMAYANA.summary}</p>
              <p className="small text-secondary mb-4">Available as 5, 6, 7 or 8-day trails, with hotels and meals included.</p>
              <Link className="btn btn-primary" to={`/${RAMAYANA.slug}`}>Explore the trail</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tour packages */}
      <section id="tours" className="py-5">
        <div className="container py-lg-4">
          <div className="text-center mb-5">
            <span className="eyebrow">Tour packages</span>
            <h2 className="section-title mt-1">Popular Sri Lanka tours</h2>
          </div>
          <div className="row g-4">
            {PACKAGES.map((pkg) => (
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
                    <p className="small text-secondary mb-0">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      {GALLERY.length > 0 && (
        <section className="py-5">
          <div className="container py-lg-4">
            <div className="text-center mb-5">
              <span className="eyebrow">Gallery</span>
              <h2 className="section-title mt-1">Memories with our travellers</h2>
            </div>
            <div className="row g-3">
              {GALLERY.slice(0, 8).map((photo) => (
                <div className="col-6 col-md-3" key={photo.name}>
                  <img src={photo.url} alt="Tours 999 travellers in Sri Lanka" className="gallery-thumb" loading="lazy" />
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <Link className="btn btn-outline-primary" to="/gallery">View the gallery</Link>
            </div>
          </div>
        </section>
      )}

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
