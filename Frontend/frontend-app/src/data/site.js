// Business details for Tours 999. Change them here and every page updates.

export const SITE = {
  name: "Tours 999",
  domain: "tours999.com",
  url: "https://tours999.com", // used for canonical links, the sitemap and social share previews
  phone: "+94 76 287 0074",
  phoneHref: "tel:+94762870074",
  whatsappNumber: "94762870074",
  email: "info@tours999.com",
  address: "No 91/3 Kalahugaswila, Nittambuwa, Sri Lanka",
  facebook: "https://www.facebook.com/tours999SL/",
  yearsExperience: "6+",
  logo: "tours_999_logo.webp",
  owner: { name: "Mahesh Kavinda", role: "CEO & Tour Guide", photo: "mahesh_kavinda_profile_img.webp" },
  travellerCountries: ["India", "Pakistan", "the UK", "Germany", "Russia"],
};

export function whatsappLink(message) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${SITE.whatsappNumber}${text}`;
}
