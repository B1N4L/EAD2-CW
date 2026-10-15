import React from "react";
import { TOURS } from "../../data/tours";

// Form fields shared by the public booking page and the admin edit page.
export default function BookingFields({ booking, onChange }) {
  const { name, email, budget, packCount, date, days } = booking;
  const knownTour = TOURS.some((tour) => tour.name === budget);

  return (
    <div className="row g-3">
      <div className="col-md-6">
        <label htmlFor="name" className="form-label">Full name</label>
        <input required id="name" type="text" className="form-control" placeholder="e.g. Emma Clarke"
          name="name" value={name ?? ""} onChange={onChange} />
      </div>
      <div className="col-md-6">
        <label htmlFor="email" className="form-label">Email</label>
        <input required id="email" type="email" className="form-control" placeholder="you@example.com"
          name="email" value={email ?? ""} onChange={onChange} />
      </div>
      <div className="col-12">
        <label htmlFor="budget" className="form-label">Tour package</label>
        <select required id="budget" className="form-select" name="budget" value={budget ?? ""} onChange={onChange}>
          <option value="" disabled>Select a tour</option>
          {TOURS.map((tour) => (
            <option key={tour.name} value={tour.name}>{tour.name}</option>
          ))}
          {budget && !knownTour && <option value={budget}>{budget}</option>}
        </select>
      </div>
      <div className="col-sm-4">
        <label htmlFor="packCount" className="form-label">Travellers</label>
        <input required id="packCount" type="number" className="form-control" placeholder="1–20"
          name="packCount" value={packCount ?? ""} min="1" max="20" onChange={onChange} />
      </div>
      <div className="col-sm-4">
        <label htmlFor="date" className="form-label">Arrival date</label>
        <input required id="date" type="date" className="form-control"
          name="date" value={date ?? ""} onChange={onChange} />
      </div>
      <div className="col-sm-4">
        <label htmlFor="days" className="form-label">Days</label>
        <input required id="days" type="number" className="form-control" placeholder="1–8"
          name="days" value={days ?? ""} min="1" max="8" onChange={onChange} />
      </div>
    </div>
  );
}
