import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import AdminLayout from '../../components/AdminLayout';
import ListTable from '../../components/ListTable';
import RowActions from '../../components/RowActions';

export default function Bookings(){
    const [bookings, setBookings]=useState([]);
    const [loading, setLoading]=useState(true);
    const [error, setError]=useState("");

    useEffect(()=>{
        loadBookings();
    }, [])

    const loadBookings= async () => {
        try {
            const result =await axios.get("http://localhost:8082/booking-api/bookings");
            setBookings(result.data);
            setError("");
        } catch {
            setError("Couldn't reach the booking service.");
        } finally {
            setLoading(false);
        }
    }

    const deleteBooking= async(id)=>{
        await axios.delete(`http://localhost:8082/booking-api/bookings/${id}`)
        loadBookings();
    }

    return(
        <AdminLayout
            title="Bookings"
            subtitle={loading ? " " : `${bookings.length} customer booking${bookings.length === 1 ? "" : "s"}`}
            actions={<Link className="btn btn-primary btn-icon" to="/bookings/add"><FaPlus /> New booking</Link>}
        >
            <ListTable
                columns={["ID", "Guest", "Tour package", "Travellers", "Arrival", "Days", ""]}
                loading={loading}
                error={error}
                isEmpty={bookings.length === 0}
                emptyText="No bookings yet."
            >
                {bookings.map((booking)=>(
                    <tr key={booking.id}>
                        <td className="text-secondary">#{booking.id}</td>
                        <td>
                            <span className="fw-medium">{booking.name}</span>
                            <span className="cell-sub">{booking.email}</span>
                        </td>
                        <td>{booking.budget}</td>
                        <td>{booking.packCount}</td>
                        <td className="text-nowrap">{booking.date}</td>
                        <td>{booking.days}</td>
                        <td>
                            <RowActions
                                label={`booking #${booking.id}`}
                                viewTo={`/bookings/view/${booking.id}`}
                                editTo={`/bookings/edit/${booking.id}`}
                                onDelete={()=>deleteBooking(booking.id)}
                            />
                        </td>
                    </tr>
                ))}
            </ListTable>
        </AdminLayout>
    );
}
