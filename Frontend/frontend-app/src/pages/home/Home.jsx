import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { FaMapMarkedAlt, FaQuoteLeft, FaShuttleVan, FaUserTie } from 'react-icons/fa';
import SiteLayout from '../../components/SiteLayout';
import { TOURS } from '../../data/tours';

const FEATURES = [
  { icon: <FaUserTie />, title: "Local expert guides", text: "Every tour is led by guides who know the history, wildlife and hidden corners of the island." },
  { icon: <FaShuttleVan />, title: "Comfortable vehicles", text: "From jeeps for safaris to coaches for large groups, matched to the size of your party." },
  { icon: <FaMapMarkedAlt />, title: "Plans built around you", text: "Pick a package, your dates and how many days you have. We put the trip together." },
];

function Home() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Latest three reviews; the section stays hidden if the review service is unavailable.
    axios.get("http://localhost:8084/review-api/reviews")
      .then((result) => setReviews(result.data.slice(-3).reverse()))
      .catch(() => setReviews([]));
  }, []);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="col-lg-7">
            <span className="eyebrow">Sri Lanka, your way</span>
            <h1 className="display-4 fw-bold mt-2 mb-3">Discover the island with Saman Tours</h1>
            <p className="lead mb-4">
              Discover the best tours and book your next adventure with us: golden beaches,
              ancient kingdoms and wild national parks, all in one trip.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <Link className="btn btn-accent btn-lg" to="/bookings/add">Place a booking</Link>
              <Link className="btn btn-outline-light btn-lg" to="/home#tours">Explore packages</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tour packages */}
      <section id="tours" className="py-5">
        <div className="container py-lg-4">
          <div className="text-center mb-5">
            <span className="eyebrow">Tour packages</span>
            <h2 className="section-title mt-1">Our most popular tours</h2>
          </div>
          <div className="row g-4">
            {TOURS.map((tour) => (
              <div className="col-md-6 col-lg-4" key={tour.name}>
                <div className="card tour-card h-100">
                  <img src={tour.image} className="card-img-top" alt={tour.name} />
                  <div className="card-body d-flex flex-column p-4">
                    <div className="d-flex flex-wrap gap-1 mb-3">
                      {tour.highlights.map((highlight) => (
                        <span className="tag" key={highlight}>{highlight}</span>
                      ))}
                    </div>
                    <h3 className="h5 card-title">{tour.name}</h3>
                    <p className="card-text text-secondary flex-fill">{tour.description}</p>
                    <Link className="btn btn-outline-primary mt-2" to={`/bookings/add?tour=${encodeURIComponent(tour.name)}`}>
                      Book this tour
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-5 bg-sand">
        <div className="container py-lg-4">
          <div className="text-center mb-5">
            <span className="eyebrow">Why travel with us</span>
            <h2 className="section-title mt-1">Everything handled, start to finish</h2>
          </div>
          <div className="row g-4">
            {FEATURES.map((feature) => (
              <div className="col-md-4" key={feature.title}>
                <div className="text-center px-lg-3">
                  <span className="feature-icon mb-3">{feature.icon}</span>
                  <h3 className="h5">{feature.title}</h3>
                  <p className="text-secondary mb-0">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="py-5">
          <div className="container py-lg-4">
            <div className="text-center mb-5">
              <span className="eyebrow">Reviews</span>
              <h2 className="section-title mt-1">What travellers say</h2>
            </div>
            <div className="row g-4">
              {reviews.map((review) => (
                <div className="col-md-4" key={review.id}>
                  <div className="card quote-card h-100">
                    <div className="card-body p-4">
                      <FaQuoteLeft className="quote-icon mb-3" size={22} />
                      <h3 className="h6">{review.subject}</h3>
                      <p className="text-secondary">{review.description}</p>
                      <p className="small text-secondary mb-0">{review.email} · {review.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <Link className="btn btn-outline-primary" to="/home/reviews">Share your experience</Link>
            </div>
          </div>
        </section>
      )}

      {/* Call to action */}
      <section className="pb-2">
        <div className="container">
          <div className="cta-band p-4 p-lg-5 d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
            <div>
              <h2 className="h3 mb-1">Ready for your next adventure?</h2>
              <p className="mb-0 opacity-75">Tell us your dates and group size, and we'll plan the rest.</p>
            </div>
            <Link className="btn btn-accent btn-lg" to="/bookings/add">Book a tour</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

export default Home;
