import React from "react";
import { Link } from "react-router-dom";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";

// View / edit / delete buttons for a table row. Delete asks for confirmation first.
export default function RowActions({ label, viewTo, editTo, onDelete }) {
  const confirmDelete = () => {
    if (window.confirm(`Delete ${label}? This can't be undone.`)) onDelete();
  };

  return (
    <div className="d-flex justify-content-end gap-1">
      {viewTo && (
        <Link className="btn btn-sm btn-light" to={viewTo} title={`View ${label}`} aria-label={`View ${label}`}>
          <FaEye />
        </Link>
      )}
      {editTo && (
        <Link className="btn btn-sm btn-light" to={editTo} title={`Edit ${label}`} aria-label={`Edit ${label}`}>
          <FaPen />
        </Link>
      )}
      {onDelete && (
        <button type="button" className="btn btn-sm btn-light text-danger" onClick={confirmDelete} title={`Delete ${label}`} aria-label={`Delete ${label}`}>
          <FaTrash />
        </button>
      )}
    </div>
  );
}
