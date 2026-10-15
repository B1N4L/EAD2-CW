import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { FaBus, FaCalendarCheck, FaRoute, FaStar, FaUsers } from 'react-icons/fa';
import AdminLayout from '../../components/AdminLayout';

const ENDPOINTS = {
  bookings: "http://localhost:8082/booking-api/bookings",
  fleets: "http://localhost:8085/fleet-api/fleets",
  vehicles: "http://localhost:8083/vehicle-api/vehicles",
  employees: "http://localhost:8081/employee-api/employees",
  reviews: "http://localhost:8084/review-api/reviews",
};

function todayIso() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function Admin() {
  // Each entry is the service's list, null if that service couldn't be reached, or undefined while loading.
  const [data, setData] = useState({});

  useEffect(() => {
    const keys = Object.keys(ENDPOINTS);
    Promise.allSettled(keys.map((key) => axios.get(ENDPOINTS[key]))).then((results) => {
      const next = {};
      results.forEach((result, i) => {
        next[keys[i]] = result.status === "fulfilled" ? result.value.data : null;
      });
      setData(next);
    });
  }, []);

  const count = (key) => (data[key] === undefined ? "…" : data[key] === null ? "—" : data[key].length);
  const today = todayIso();

  const availableVehicles = data.vehicles ? data.vehicles.filter((v) => v.status === "available").length : null;
  const activeGuides = data.employees ? data.employees.filter((e) => e.role === "guide" && e.status === "active").length : null;
  const upcomingBookings = data.bookings
    ? data.bookings.filter((b) => b.date >= today).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 5)
    : [];
  const latestReviews = data.reviews ? data.reviews.slice(-3).reverse() : [];

  const stats = [
    { label: "Bookings", value: count("bookings"), hint: data.bookings ? `${data.bookings.filter((b) => b.date >= today).length} upcoming` : "", icon: <FaCalendarCheck />, to: "/bookings" },
    { label: "Tour fleets", value: count("fleets"), hint: "Guides, vehicles and bookings", icon: <FaRoute />, to: "/fleets" },
    { label: "Vehicles", value: count("vehicles"), hint: availableVehicles === null ? "" : `${availableVehicles} available`, icon: <FaBus />, to: "/vehicles" },
    { label: "Employees", value: count("employees"), hint: activeGuides === null ? "" : `${activeGuides} active guides`, icon: <FaUsers />, to: "/employees" },
    { label: "Reviews", value: count("reviews"), hint: "From customers", icon: <FaStar />, to: "/reviews" },
  ];

  return (
    <AdminLayout title="Dashboard" subtitle="An overview of Saman Tours operations.">
      <div className="row g-3 mb-4">
        {stats.map((stat) => (
          <div className="col-sm-6 col-lg" key={stat.label}>
            <Link to={stat.to} className="panel stat-card p-3 h-100">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="text-secondary fw-medium">{stat.label}</span>
                <span className="stat-icon">{stat.icon}</span>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="small text-secondary mt-1">{stat.hint}</div>
            </Link>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-lg-7">
          <div className="panel h-100">
            <div className="d-flex align-items-center justify-content-between p-3 px-4 border-bottom">
              <h2 className="h6 mb-0">Upcoming bookings</h2>
              <Link to="/bookings" className="small">View all</Link>
            </div>
            {upcomingBookings.length === 0 ? (
              <p className="text-secondary text-center py-5 mb-0">
                {data.bookings === undefined ? "Loading…" : "No upcoming bookings."}
              </p>
            ) : (
              <ul className="list-group list-group-flush">
                {upcomingBookings.map((booking) => (
                  <li className="list-group-item px-4 py-3 d-flex justify-content-between align-items-center gap-3" key={booking.id}>
                    <div>
                      <Link to={`/bookings/view/${booking.id}`} className="fw-medium text-decoration-none">{booking.name}</Link>
                      <span className="cell-sub">{booking.budget} · {booking.packCount} travellers · {booking.days} days</span>
                    </div>
                    <span className="badge rounded-pill bg-primary-subtle text-primary-emphasis text-nowrap">{booking.date}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="col-lg-5">
          <div className="panel h-100">
            <div className="d-flex align-items-center justify-content-between p-3 px-4 border-bottom">
              <h2 className="h6 mb-0">Latest reviews</h2>
              <Link to="/reviews" className="small">View all</Link>
            </div>
            {latestReviews.length === 0 ? (
              <p className="text-secondary text-center py-5 mb-0">
                {data.reviews === undefined ? "Loading…" : "No reviews yet."}
              </p>
            ) : (
              <ul className="list-group list-group-flush">
                {latestReviews.map((review) => (
                  <li className="list-group-item px-4 py-3" key={review.id}>
                    <div className="d-flex justify-content-between gap-2">
                      <Link to={`/reviews/view/${review.id}`} className="fw-medium text-decoration-none">{review.subject}</Link>
                      <span className="small text-secondary text-nowrap">{review.date}</span>
                    </div>
                    <span className="cell-sub text-clamp">{review.description}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Admin;
