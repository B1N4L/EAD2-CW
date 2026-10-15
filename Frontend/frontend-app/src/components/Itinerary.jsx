import React from "react";

// Day-by-day timeline for a tour. Each point is { label?, text?, sub?: [...] }.
export default function Itinerary({ days }) {
  return (
    <ol className="timeline list-unstyled mb-0">
      {days.map((day) => (
        <li className="timeline-item" key={day.day}>
          <span className="timeline-day">Day {day.day}</span>
          <h3 className="h6 mb-2">{day.title}</h3>
          <ul className="itinerary-points small mb-0">
            {day.points.map((point, index) => (
              <li key={index}>
                {point.label && <span className="fw-semibold">{point.label}{point.text ? ": " : ""}</span>}
                {point.text && <span className="text-secondary">{point.text}</span>}
                {point.sub && (
                  <ul className="mt-1">
                    {point.sub.map((item) => <li key={item} className="text-secondary">{item}</li>)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
