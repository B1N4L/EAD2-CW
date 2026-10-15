import React from "react";

// Day-by-day timeline for a tour.
export default function Itinerary({ days }) {
  return (
    <ol className="timeline list-unstyled mb-0">
      {days.map((day, index) => (
        <li className="timeline-item" key={index}>
          <span className="timeline-day">Day {String(index + 1).padStart(2, "0")}</span>
          <h3 className="h6 mb-2">{day.route}</h3>
          {day.stops && (
            <ul className="small text-secondary mb-2 ps-3">
              {day.stops.map((stop) => <li key={stop}>{stop}</li>)}
            </ul>
          )}
          {day.optional && (
            <p className="small mb-2">
              <span className="fw-medium">Optional: </span>
              <span className="text-secondary">{day.optional.join(" · ")}</span>
            </p>
          )}
          {day.overnight && <p className="small text-secondary mb-0">Overnight in {day.overnight}</p>}
        </li>
      ))}
    </ol>
  );
}
