import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import EmployeeFields from "./EmployeeFields";

export default function EditEmployee(){

    let navigate= useNavigate()
    const {id}= useParams()

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

    useEffect(()=>{
        loadEmployee()
    }, []);

    const onSubmit =async (e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8081/employee-api/employees/${id}`, employee)
        navigate("/employees")
    }

    const loadEmployee = async ()=>{
        const result = await axios.get(`http://localhost:8081/employee-api/employees/${id}`)
        setEmployee(result.data)
    }

    return (
    <AdminLayout title={`Edit employee #${id}`} subtitle={employee.name}>
        <div className="panel p-4 p-lg-5" style={{ maxWidth: "52rem" }}>
            <form onSubmit={(e) => onSubmit(e)}>
                <EmployeeFields employee={employee} onChange={(e)=>onInputChange(e)} />
                <div className="d-flex gap-2 mt-4">
                    <button type="submit" className="btn btn-primary px-4">Save changes</button>
                    <Link className="btn btn-light" to="/employees">Cancel</Link>
                </div>
            </form>
        </div>
    </AdminLayout>
    )
}
