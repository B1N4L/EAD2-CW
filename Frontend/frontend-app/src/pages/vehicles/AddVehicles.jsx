import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import VehicleFields from "./VehicleFields";

export default function AddVehicle(){

    let navigate= useNavigate()

    const [vehicle, setVehicle]= useState({
        name: "",
        type: "",
        status: "",
        nseats: ""
    });

    const onInputChange=(e)=>{
        setVehicle({...vehicle, [e.target.name]: e.target.value})
    };

    const onSubmit =async (e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8083/vehicle-api/vehicles", vehicle)
        navigate("/vehicles")
    }

    return (
    <AdminLayout title="Add vehicle" subtitle="Available vehicles can be assigned to tour fleets.">
        <div className="panel p-4 p-lg-5" style={{ maxWidth: "52rem" }}>
            <form onSubmit={(e) => onSubmit(e)}>
                <VehicleFields vehicle={vehicle} onChange={(e)=>onInputChange(e)} />
                <div className="d-flex gap-2 mt-4">
                    <button type="submit" className="btn btn-primary px-4">Add vehicle</button>
                    <Link className="btn btn-light" to="/vehicles">Cancel</Link>
                </div>
            </form>
        </div>
    </AdminLayout>
    )
}
