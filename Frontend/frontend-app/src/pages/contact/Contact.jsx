import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaEnvelope, FaFacebookF, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import SiteLayout from "../../components/SiteLayout";
import PageBand from "../../components/PageBand";
import usePageTitle from "../../components/usePageTitle";
import { SITE, whatsappLink } from "../../data/site";
import { PACKAGES, RAMAYANA } from "../../data/packages";

const TOURS = [...PACKAGES, RAMAYANA];

// No server needed: the form builds a WhatsApp (or email) message from what the visitor typed.
function buildMessage({ name, email, phone, tour, message }) {
  const tourTitle = TOURS.find((t) => t.slug === tour)?.title;
  return [
    `Hi ${SITE.name}, I'm ${name}.`,
    `Email: ${email}`,
    phone && `WhatsApp / phone: ${phone}`,
    tourTitle && `Interested in: ${tourTitle}`,
    "",
    message,
  ].filter((line) => line !== undefined && line !== false && line !== null).join("\n");
}

export default function Contact() {
  usePageTitle("Contact Us");
  const [searchParams] = useSearchParams();
  const packageFromLink = searchParams.get("package");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    tour: TOURS.some((t) => t.slug === packageFromLink) ? packageFromLink : "",
    message: "",
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    window.open(whatsappLink(buildMessage(form)), "_blank", "noopener");
  };

  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent("Tour enquiry")}&body=${encodeURIComponent(buildMessage(form))}`;

  const details = [
    { icon: <FaPhoneAlt />, label: "Phone", value: SITE.phone, href: SITE.phoneHref },
    { icon: <FaWhatsapp />, label: "WhatsApp", value: SITE.phone, href: whatsappLink(), external: true },
    { icon: <FaEnvelope />, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: <FaMapMarkerAlt />, label: "Address", value: SITE.address },
    { icon: <FaFacebookF />, label: "Facebook", value: "facebook.com/tours999SL", href: SITE.facebook, external: true },
  ];

  return (
    <SiteLayout>
      <PageBand eyebrow="Contact us" title="Let's plan your trip">
        Send us a message with your dates, group size and the places you'd like to see. We usually reply on WhatsApp within a few hours.
      </PageBand>

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-7">
            <div className="panel p-4 p-lg-5">
              <form onSubmit={onSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Full name</label>
                    <input required id="name" name="name" type="text" className="form-control" value={form.name} onChange={onChange} />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input required id="email" name="email" type="email" className="form-control" value={form.email} onChange={onChange} />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">WhatsApp / phone <span className="text-secondary fw-normal">(optional)</span></label>
                    <input id="phone" name="phone" type="tel" className="form-control" value={form.phone} onChange={onChange} />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="tour" className="form-label">Tour <span className="text-secondary fw-normal">(optional)</span></label>
                    <select id="tour" name="tour" className="form-select" value={form.tour} onChange={onChange}>
                      <option value="">Not sure yet</option>
                      {TOURS.map((t) => <option key={t.slug} value={t.slug}>{t.title}</option>)}
                    </select>
                  </div>
                  <div className="col-12">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea required id="message" name="message" rows="5" className="form-control"
                      placeholder="Travel dates, number of travellers, places you'd like to visit…" value={form.message} onChange={onChange} />
                  </div>
                </div>
                <div className="d-flex flex-wrap align-items-center gap-3 mt-4">
                  <button type="submit" className="btn btn-whatsapp btn-icon px-4"><FaWhatsapp /> Send on WhatsApp</button>
                  <a className="small" href={mailto}>or send it by email</a>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="panel p-4 p-lg-5 h-100">
              <h2 className="h5 mb-4">Contact details</h2>
              <ul className="list-unstyled mb-0">
                {details.map((d) => (
                  <li className="d-flex gap-3 mb-4" key={d.label}>
                    <span className="feature-icon flex-shrink-0" style={{ width: "2.5rem", height: "2.5rem", fontSize: "1rem" }}>{d.icon}</span>
                    <div>
                      <div className="small text-secondary">{d.label}</div>
                      {d.href ? (
                        <a href={d.href} className="fw-medium" {...(d.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{d.value}</a>
                      ) : (
                        <span className="fw-medium">{d.value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
