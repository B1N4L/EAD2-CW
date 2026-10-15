import React from "react";

// Card-wrapped table that shows loading, error and empty states in place of the rows.
export default function ListTable({ columns, loading, error, isEmpty, emptyText, children }) {
  let message = null;
  if (loading) message = "Loading…";
  else if (error) message = error;
  else if (isEmpty) message = emptyText;

  return (
    <div className="panel overflow-hidden">
      <div className="table-responsive">
        <table className="table data-table table-hover align-middle">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column} scope="col" className={column === "" ? "text-end" : undefined}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {message ? (
              <tr>
                <td colSpan={columns.length} className={`text-center py-5 ${error ? "text-danger" : "text-secondary"}`}>
                  {message}
                </td>
              </tr>
            ) : (
              children
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
