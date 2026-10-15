import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import EmployeeFields from "./EmployeeFields";

export default function AddEmployee(){

    let navigate= useNavigate()

    const [employee, setEmployee]= useState({
        name: "",
        email: "",
        password: "",
        role: "",
        status: ""
    });

    const onInputChange=(e)=>{
        setEmployee({...employee, [e.target.name]: e.target.value})
    };

    const onSubmit =async (e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8081/employee-api/employees", employee)
        navigate("/employees")
    }

    return (
    <AdminLayout title="Add employee" subtitle="Create a staff account. Guides with Active status can be assigned to fleets.">
        <div className="panel p-4 p-lg-5" style={{ maxWidth: "52rem" }}>
            <form onSubmit={(e) => onSubmit(e)}>
                <EmployeeFields employee={employee} onChange={(e)=>onInputChange(e)} />
                <div className="d-flex gap-2 mt-4">
                    <button type="submit" className="btn btn-primary px-4">Add employee</button>
                    <Link className="btn btn-light" to="/employees">Cancel</Link>
                </div>
            </form>
        </div>
    </AdminLayout>
    )
}
