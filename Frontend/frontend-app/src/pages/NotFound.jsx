import React from "react";
import { Link } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";

export default function NotFound() {
  return (
    <SiteLayout>
      <div className="container py-5 text-center">
        <p className="eyebrow mt-5">404</p>
        <h1 className="h2">This page took a wrong turn</h1>
        <p className="text-secondary mb-4">The page you're looking for doesn't exist.</p>
        <Link className="btn btn-primary" to="/home">Back to home</Link>
      </div>
    </SiteLayout>
  );
}
