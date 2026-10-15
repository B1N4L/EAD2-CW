import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import AdminLayout from "../../components/AdminLayout";
import DetailList from "../../components/DetailList";
import StatusBadge from "../../components/StatusBadge";

export default function ViewVehicle() {

    const [vehicle, setVehicle] = useState({
        name: "",
        type: "",
        status: "",
        nseats: ""
    });

    const { id } = useParams();

    useEffect(() => {
        loadVehicle();
    }, []);

    const loadVehicle = async () => {
        const result = await axios.get(`http://localhost:8083/vehicle-api/vehicles/${id}`);
        setVehicle(result.data);
    };

    return (
        <AdminLayout
            title={vehicle.name || `Vehicle #${id}`}
            subtitle={`Vehicle #${id}`}
            actions={
                <>
                    <Link className="btn btn-primary btn-icon" to={`/vehicles/edit/${id}`}><FaPen /> Edit</Link>
                    <Link className="btn btn-light" to="/vehicles">Back to vehicles</Link>
                </>
            }
        >
            <div className="panel p-4 p-lg-5" style={{ maxWidth: "52rem" }}>
                <DetailList items={[
                    { label: "Name", value: vehicle.name },
                    { label: "Type", value: <span className="text-capitalize">{vehicle.type}</span> },
                    { label: "Seats", value: vehicle.nseats },
                    { label: "Status", value: <StatusBadge status={vehicle.status} /> },
                ]} />
            </div>
        </AdminLayout>
    );
}
