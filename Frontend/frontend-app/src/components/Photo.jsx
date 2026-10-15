import React from "react";
import { FaMountain } from "react-icons/fa";
import { photoUrl } from "../data/photos";

// Shows a photo from src/assets/photos, or a styled placeholder until that file is added.
export default function Photo({ name, alt, className = "" }) {
  const url = photoUrl(name);
  if (url) return <img src={url} alt={alt} className={className} loading="lazy" />;

  return (
    <div className={`photo-placeholder ${className}`} role="img" aria-label={alt}>
      <FaMountain size={28} />
      <span>{alt}</span>
    </div>
  );
}
