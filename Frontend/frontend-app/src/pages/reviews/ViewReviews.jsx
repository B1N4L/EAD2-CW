import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import DetailList from "../../components/DetailList";

export default function ViewReview() {

    const [review, setReview] = useState({
        id: "",
        email: "",
        subject: "",
        description: "",
        date: ""
    });

    const { id } = useParams();

    useEffect(() => {
        loadReview();
    }, []);

    const loadReview = async () => {
        const result = await axios.get(`http://localhost:8084/review-api/reviews/${id}`);
        setReview(result.data);
    };

    return (
        <AdminLayout
            title={`Review #${id}`}
            subtitle={review.subject}
            actions={<Link className="btn btn-light" to="/reviews">Back to reviews</Link>}
        >
            <div className="panel p-4 p-lg-5" style={{ maxWidth: "52rem" }}>
                <DetailList items={[
                    { label: "From", value: review.email },
                    { label: "Date", value: review.date },
                    { label: "Subject", value: review.subject },
                    { label: "Review", value: review.description },
                ]} />
            </div>
        </AdminLayout>
    );
}
