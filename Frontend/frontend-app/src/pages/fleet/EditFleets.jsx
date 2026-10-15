import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import FleetFields from "./FleetFields";

export default function EditFleet(){
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [employees, setEmployees] = useState([]);

    let navigate= useNavigate()
    const {id}= useParams()

    const [fleet, setFleet]= useState({
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

    const onInputChange = (e) => {
      setFleet({ ...fleet, [e.target.name]: e.target.value || "" });
    };

    useEffect(()=>{
        loadFleet()
        loadVehicles();
        loadBookings();
        loadEmployees();
    }, []);

    const loadFleet = async ()=>{
        const result = await axios.get(`http://localhost:8085/fleet-api/fleets/${id}`)
        setFleet(result.data)
    }
    const loadVehicles = async () => {
      const result = await axios.get("http://localhost:8083/vehicle-api/available-vehicles");
      setVehicles(result.data);
    };

    const loadBookings = async () => {
      const result = await axios.get("http://localhost:8082/booking-api/bookings");
      setBookings(result.data);
    };

    const loadEmployees = async () => {
      const result = await axios.get("http://localhost:8081/employee-api/available-guides");
      setEmployees(result.data);
    };

    const onSubmit =async (e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8085/fleet-api/fleets/${id}`, fleet)
        navigate("/fleets")
    }


    return (
    <AdminLayout title={`Edit fleet #${id}`} subtitle={fleet.description}>
        <div className="panel p-4 p-lg-5" style={{ maxWidth: "60rem" }}>
            <form onSubmit={(e) => onSubmit(e)}>
                <FleetFields fleet={fleet} onChange={(e)=>onInputChange(e)}
                    guides={employees} vehicles={vehicles} bookings={bookings} />
                <div className="d-flex gap-2 mt-4">
                    <button type="submit" className="btn btn-primary px-4">Save changes</button>
                    <Link className="btn btn-light" to="/fleets">Cancel</Link>
                </div>
            </form>
        </div>
    </AdminLayout>
    )
}
