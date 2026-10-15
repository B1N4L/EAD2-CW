import React from "react";
import SiteLayout from "../../components/SiteLayout";
import PageBand from "../../components/PageBand";
import PackageCard from "../../components/PackageCard";
import { PACKAGES, RAMAYANA } from "../../data/packages";
import { HOME } from "../../data/pages";

const ramayanaCard = {
  slug: RAMAYANA.slug,
  cardTitle: "Ramayana Trail Sri Lanka",
  summary: "Visit the places in Sri Lanka linked to the Ramayana. Choose a 5, 6, 7 or 8-day trail, with hotels and meals included.",
  cover: RAMAYANA.cover,
};

export default function Packages() {

  return (
    <SiteLayout>
      <PageBand eyebrow={HOME.packagesEyebrow} title={HOME.packagesTitle}>
        Every tour is private, with your own air-conditioned vehicle and English-speaking driver-guide.
        Use these as a starting point and we'll adjust the days and stops to suit you.
      </PageBand>

      <div className="container py-5">
        <div className="row g-4">
          {PACKAGES.map((pkg) => (
            <div className="col-md-6 col-lg-4" key={pkg.slug}>
              <PackageCard pkg={pkg} />
            </div>
          ))}
          <div className="col-md-6 col-lg-4">
            <PackageCard pkg={ramayanaCard} duration="5 to 8 days" />
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
