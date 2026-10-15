import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import AdminLayout from '../../components/AdminLayout';
import ListTable from '../../components/ListTable';
import RowActions from '../../components/RowActions';
import StatusBadge from '../../components/StatusBadge';

export default function Employees(){
    const [employees, setEmployees]=useState([]);
    const [loading, setLoading]=useState(true);
    const [error, setError]=useState("");

    useEffect(()=>{
        loadEmployees();
    }, [])

    const loadEmployees= async () => {
        try {
            const result =await axios.get("http://localhost:8081/employee-api/employees");
            setEmployees(result.data);
            setError("");
        } catch {
            setError("Couldn't reach the employee service.");
        } finally {
            setLoading(false);
        }
    }

    const deleteEmployee= async(id)=>{
        await axios.delete(`http://localhost:8081/employee-api/employees/${id}`)
        loadEmployees();
    }

    return(
        <AdminLayout
            title="Employees"
            subtitle={loading ? " " : `${employees.length} staff member${employees.length === 1 ? "" : "s"}`}
            actions={<Link className="btn btn-primary btn-icon" to="/employees/add"><FaPlus /> Add employee</Link>}
        >
            <ListTable
                columns={["ID", "Name", "Role", "Status", ""]}
                loading={loading}
                error={error}
                isEmpty={employees.length === 0}
                emptyText="No employees yet."
            >
                {employees.map((employee)=>(
                    <tr key={employee.id}>
                        <td className="text-secondary">#{employee.id}</td>
                        <td>
                            <span className="fw-medium">{employee.name}</span>
                            <span className="cell-sub">{employee.email}</span>
                        </td>
                        <td className="text-capitalize">{employee.role}</td>
                        <td><StatusBadge status={employee.status} /></td>
                        <td>
                            <RowActions
                                label={employee.name}
                                viewTo={`/employees/view/${employee.id}`}
                                editTo={`/employees/edit/${employee.id}`}
                                onDelete={()=>deleteEmployee(employee.id)}
                            />
                        </td>
                    </tr>
                ))}
            </ListTable>
        </AdminLayout>
    );
}
