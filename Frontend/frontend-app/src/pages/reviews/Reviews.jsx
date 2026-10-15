import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import AdminLayout from '../../components/AdminLayout';
import ListTable from '../../components/ListTable';
import RowActions from '../../components/RowActions';

export default function Reviews(){
    const [reviews, setReviews]=useState([]);
    const [loading, setLoading]=useState(true);
    const [error, setError]=useState("");

    useEffect(()=>{
        loadReviews();
    }, [])

    const loadReviews= async () => {
        try {
            const result =await axios.get("http://localhost:8084/review-api/reviews");
            setReviews(result.data);
            setError("");
        } catch {
            setError("Couldn't reach the review service.");
        } finally {
            setLoading(false);
        }
    }

    const deleteReview= async(id)=>{
        await axios.delete(`http://localhost:8084/review-api/reviews/${id}`)
        loadReviews();
    }

    return(
        <AdminLayout
            title="Reviews"
            subtitle={loading ? " " : `${reviews.length} customer review${reviews.length === 1 ? "" : "s"}`}
            actions={<Link className="btn btn-primary btn-icon" to="/reviews/add"><FaPlus /> Add review</Link>}
        >
            <ListTable
                columns={["ID", "Date", "From", "Review", ""]}
                loading={loading}
                error={error}
                isEmpty={reviews.length === 0}
                emptyText="No reviews yet."
            >
                {reviews.map((review)=>(
                    <tr key={review.id}>
                        <td className="text-secondary">#{review.id}</td>
                        <td className="text-nowrap">{review.date}</td>
                        <td>{review.email}</td>
                        <td style={{ minWidth: "18rem" }}>
                            <span className="fw-medium">{review.subject}</span>
                            <span className="cell-sub text-clamp">{review.description}</span>
                        </td>
                        <td>
                            <RowActions
                                label={`review #${review.id}`}
                                viewTo={`/reviews/view/${review.id}`}
                                onDelete={()=>deleteReview(review.id)}
                            />
                        </td>
                    </tr>
                ))}
            </ListTable>
        </AdminLayout>
    );
}
