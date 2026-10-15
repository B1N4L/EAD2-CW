import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import VehicleFields from "./VehicleFields";

export default function EditVehicle(){

    let navigate= useNavigate()
    const {id}= useParams()

    const [vehicle, setVehicle]= useState({
        name: "",
        type: "",
        nseats: "",
        status: ""

    });

    const onInputChange=(e)=>{
        setVehicle({...vehicle, [e.target.name]: e.target.value})
    };

    useEffect(()=>{
        loadVehicle()
    }, []);

    const onSubmit =async (e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8083/vehicle-api/vehicles/${id}`, vehicle)
        navigate("/vehicles")
    }

    const loadVehicle = async ()=>{
        const result = await axios.get(`http://localhost:8083/vehicle-api/vehicles/${id}`)
        setVehicle(result.data)
    }

    return (
    <AdminLayout title={`Edit vehicle #${id}`} subtitle={vehicle.name}>
        <div className="panel p-4 p-lg-5" style={{ maxWidth: "52rem" }}>
            <form onSubmit={(e) => onSubmit(e)}>
                <VehicleFields vehicle={vehicle} onChange={(e)=>onInputChange(e)} />
                <div className="d-flex gap-2 mt-4">
                    <button type="submit" className="btn btn-primary px-4">Save changes</button>
                    <Link className="btn btn-light" to="/vehicles">Cancel</Link>
                </div>
            </form>
        </div>
    </AdminLayout>
    )
}
