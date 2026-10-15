import axios from "axios";
import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import SiteLayout from "../../components/SiteLayout";
import BookingFields from "./BookingFields";
import { TOURS } from "../../data/tours";

const STEPS = [
  { title: "Send your request", text: "Choose a package, your arrival date and how long you'd like to stay." },
  { title: "We confirm by email", text: "Our team checks guide and vehicle availability and gets back to you." },
  { title: "Meet your guide", text: "Your guide and driver meet you on arrival and the adventure begins." },
];

export default function AddBooking() {

    const [searchParams] = useSearchParams()
    const tourFromLink = searchParams.get("tour")

    const emptyBooking = {
        name: "",
        email: "",
        budget: TOURS.some((tour) => tour.name === tourFromLink) ? tourFromLink : "",
        packCount: "",
        date: "",
        days: ""
    };

    const [booking, setBooking] = useState(emptyBooking);
    const [submitted, setSubmitted] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const onInputChange = (e) => {
        setBooking({ ...booking, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError("");
        try {
            await axios.post("http://localhost:8082/booking-api/bookings", booking)
            setSubmitted(true);
        } catch {
            setError("We couldn't send your booking. Please try again in a moment.");
        } finally {
            setSaving(false);
        }
    };

    // Function to clear the form
    const clearForm = () => {
        setBooking({ name: "", email: "", budget: "", packCount: "", date: "", days: "" });
    };

    const bookAnother = () => {
        clearForm();
        setSubmitted(false);
    };

    return (
        <SiteLayout>
            <section className="page-band py-5">
                <div className="container">
                    <span className="eyebrow">Book a tour</span>
                    <h1 className="h2 mt-1 mb-2">Plan your trip</h1>
                    <p className="text-secondary mb-0">Tell us a little about your group and we'll take care of the rest.</p>
                </div>
            </section>

            <div className="container py-5">
                <div className="row g-4">
                    <div className="col-lg-8">
                        <div className="panel p-4 p-lg-5">
                            {submitted ? (
                                <div className="text-center py-4">
                                    <FaCheckCircle className="text-success mb-3" size={48} />
                                    <h2 className="h4">Booking received</h2>
                                    <p className="text-secondary mb-4">
                                        Thanks, {booking.name}. We'll email <strong>{booking.email}</strong> to confirm
                                        your {booking.budget} for {booking.packCount} traveller{booking.packCount === "1" ? "" : "s"}.
                                    </p>
                                    <div className="d-flex flex-wrap justify-content-center gap-2">
                                        <Link className="btn btn-primary" to="/home">Back to home</Link>
                                        <button type="button" className="btn btn-outline-primary" onClick={bookAnother}>Make another booking</button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={(e) => onSubmit(e)}>
                                    <BookingFields booking={booking} onChange={(e) => onInputChange(e)} />
                                    {error && <div className="alert alert-danger mt-4 mb-0">{error}</div>}
                                    <div className="d-flex flex-wrap gap-2 mt-4">
                                        <button type="submit" className="btn btn-primary px-4" disabled={saving}>
                                            {saving ? "Sending…" : "Request booking"}
                                        </button>
                                        <button type="button" className="btn btn-light" onClick={clearForm}>
                                            Clear
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="panel p-4">
                            <h2 className="h5 mb-4">How it works</h2>
                            <ol className="list-unstyled mb-0">
                                {STEPS.map((step, index) => (
                                    <li className="d-flex gap-3 mb-3" key={step.title}>
                                        <span className="feature-icon flex-shrink-0" style={{ width: "2.25rem", height: "2.25rem", fontSize: "1rem" }}>
                                            {index + 1}
                                        </span>
                                        <div>
                                            <div className="fw-semibold">{step.title}</div>
                                            <div className="small text-secondary">{step.text}</div>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
}
