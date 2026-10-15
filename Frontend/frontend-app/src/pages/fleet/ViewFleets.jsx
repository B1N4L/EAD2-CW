import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaBus, FaCalendarCheck, FaPen, FaUserTie } from "react-icons/fa";
import AdminLayout from "../../components/AdminLayout";
import DetailList from "../../components/DetailList";

// A panel listing the guides, vehicles or bookings assigned to the fleet.
function AssignedPanel({ icon, title, ids, lookup, render, emptyText }) {
    const assigned = ids.filter((id) => id !== null && id !== undefined && id !== "");
    return (
        <div className="panel h-100">
            <div className="d-flex align-items-center gap-2 p-3 px-4 border-bottom">
                <span className="text-primary">{icon}</span>
                <h2 className="h6 mb-0">{title}</h2>
                <span className="badge rounded-pill bg-light text-secondary ms-auto">{assigned.length}</span>
            </div>
            {assigned.length === 0 ? (
                <p className="text-secondary text-center py-4 mb-0">{emptyText}</p>
            ) : (
                <ul className="list-group list-group-flush">
                    {assigned.map((id) => {
                        const item = lookup.find((entry) => String(entry.id) === String(id));
                        return (
                            <li className="list-group-item px-4 py-3" key={id}>
                                {item ? render(item) : <span className="text-secondary">#{id} (not found)</span>}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default function ViewFleet() {

    const [fleet, setFleet] = useState({
        id: "",
        description: "",
        guide1Id: "",
        guide2Id: "",
        vehicle1Id: "",
        vehicle2Id: "",
        booking1Id: "",
        booking2Id: "",
        booking3Id: "",
        booking4Id: "",
        date: "",
        nDays: ""
    });
    const [employees, setEmployees] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [bookings, setBookings] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadFleet();
        // Look up names from the other services; a service that's down just shows ids.
        axios.get("http://localhost:8081/employee-api/employees").then((r) => setEmployees(r.data)).catch(() => {});
        axios.get("http://localhost:8083/vehicle-api/vehicles").then((r) => setVehicles(r.data)).catch(() => {});
        axios.get("http://localhost:8082/booking-api/bookings").then((r) => setBookings(r.data)).catch(() => {});
    }, []);

    const loadFleet = async () => {
        const result = await axios.get(`http://localhost:8085/fleet-api/fleets/${id}`);
        setFleet(result.data);
    };

    const vehicleIds = [fleet.vehicle1Id, fleet.vehicle2Id];
    const bookingIds = [fleet.booking1Id, fleet.booking2Id, fleet.booking3Id, fleet.booking4Id];
    const seats = vehicles.filter((v) => vehicleIds.some((vid) => String(vid) === String(v.id)))
        .reduce((sum, v) => sum + Number(v.nseats || 0), 0);
    const travellers = bookings.filter((b) => bookingIds.some((bid) => String(bid) === String(b.id)))
        .reduce((sum, b) => sum + Number(b.packCount || 0), 0);

    return (
        <AdminLayout
            title={fleet.description || `Fleet #${id}`}
            subtitle={`Tour fleet #${id}`}
            actions={
                <>
                    <Link className="btn btn-primary btn-icon" to={`/fleets/edit/${id}`}><FaPen /> Edit</Link>
                    <Link className="btn btn-light" to="/fleets">Back to fleets</Link>
                </>
            }
        >
            <div className="panel p-4 mb-4">
                <DetailList items={[
                    { label: "Tour date", value: fleet.date },
                    { label: "Tour days", value: fleet.nDays },
                    { label: "Capacity", value: `${travellers} travellers booked · ${seats} seats assigned` },
                ]} />
                {travellers > seats && seats > 0 && (
                    <div className="alert alert-warning small mt-3 mb-0">
                        More travellers than seats: assign a second vehicle or a larger one.
                    </div>
                )}
            </div>

            <div className="row g-4">
                <div className="col-lg-4">
                    <AssignedPanel icon={<FaUserTie />} title="Guides" ids={[fleet.guide1Id, fleet.guide2Id]} lookup={employees}
                        emptyText="No guides assigned."
                        render={(e) => (<><span className="fw-medium">{e.name}</span><span className="cell-sub">{e.email}</span></>)} />
                </div>
                <div className="col-lg-4">
                    <AssignedPanel icon={<FaBus />} title="Vehicles" ids={vehicleIds} lookup={vehicles}
                        emptyText="No vehicles assigned."
                        render={(v) => (<><span className="fw-medium">{v.name}</span><span className="cell-sub"><span className="text-capitalize">{v.type}</span> · {v.nseats} seats</span></>)} />
                </div>
                <div className="col-lg-4">
                    <AssignedPanel icon={<FaCalendarCheck />} title="Bookings" ids={bookingIds} lookup={bookings}
                        emptyText="No bookings assigned."
                        render={(b) => (
                            <>
                                <Link to={`/bookings/view/${b.id}`} className="fw-medium text-decoration-none">{b.name}</Link>
                                <span className="cell-sub">{b.budget} · {b.packCount} travellers · {b.date}</span>
                            </>
                        )} />
                </div>
            </div>
        </AdminLayout>
    );
}
