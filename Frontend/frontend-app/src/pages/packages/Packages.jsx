import React from "react";
import SiteLayout from "../../components/SiteLayout";
import PageBand from "../../components/PageBand";
import PackageCard from "../../components/PackageCard";
import usePageTitle from "../../components/usePageTitle";
import { PACKAGES, RAMAYANA } from "../../data/packages";

export default function Packages() {
  usePageTitle("Our Tour Packages");

  return (
    <SiteLayout>
      <PageBand eyebrow="Tour packages" title="Our tour packages">
        Every tour is private, with your own air-conditioned vehicle and English-speaking driver.
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
            <PackageCard pkg={RAMAYANA} duration="5 to 8 days" />
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
