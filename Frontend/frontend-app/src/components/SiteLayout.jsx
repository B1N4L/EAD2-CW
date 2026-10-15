import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaGlobeAsia } from "react-icons/fa";

// Navbar and footer shared by the public (customer-facing) pages.
export default function SiteLayout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar expand="md" variant="dark" className="site-nav py-3" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/home" className="d-flex align-items-center gap-2 fw-semibold">
            <span className="brand-mark"><FaGlobeAsia /></span>
            Saman Tours
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="site-nav" />
          <Navbar.Collapse id="site-nav">
            <Nav className="ms-auto align-items-md-center gap-md-1">
              <Nav.Link as={NavLink} to="/home" end>Home</Nav.Link>
              <Nav.Link as={Link} to="/home#tours">Tours</Nav.Link>
              <Nav.Link as={NavLink} to="/home/reviews">Write a review</Nav.Link>
              <Nav.Link as={NavLink} to="/login">Staff login</Nav.Link>
              <Link className="btn btn-accent ms-md-2 my-2 my-md-0" to="/bookings/add">
                Book a tour
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="flex-fill">{children}</main>

      <footer className="site-footer pt-5 pb-4 mt-5">
        <Container>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="d-flex align-items-center gap-2 text-white fw-semibold mb-2">
                <span className="brand-mark"><FaGlobeAsia /></span>
                Saman Tours
              </div>
              <p className="small mb-0" style={{ maxWidth: "26rem" }}>
                Guided tours across Sri Lanka: beaches, ancient cities and wildlife, planned by local experts.
              </p>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="h6 text-white">Explore</h2>
              <ul className="list-unstyled small mb-0">
                <li className="mb-1"><Link to="/home#tours">Tour packages</Link></li>
                <li className="mb-1"><Link to="/bookings/add">Book a tour</Link></li>
                <li><Link to="/home/reviews">Write a review</Link></li>
              </ul>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="h6 text-white">Staff</h2>
              <ul className="list-unstyled small mb-0">
                <li className="mb-1"><Link to="/login">Staff login</Link></li>
                <li><Link to="/admin">Admin dashboard</Link></li>
              </ul>
            </div>
          </div>
          <hr className="border-light opacity-25 my-4" />
          <p className="small mb-0">&copy; {new Date().getFullYear()} Saman Tours. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
}
