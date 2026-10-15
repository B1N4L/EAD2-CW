import React from "react";

// One dropdown for a guide, vehicle or booking id. If the saved id isn't in the
// list (e.g. the vehicle has since become unavailable) it is still shown.
function SelectField({ name, label, value, onChange, required, placeholder, items, format }) {
  const current = value === null || value === undefined ? "" : value;
  const listed = items.some((item) => String(item.id) === String(current));

  return (
    <div className="col-md-6">
      <label htmlFor={name} className="form-label">{label}</label>
      <select required={required} id={name} className="form-select" name={name} value={current} onChange={onChange}>
        <option value="">{placeholder}</option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>{format(item)}</option>
        ))}
        {current !== "" && !listed && <option value={current}>#{current} (currently assigned)</option>}
      </select>
    </div>
  );
}

const formatGuide = (e) => `${e.name} (#${e.id})`;
const formatVehicle = (v) => `${v.name} · ${v.type} · ${v.nseats} seats (#${v.id})`;
const formatBooking = (b) => `#${b.id} ${b.name} · ${b.budget} · ${b.packCount} pax · ${b.date}`;

// Form fields shared by the add and edit fleet pages. The dropdowns are filled from
// three other services: available guides, available vehicles and bookings.
export default function FleetFields({ fleet, onChange, guides, vehicles, bookings }) {
  const { description, guide1Id, guide2Id, vehicle1Id, vehicle2Id, booking1Id, booking2Id, booking3Id, booking4Id, date, nDays } = fleet;

  return (
    <>
      <h2 className="form-section-title mb-3">Tour details</h2>
      <div className="row g-3 mb-4">
        <div className="col-12">
          <label htmlFor="description" className="form-label">Fleet description</label>
          <input required id="description" type="text" className="form-control" placeholder="e.g. Cultural Triangle - November group"
            name="description" value={description ?? ""} onChange={onChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="date" className="form-label">Tour date</label>
          <input required id="date" type="date" className="form-control" name="date" value={date ?? ""} onChange={onChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="nDays" className="form-label">Tour days</label>
          <input required id="nDays" type="number" className="form-control" placeholder="1–8"
            name="nDays" value={nDays ?? ""} min="1" max="8" onChange={onChange} />
        </div>
      </div>

      <h2 className="form-section-title mb-3">Guides</h2>
      <div className="row g-3 mb-4">
        <SelectField name="guide1Id" label="Lead guide" value={guide1Id} onChange={onChange}
          placeholder="Select a guide" items={guides} format={formatGuide} />
        <SelectField name="guide2Id" label="Second guide" value={guide2Id} onChange={onChange}
          placeholder="None" items={guides} format={formatGuide} />
      </div>

      <h2 className="form-section-title mb-3">Vehicles</h2>
      <div className="row g-3 mb-4">
        <SelectField required name="vehicle1Id" label="Vehicle 1" value={vehicle1Id} onChange={onChange}
          placeholder="Select a vehicle" items={vehicles} format={formatVehicle} />
        <SelectField name="vehicle2Id" label="Vehicle 2" value={vehicle2Id} onChange={onChange}
          placeholder="None" items={vehicles} format={formatVehicle} />
      </div>

      <h2 className="form-section-title mb-3">Bookings</h2>
      <div className="row g-3">
        <SelectField required name="booking1Id" label="Booking 1" value={booking1Id} onChange={onChange}
          placeholder="Select a booking" items={bookings} format={formatBooking} />
        <SelectField name="booking2Id" label="Booking 2" value={booking2Id} onChange={onChange}
          placeholder="None" items={bookings} format={formatBooking} />
        <SelectField name="booking3Id" label="Booking 3" value={booking3Id} onChange={onChange}
          placeholder="None" items={bookings} format={formatBooking} />
        <SelectField name="booking4Id" label="Booking 4" value={booking4Id} onChange={onChange}
          placeholder="None" items={bookings} format={formatBooking} />
      </div>
    </>
  );
}
