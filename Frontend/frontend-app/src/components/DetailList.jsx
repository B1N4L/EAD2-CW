import React from "react";

// Label / value pairs for the "view" pages. Empty values show a dash.
export default function DetailList({ items }) {
  return (
    <dl className="row detail-list mb-0">
      {items.map(({ label, value }) => (
        <React.Fragment key={label}>
          <dt className="col-sm-4">{label}</dt>
          <dd className="col-sm-8">{value === null || value === undefined || value === "" ? "—" : value}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
