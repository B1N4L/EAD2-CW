import { FaCheck, FaTimes } from "react-icons/fa";

// "What's included / not included" lists for a tour.
export default function IncludedList({ includes, excludes }) {
  return (
    <div className="row g-4">
      <div className="col-md-6">
        <h3 className="h6 mb-3">Included</h3>
        <ul className="list-unstyled small mb-0">
          {includes.map((item) => (
            <li className="d-flex gap-2 mb-2" key={item}><FaCheck className="text-success mt-1 flex-shrink-0" />{item}</li>
          ))}
        </ul>
      </div>
      <div className="col-md-6">
        <h3 className="h6 mb-3">Not included</h3>
        <ul className="list-unstyled small mb-0">
          {excludes.map((item) => (
            <li className="d-flex gap-2 mb-2" key={item}><FaTimes className="text-danger mt-1 flex-shrink-0" />{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
