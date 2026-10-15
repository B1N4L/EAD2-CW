import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import AdminLayout from "../../components/AdminLayout";
import DetailList from "../../components/DetailList";
import StatusBadge from "../../components/StatusBadge";

export default function ViewEmployee() {

    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        status: ""
    });

    const { id } = useParams();

    useEffect(() => {
        loadEmployee();
    }, []);

    const loadEmployee = async () => {
        const result = await axios.get(`http://localhost:8081/employee-api/employees/${id}`);
        setEmployee(result.data);
    };

    return (
        <AdminLayout
            title={employee.name || `Employee #${id}`}
            subtitle={`Employee #${id}`}
            actions={
                <>
                    <Link className="btn btn-primary btn-icon" to={`/employees/edit/${id}`}><FaPen /> Edit</Link>
                    <Link className="btn btn-light" to="/employees">Back to employees</Link>
                </>
            }
        >
            <div className="panel p-4 p-lg-5" style={{ maxWidth: "52rem" }}>
                <DetailList items={[
                    { label: "Name", value: employee.name },
                    { label: "Email", value: employee.email },
                    { label: "Role", value: <span className="text-capitalize">{employee.role}</span> },
                    { label: "Status", value: <StatusBadge status={employee.status} /> },
                    { label: "Password", value: "Hidden" },
                ]} />
            </div>
        </AdminLayout>
    );
}
