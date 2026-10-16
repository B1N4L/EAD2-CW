
// "Powered by Trio Branch" credit shown at the bottom of every page.
export default function PoweredBy({ className = "" }) {
  return (
    <p className={`powered-by small mb-0 ${className}`}>
      Powered by{" "}
      <a href="https://triobranch.com/" target="_blank" rel="noopener noreferrer">
        Trio Branch
      </a>
    </p>
  );
}
