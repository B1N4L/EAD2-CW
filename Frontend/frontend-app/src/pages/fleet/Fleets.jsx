import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import AdminLayout from '../../components/AdminLayout';
import ListTable from '../../components/ListTable';
import RowActions from '../../components/RowActions';

const assignedCount = (...ids) => ids.filter((id) => id !== null && id !== undefined && id !== "").length;

export default function Fleets(){
    const [fleets, setFleets]=useState([]);
    const [loading, setLoading]=useState(true);
    const [error, setError]=useState("");

    useEffect(()=>{
        loadFleets();
    }, [])

    const loadFleets= async () => {
        try {
            const result =await axios.get("http://localhost:8085/fleet-api/fleets");
            setFleets(result.data);
            setError("");
        } catch {
            setError("Couldn't reach the fleet service.");
        } finally {
            setLoading(false);
        }
    }

    const deleteFleet= async(id)=>{
        await axios.delete(`http://localhost:8085/fleet-api/fleets/${id}`)
        loadFleets();
    }

    return(
        <AdminLayout
            title="Tour fleets"
            subtitle="Each fleet groups bookings with the guides and vehicles for one tour."
            actions={<Link className="btn btn-primary btn-icon" to="/fleets/add"><FaPlus /> New fleet</Link>}
        >
            <ListTable
                columns={["ID", "Tour", "Launch date", "Days", "Assigned", ""]}
                loading={loading}
                error={error}
                isEmpty={fleets.length === 0}
                emptyText="No fleets yet."
            >
                {fleets.map((fleet)=>(
                    <tr key={fleet.id}>
                        <td className="text-secondary">#{fleet.id}</td>
                        <td className="fw-medium">{fleet.description}</td>
                        <td className="text-nowrap">{fleet.date}</td>
                        <td>{fleet.nDays}</td>
                        <td>
                            <div className="d-flex flex-wrap gap-1">
                                <span className="tag">{assignedCount(fleet.guide1Id, fleet.guide2Id)} guides</span>
                                <span className="tag">{assignedCount(fleet.vehicle1Id, fleet.vehicle2Id)} vehicles</span>
                                <span className="tag">{assignedCount(fleet.booking1Id, fleet.booking2Id, fleet.booking3Id, fleet.booking4Id)} bookings</span>
                            </div>
                        </td>
                        <td>
                            <RowActions
                                label={`fleet #${fleet.id}`}
                                viewTo={`/fleets/view/${fleet.id}`}
                                editTo={`/fleets/edit/${fleet.id}`}
                                onDelete={()=>deleteFleet(fleet.id)}
                            />
                        </td>
                    </tr>
                ))}
            </ListTable>
        </AdminLayout>
    );
}
