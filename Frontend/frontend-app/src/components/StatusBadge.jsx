import React from "react";

const COLORS = {
  active: "success",
  available: "success",
  unavailable: "warning",
  disabled: "secondary",
};

export default function StatusBadge({ status }) {
  if (!status) return <span className="text-secondary">—</span>;
  const color = COLORS[String(status).toLowerCase()] ?? "secondary";
  return (
    <span className={`badge rounded-pill bg-${color}-subtle text-${color}-emphasis border border-${color}-subtle text-capitalize`}>
      {status}
    </span>
  );
}
