import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import BookingFields from "./BookingFields";

export default function EditBooking() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [booking, setBooking] = useState({
    name: "",
    email: "",
    budget: "",
    packCount: "",
    date: "",
    days: "",
  });

  const onInputChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadBooking();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:8082/booking-api/bookings/${id}`,
      booking
    );
    navigate("/bookings");
  };

  const loadBooking = async () => {
    const result = await axios.get(
      `http://localhost:8082/booking-api/bookings/${id}`
    );
    setBooking(result.data);
  };

  return (
    <AdminLayout title={`Edit booking #${id}`} subtitle="Update the guest's details or travel dates.">
      <div className="panel p-4 p-lg-5" style={{ maxWidth: "52rem" }}>
        <form onSubmit={(e) => onSubmit(e)}>
          <BookingFields booking={booking} onChange={(e) => onInputChange(e)} />
          <div className="d-flex gap-2 mt-4">
            <button type="submit" className="btn btn-primary px-4">Save changes</button>
            <Link className="btn btn-light" to="/bookings">Cancel</Link>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
