import React from "react";

// Form fields shared by the public review page and the admin "add review" page.
export default function ReviewFields({ review, onChange }) {
  const { email, subject, description } = review;

  return (
    <div className="row g-3">
      <div className="col-md-6">
        <label htmlFor="email" className="form-label">Email</label>
        <input required id="email" type="email" className="form-control" placeholder="you@example.com"
          name="email" value={email} onChange={onChange} />
      </div>
      <div className="col-md-6">
        <label htmlFor="subject" className="form-label">Subject</label>
        <input required id="subject" type="text" className="form-control" placeholder="Sum up your trip"
          name="subject" value={subject} onChange={onChange} />
      </div>
      <div className="col-12">
        <label htmlFor="description" className="form-label">Your review</label>
        <textarea required id="description" className="form-control" rows="5" placeholder="What did you enjoy? What could we do better?"
          name="description" value={description} onChange={onChange} />
      </div>
    </div>
  );
}
