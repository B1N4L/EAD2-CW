// Business details for Tours 999. Change them here and every page updates.

export const SITE = {
  name: "Tours 999",
  domain: "tours999.com",
  phone: "+94 76 287 0074",
  phoneHref: "tel:+94762870074",
  whatsappNumber: "94762870074",
  email: "info@tours999.com",
  address: "No 91/3 Kalahugaswila, Nittambuwa, Sri Lanka",
  facebook: "https://www.facebook.com/tours999SL/",
  yearsExperience: "6+",
  owner: { name: "Mahesh Kavinda", role: "CEO & Tour Guide", photo: "mahesh_kavinda_profile_img.jpg" },
  travellerCountries: ["India", "Pakistan", "the UK", "Germany", "Russia"],
};

export function whatsappLink(message) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${SITE.whatsappNumber}${text}`;
}

export const WHY_US = [
  { title: "Customized travel experiences", text: "Every itinerary can be adjusted to your dates, pace and interests, from extra beach days to an added safari." },
  { title: "Expert local knowledge", text: "Our team lives here and knows the best times to visit each site, where to eat and how to avoid the crowds." },
  { title: "Transparent pricing", text: "You get a clear quote up front showing what is included, with no surprise charges on the road." },
  { title: "Language and communication", text: "English-speaking drivers and guides, and quick replies on WhatsApp before and during your trip." },
  { title: "Track record", text: "We have guided travellers from India, Pakistan, the UK, Germany, Russia and beyond." },
  { title: "Friendly, professional service", text: "Reliable drivers, comfortable air-conditioned vehicles and support whenever you need it." },
];
