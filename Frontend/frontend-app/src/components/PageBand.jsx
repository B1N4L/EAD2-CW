import React from "react";

// Sand-coloured title band at the top of inner pages.
export default function PageBand({ eyebrow, title, children }) {
  return (
    <section className="page-band py-5">
      <div className="container">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="h2 mt-1 mb-2">{title}</h1>
        {children && <div className="text-secondary" style={{ maxWidth: "44rem" }}>{children}</div>}
      </div>
    </section>
  );
}
