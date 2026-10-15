import React from "react";

const ROLES = [
  { value: "admin", label: "Admin" },
  { value: "recipient", label: "Recipient" },
  { value: "manager", label: "Manager" },
  { value: "guide", label: "Guide" },
  { value: "staff", label: "Staff" },
];

const STATUSES = [
  { value: "active", label: "Active" },
  { value: "unavailable", label: "Unavailable" },
  { value: "disabled", label: "Disabled" },
];

// Form fields shared by the add and edit employee pages.
export default function EmployeeFields({ employee, onChange }) {
  const { name, email, password, role, status } = employee;

  return (
    <div className="row g-3">
      <div className="col-md-6">
        <label htmlFor="name" className="form-label">Name</label>
        <input required id="name" type="text" className="form-control" placeholder="Enter employee name"
          name="name" value={name ?? ""} onChange={onChange} />
      </div>
      <div className="col-md-6">
        <label htmlFor="email" className="form-label">Email</label>
        <input required id="email" type="email" className="form-control" placeholder="name@samantours.lk"
          name="email" value={email ?? ""} onChange={onChange} />
      </div>
      <div className="col-md-6">
        <label htmlFor="password" className="form-label">Password</label>
        <input required id="password" type="password" className="form-control" placeholder="Enter employee password"
          name="password" value={password ?? ""} onChange={onChange} autoComplete="new-password" />
      </div>
      <div className="col-md-3">
        <label htmlFor="role" className="form-label">Role</label>
        <select required id="role" className="form-select" name="role" value={role ?? ""} onChange={onChange}>
          <option value="">Select a role</option>
          {ROLES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
        </select>
      </div>
      <div className="col-md-3">
        <label htmlFor="status" className="form-label">Status</label>
        <select required id="status" className="form-select" name="status" value={status ?? ""} onChange={onChange}>
          <option value="">Select status</option>
          {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <div className="form-text">Disabled staff can't sign in.</div>
      </div>
    </div>
  );
}
