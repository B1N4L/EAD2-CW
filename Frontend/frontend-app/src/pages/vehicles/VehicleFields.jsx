import React from "react";

const TYPES = [
  { value: "bus", label: "Bus" },
  { value: "van", label: "Van" },
  { value: "jeep", label: "Jeep" },
];

// Form fields shared by the add and edit vehicle pages.
export default function VehicleFields({ vehicle, onChange }) {
  const { name, type, status, nseats } = vehicle;
  const knownType = TYPES.some((t) => t.value === type);

  return (
    <div className="row g-3">
      <div className="col-12">
        <label htmlFor="name" className="form-label">Name</label>
        <input required id="name" type="text" className="form-control" placeholder="e.g. Toyota Coaster"
          name="name" value={name ?? ""} onChange={onChange} />
      </div>
      <div className="col-md-4">
        <label htmlFor="type" className="form-label">Type</label>
        <select required id="type" className="form-select" name="type" value={type ?? ""} onChange={onChange}>
          <option value="">Select vehicle type</option>
          {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          {type && !knownType && <option value={type}>{type}</option>}
        </select>
      </div>
      <div className="col-md-4">
        <label htmlFor="nseats" className="form-label">Seats</label>
        <input required id="nseats" type="number" className="form-control" placeholder="1–40"
          name="nseats" value={nseats ?? ""} min="1" max="40" onChange={onChange} />
      </div>
      <div className="col-md-4">
        <label htmlFor="status" className="form-label">Status</label>
        <select required id="status" className="form-select" name="status" value={status ?? ""} onChange={onChange}>
          <option value="">Select status</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </div>
    </div>
  );
}
