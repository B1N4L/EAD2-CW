import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

import SiteLayout from '../../components/SiteLayout';
import ReviewFields from '../reviews/ReviewFields';

export default function AddReview() {

    const [review, setReview] = useState({
        email: "",
        subject: "",
        description: ""
    });
    const [submitted, setSubmitted] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const onInputChange = (e) => {
        setReview({...review, [e.target.name]: e.target.value});
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError("");
        try {
            await axios.post("http://localhost:8084/review-api/reviews", review);
            setSubmitted(true);
        } catch {
            setError("We couldn't send your review. Please try again in a moment.");
        } finally {
            setSaving(false);
        }
    };

    // Function to clear the form
    const onClear = () => {
        setReview({
            email: "",
            subject: "",
            description: ""
        });
    };

    return (
        <SiteLayout>
            <section className="page-band py-5">
                <div className="container">
                    <span className="eyebrow">Reviews</span>
                    <h1 className="h2 mt-1 mb-2">We value your feedback</h1>
                    <p className="text-secondary mb-0" style={{ maxWidth: "40rem" }}>
                        At Saman Tours, we strive to provide the best experiences for our customers.
                        Whether it's a compliment, suggestion, or issue, we would love to hear from you!
                    </p>
                </div>
            </section>

            <div className="container py-5">
                <div className="panel p-4 p-lg-5 mx-auto" style={{ maxWidth: "46rem" }}>
                    {submitted ? (
                        <div className="text-center py-4">
                            <FaCheckCircle className="text-success mb-3" size={48} />
                            <h2 className="h4">Thank you for your review</h2>
                            <p className="text-secondary mb-4">Your feedback helps us improve every trip.</p>
                            <Link className="btn btn-primary" to="/home">Back to home</Link>
                        </div>
                    ) : (
                        <form onSubmit={(e) => onSubmit(e)}>
                            <ReviewFields review={review} onChange={(e) => onInputChange(e)} />
                            {error && <div className="alert alert-danger mt-4 mb-0">{error}</div>}
                            <div className="d-flex gap-2 mt-4">
                                <button type="submit" className="btn btn-primary px-4" disabled={saving}>
                                    {saving ? "Sending…" : "Submit review"}
                                </button>
                                {/* Clear button to reset the form */}
                                <button type="button" className="btn btn-light" onClick={onClear}>
                                    Clear
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </SiteLayout>
    )
}
