import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaGlobeAsia, FaSignOutAlt } from "react-icons/fa";
import PoweredBy from "./PoweredBy";

const SECTIONS = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/bookings", label: "Bookings" },
  { to: "/fleets", label: "Fleets" },
  { to: "/vehicles", label: "Vehicles" },
  { to: "/employees", label: "Employees" },
  { to: "/reviews", label: "Reviews" },
];

// Shared shell for the staff pages: one navbar for every section, then a page header.
export default function AdminLayout({ title, subtitle, actions, children }) {
  return (
    <div className="admin-shell">
      <Navbar expand="lg" variant="dark" className="admin-nav py-2" collapseOnSelect>
        <Container fluid="xl">
          <Navbar.Brand as={Link} to="/admin" className="d-flex align-items-center gap-2 fw-semibold">
            <span className="brand-mark"><FaGlobeAsia /></span>
            Saman Tours
            <span className="badge rounded-pill bg-light text-dark fw-medium ms-1">Admin</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="admin-nav" />
          <Navbar.Collapse id="admin-nav">
            <Nav className="me-auto ms-lg-3 gap-lg-1">
              {SECTIONS.map((section) => (
                <Nav.Link key={section.to} as={NavLink} to={section.to} end={section.end}>
                  {section.label}
                </Nav.Link>
              ))}
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/home" className="d-flex align-items-center gap-2">
                <FaSignOutAlt /> Log out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid="xl" className="py-4">
        {(title || actions) && (
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
            <div>
              <h1 className="h3 mb-1">{title}</h1>
              {subtitle && <p className="text-secondary mb-0">{subtitle}</p>}
            </div>
            {actions && <div className="d-flex flex-wrap gap-2">{actions}</div>}
          </div>
        )}
        {children}
      </Container>

      <Container fluid="xl" className="pb-4">
        <div className="d-flex flex-column flex-sm-row justify-content-between gap-1 border-top pt-3 text-secondary">
          <p className="small mb-0">&copy; {new Date().getFullYear()} Saman Tours</p>
          <PoweredBy />
        </div>
      </Container>
    </div>
  );
}
