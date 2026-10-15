import React from "react";
import { resetDemoData } from "./demoApi.js";

export default function DemoBanner() {
  const reset = () => {
    resetDemoData();
    window.location.reload();
  };

  return (
    <div className="bg-warning-subtle text-dark border-bottom small py-1 px-3 d-flex flex-wrap justify-content-center align-items-center gap-2 text-center">
      <span>
        <strong>Portfolio demo:</strong>{" "}
        <span className="d-none d-md-inline">the Spring Boot services aren't running here, so sample data is stored in your browser.</span>
        <span className="d-md-none">sample data is stored in your browser.</span>
      </span>
      <button type="button" className="btn btn-link btn-sm p-0 align-baseline" onClick={reset}>
        Reset demo data
      </button>
    </div>
  );
}
