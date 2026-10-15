// Sample data for the static portfolio demo. Every name and email here is made up.

const DEMO_PASSWORD = "demo1234";

export const DEMO_LOGIN = { email: "admin@samantours.lk", password: DEMO_PASSWORD };

export const seedData = {
  employees: [
    { id: 1, name: "Amali Perera", email: DEMO_LOGIN.email, password: DEMO_PASSWORD, role: "admin", status: "active" },
    { id: 2, name: "Kasun Fernando", email: "kasun@samantours.lk", password: DEMO_PASSWORD, role: "manager", status: "active" },
    { id: 3, name: "Nuwan Jayasinghe", email: "nuwan@samantours.lk", password: DEMO_PASSWORD, role: "guide", status: "active" },
    { id: 4, name: "Dilini Wickramasinghe", email: "dilini@samantours.lk", password: DEMO_PASSWORD, role: "guide", status: "active" },
    { id: 5, name: "Ruwan Dissanayake", email: "ruwan@samantours.lk", password: DEMO_PASSWORD, role: "guide", status: "unavailable" },
    { id: 6, name: "Tharindu Bandara", email: "tharindu@samantours.lk", password: DEMO_PASSWORD, role: "guide", status: "active" },
    { id: 7, name: "Ishara Gunawardena", email: "ishara@samantours.lk", password: DEMO_PASSWORD, role: "staff", status: "active" },
  ],

  bookings: [
    { id: 1, name: "Emma Clarke", email: "emma.clarke@example.com", budget: "Tropical Paradise Tour", packCount: 2, date: "2026-11-06", days: 5 },
    { id: 2, name: "Lukas Weber", email: "lukas.weber@example.com", budget: "Cultural Heritage Tour", packCount: 4, date: "2026-11-12", days: 7 },
    { id: 3, name: "Priya Nair", email: "priya.nair@example.com", budget: "Adventure Safari", packCount: 3, date: "2026-11-20", days: 3 },
    { id: 4, name: "Daniel Okafor", email: "daniel.okafor@example.com", budget: "Tropical Paradise Tour", packCount: 6, date: "2026-12-02", days: 6 },
    { id: 5, name: "Sofia Rossi", email: "sofia.rossi@example.com", budget: "Cultural Heritage Tour", packCount: 2, date: "2026-11-12", days: 7 },
    { id: 6, name: "Kenji Tanaka", email: "kenji.tanaka@example.com", budget: "Adventure Safari", packCount: 5, date: "2026-11-20", days: 3 },
  ],

  vehicles: [
    { id: 1, name: "Toyota Coaster", type: "bus", status: "available", nseats: 29 },
    { id: 2, name: "Toyota KDH Van", type: "van", status: "available", nseats: 14 },
    { id: 3, name: "Nissan Caravan", type: "van", status: "unavailable", nseats: 12 },
    { id: 4, name: "Land Rover Defender", type: "jeep", status: "available", nseats: 6 },
    { id: 5, name: "Mahindra Thar", type: "jeep", status: "available", nseats: 4 },
    { id: 6, name: "Ashok Leyland Viking", type: "bus", status: "unavailable", nseats: 40 },
  ],

  reviews: [
    { id: 1, email: "emma.clarke@example.com", subject: "Unforgettable beaches", description: "Every stop on the coast was better than the last. The itinerary was well paced and the hotels were spotless.", date: "2026-09-28" },
    { id: 2, email: "lukas.weber@example.com", subject: "Great guide at Polonnaruwa", description: "Our guide knew the history of every ruin and kept the kids interested the whole day.", date: "2026-10-03" },
    { id: 3, email: "priya.nair@example.com", subject: "Jeep was a bit cramped", description: "Loved seeing the leopards, but six people in one jeep was tight. A second vehicle would help.", date: "2026-10-09" },
    { id: 4, email: "daniel.okafor@example.com", subject: "Smooth booking", description: "Booked online in a couple of minutes and got a confirmation call the same day.", date: "2026-10-12" },
  ],

  fleets: [
    {
      id: 1, description: "Cultural Triangle - November group",
      guide1Id: 3, guide2Id: 4, vehicle1Id: 2, vehicle2Id: null,
      booking1Id: 2, booking2Id: 5, booking3Id: null, booking4Id: null,
      date: "2026-11-12", nDays: 7,
    },
    {
      id: 2, description: "Yala safari weekend",
      guide1Id: 6, guide2Id: null, vehicle1Id: 4, vehicle2Id: 5,
      booking1Id: 3, booking2Id: 6, booking3Id: null, booking4Id: null,
      date: "2026-11-20", nDays: 3,
    },
  ],
};
