import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch } from 'react-icons/fa';
import AdminLayout from '../../components/AdminLayout';
import ListTable from '../../components/ListTable';
import RowActions from '../../components/RowActions';
import StatusBadge from '../../components/StatusBadge';

export default function Vehicles(){
    const [vehicles, setVehicles]=useState([]);
    const [loading, setLoading]=useState(true);
    const [error, setError]=useState("");
    const [search, setSearch]=useState("");

    useEffect(()=>{
        loadVehicles();
    }, [])

    const loadVehicles= async () => {
        try {
            const result =await axios.get("http://localhost:8083/vehicle-api/vehicles");
            setVehicles(result.data);
            setError("");
        } catch {
            setError("Couldn't reach the vehicle service.");
        } finally {
            setLoading(false);
        }
    }

    const deleteVehicle= async(id)=>{
        await axios.delete(`http://localhost:8083/vehicle-api/vehicles/${id}`)
        loadVehicles();
    }

    const query = search.trim().toLowerCase();
    const shown = vehicles.filter((vehicle) =>
        [vehicle.name, vehicle.type, vehicle.status].some((field) => String(field ?? "").toLowerCase().includes(query))
    );
    const available = vehicles.filter((vehicle) => vehicle.status === "available").length;

    return(
        <AdminLayout
            title="Vehicles"
            subtitle={loading ? " " : `${vehicles.length} vehicles · ${available} available`}
            actions={<Link className="btn btn-primary btn-icon" to="/vehicles/add"><FaPlus /> Add vehicle</Link>}
        >
            <div className="input-group mb-3" style={{ maxWidth: "24rem" }}>
                <span className="input-group-text bg-white"><FaSearch className="text-secondary" /></span>
                <input type="search" className="form-control" placeholder="Search by name, type or status"
                    aria-label="Search vehicles" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            <ListTable
                columns={["ID", "Name", "Type", "Seats", "Status", ""]}
                loading={loading}
                error={error}
                isEmpty={shown.length === 0}
                emptyText={query ? "No vehicles match your search." : "No vehicles yet."}
            >
                {shown.map((vehicle)=>(
                    <tr key={vehicle.id}>
                        <td className="text-secondary">#{vehicle.id}</td>
                        <td className="fw-medium">{vehicle.name}</td>
                        <td className="text-capitalize">{vehicle.type}</td>
                        <td>{vehicle.nseats}</td>
                        <td><StatusBadge status={vehicle.status} /></td>
                        <td>
                            <RowActions
                                label={vehicle.name}
                                viewTo={`/vehicles/view/${vehicle.id}`}
                                editTo={`/vehicles/edit/${vehicle.id}`}
                                onDelete={()=>deleteVehicle(vehicle.id)}
                            />
                        </td>
                    </tr>
                ))}
            </ListTable>
        </AdminLayout>
    );
}
