import Photo from "./Photo";

// A row of square photos (used for a tour's extra photos).
export default function PhotoStrip({ names, alt }) {
  if (!names?.length) return null;
  return (
    <div className="row g-3">
      {names.map((name) => (
        <div className="col-6 col-md-4" key={name}>
          <Photo name={name} alt={alt} className="gallery-thumb" />
        </div>
      ))}
    </div>
  );
}
