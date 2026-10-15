import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AdminLayout from '../../components/AdminLayout'
import ReviewFields from './ReviewFields'

export default function AddReview(){

    let navigate= useNavigate()

    const [review, setReview]= useState({
        email: "",
        subject: "",
        description: ""
    });

    const onInputChange=(e)=>{
        setReview({...review, [e.target.name]: e.target.value})
    };

    const onSubmit =async (e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8084/review-api/reviews", review)
        navigate("/reviews")
    }

    return (
    <AdminLayout title="Add review" subtitle="Record feedback received by phone or email.">
        <div className="panel p-4 p-lg-5" style={{ maxWidth: "52rem" }}>
            <form onSubmit={(e) => onSubmit(e)}>
                <ReviewFields review={review} onChange={(e) => onInputChange(e)} />
                <div className="d-flex gap-2 mt-4">
                    <button type="submit" className="btn btn-primary px-4">Save review</button>
                    <Link className="btn btn-light" to="/reviews">Cancel</Link>
                </div>
            </form>
        </div>
    </AdminLayout>
    )
}
