import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Start each new page at the top (or at #section when the link has one) instead of
// keeping the previous page's scroll position.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const target = hash && document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
