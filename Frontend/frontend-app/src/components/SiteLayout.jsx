import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaEnvelope, FaFacebookF, FaGlobeAsia, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import PoweredBy from "./PoweredBy";
import { SITE, whatsappLink } from "../data/site";
import { PACKAGES, RAMAYANA } from "../data/packages";
import { photoUrl } from "../data/photos";

function Brand() {
  const logo = photoUrl("tours_999_logo.png");
  if (logo) return <img src={logo} alt={SITE.name} height="40" />;
  return (
    <>
      <span className="brand-mark"><FaGlobeAsia /></span>
      {SITE.name}
    </>
  );
}

// Navbar, footer and WhatsApp button shared by every page.
export default function SiteLayout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar expand="lg" variant="dark" className="site-nav py-3" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 fw-semibold">
            <Brand />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="site-nav" />
          <Navbar.Collapse id="site-nav">
            <Nav className="ms-auto align-items-lg-center gap-lg-1">
              <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
              <Nav.Link as={NavLink} to="/itinerary">Tour Packages</Nav.Link>
              <Nav.Link as={NavLink} to="/about">About Us</Nav.Link>
              <Nav.Link as={NavLink} to="/gallery">Gallery</Nav.Link>
              <Nav.Link as={NavLink} to="/blogs">Blogs</Nav.Link>
              <Nav.Link as={NavLink} to="/contact">Contact Us</Nav.Link>
              <a className="btn btn-accent ms-lg-2 my-2 my-lg-0" href={whatsappLink("Hi Tours 999, I'd like to plan a tour of Sri Lanka.")} target="_blank" rel="noopener noreferrer">
                Plan my trip
              </a>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="flex-fill">{children}</main>

      <footer className="site-footer pt-5 pb-4 mt-5">
        <Container>
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="d-flex align-items-center gap-2 text-white fw-semibold mb-3">
                <Brand />
              </div>
              <p className="small mb-3" style={{ maxWidth: "24rem" }}>
                Private, tailor-made tours of Sri Lanka with your own driver, planned by a local team
                with {SITE.yearsExperience} years of experience.
              </p>
              <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="d-inline-flex align-items-center gap-2 small">
                <FaFacebookF /> Follow us on Facebook
              </a>
            </div>
            <div className="col-6 col-lg-2">
              <h2 className="h6 text-white">Quick links</h2>
              <ul className="list-unstyled small mb-0">
                <li className="mb-1"><Link to="/">Home</Link></li>
                <li className="mb-1"><Link to="/about">About Us</Link></li>
                <li className="mb-1"><Link to="/gallery">Gallery</Link></li>
                <li className="mb-1"><Link to="/blogs">Blogs</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
            <div className="col-6 col-lg-3">
              <h2 className="h6 text-white">Tour packages</h2>
              <ul className="list-unstyled small mb-0">
                {PACKAGES.map((pkg) => (
                  <li className="mb-1" key={pkg.slug}><Link to={`/${pkg.slug}`}>{pkg.title}</Link></li>
                ))}
                <li><Link to={`/${RAMAYANA.slug}`}>{RAMAYANA.title}</Link></li>
              </ul>
            </div>
            <div className="col-lg-3">
              <h2 className="h6 text-white">Contact</h2>
              <ul className="list-unstyled small mb-0">
                <li className="mb-2 d-flex gap-2"><FaPhoneAlt className="mt-1 flex-shrink-0" /><a href={SITE.phoneHref}>{SITE.phone}</a></li>
                <li className="mb-2 d-flex gap-2"><FaWhatsapp className="mt-1 flex-shrink-0" /><a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp us</a></li>
                <li className="mb-2 d-flex gap-2"><FaEnvelope className="mt-1 flex-shrink-0" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
                <li className="d-flex gap-2"><FaMapMarkerAlt className="mt-1 flex-shrink-0" /><span>{SITE.address}</span></li>
              </ul>
            </div>
          </div>
          <hr className="border-light opacity-25 my-4" />
          <div className="d-flex flex-column flex-sm-row justify-content-between gap-2">
            <p className="small mb-0">&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
            <PoweredBy />
          </div>
        </Container>
      </footer>

      <a className="whatsapp-float" href={whatsappLink("Hi Tours 999, I have a question about your tours.")}
        target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp" title="Chat with us on WhatsApp">
        <FaWhatsapp size={30} />
      </a>
    </div>
  );
}
