import { useEffect } from "react";
import { SITE } from "../data/site";

// Sets the browser tab title, e.g. "About Us | Tours 999".
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE.name}` : `${SITE.name} | Private Sri Lanka Tours with Driver`;
  }, [title]);
}
