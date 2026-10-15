import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import AdminLayout from "../../components/AdminLayout";
import DetailList from "../../components/DetailList";

export default function ViewBooking() {

    const [booking, setBooking] = useState({
        name: "",
        email: "",
        budget: "",
        packCount: "",
        date: "",
        days: ""

    });

    const { id } = useParams();

    useEffect(() => {
        loadBooking();
    }, []);

    const loadBooking = async () => {
        const result = await axios.get(`http://localhost:8082/booking-api/bookings/${id}`);
        setBooking(result.data);
    };

    return (
        <AdminLayout
            title={`Booking #${id}`}
            subtitle={booking.name}
            actions={
                <>
                    <Link className="btn btn-primary btn-icon" to={`/bookings/edit/${id}`}><FaPen /> Edit</Link>
                    <Link className="btn btn-light" to="/bookings">Back to bookings</Link>
                </>
            }
        >
            <div className="panel p-4 p-lg-5" style={{ maxWidth: "52rem" }}>
                <DetailList items={[
                    { label: "Guest name", value: booking.name },
                    { label: "Email", value: booking.email },
                    { label: "Tour package", value: booking.budget },
                    { label: "Travellers", value: booking.packCount },
                    { label: "Arrival date", value: booking.date },
                    { label: "Visiting days", value: booking.days },
                ]} />
            </div>
        </AdminLayout>
    );
}
