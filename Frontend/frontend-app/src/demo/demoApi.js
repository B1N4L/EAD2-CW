import axios, { AxiosError } from "axios";
import { seedData } from "./seed.js";

// Stand-in for the five Spring Boot services when the frontend is deployed on its
// own as a static demo. The pages keep calling their usual localhost URLs; this
// axios adapter answers those requests from data kept in the browser's localStorage,
// following the same rules as the real controllers and repositories.

const STORAGE_KEY = "saman-tours-demo-v1";

// The context path of each service, mapped to the collection it owns.
const SERVICES = {
  "employee-api": "employees",
  "booking-api": "bookings",
  "vehicle-api": "vehicles",
  "review-api": "reviews",
  "fleet-api": "fleets",
};

// Form inputs arrive as strings; the entities store these fields as numbers.
const NUMERIC_FIELDS = {
  employees: [],
  bookings: ["packCount", "days"],
  vehicles: ["nseats"],
  reviews: [],
  fleets: ["guide1Id", "guide2Id", "vehicle1Id", "vehicle2Id", "booking1Id", "booking2Id", "booking3Id", "booking4Id", "nDays"],
};

let db = null;

function getDb() {
  if (!db) {
    try {
      db = JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch {
      db = null;
    }
    if (!db) db = structuredClone(seedData);
  }
  return db;
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch {
    // Storage blocked or full: changes last until the page is reloaded.
  }
}

export function resetDemoData() {
  db = null;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing stored to remove.
  }
}

function normalise(collection, body) {
  const row = { ...body };
  for (const field of NUMERIC_FIELDS[collection]) {
    const value = row[field];
    row[field] = value === "" || value === null || value === undefined ? null : Number(value);
  }
  return row;
}

function today() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function handle(method, segments, body) {
  const [service, resource, id] = segments;
  const collection = SERVICES[service];
  if (!collection) return [404, null];
  const rows = getDb()[collection];

  // Custom endpoints (EmployeeRepository / VehicleRepository JPQL queries).
  if (service === "employee-api" && resource === "available-guides" && method === "get") {
    return [200, rows.filter((e) => e.role === "guide" && e.status === "active")];
  }
  if (service === "vehicle-api" && resource === "available-vehicles" && method === "get") {
    return [200, rows.filter((v) => v.status === "available")];
  }
  if (service === "employee-api" && resource === "employees" && id === "login" && method === "post") {
    const employee = rows.find((e) => e.email === body.email && e.status !== "disabled");
    return employee && employee.password === body.password
      ? [200, "Login successful"]
      : [401, "Invalid email or password: Unauthorized access"];
  }

  if (resource !== collection || segments.length > 3) return [404, null];

  if (id === undefined) {
    if (method === "get") return [200, rows];
    if (method === "post") {
      const row = { ...normalise(collection, body), id: rows.reduce((max, r) => Math.max(max, r.id), 0) + 1 };
      if (collection === "reviews") row.date = today();
      rows.push(row);
      save();
      return [201, row];
    }
    return [405, null];
  }

  const index = rows.findIndex((r) => r.id === Number(id));
  if (index === -1) return [404, null];

  switch (method) {
    case "get":
      return [200, rows[index]];
    case "put":
      rows[index] = { ...normalise(collection, body), id: Number(id) };
      save();
      return [200, rows[index]];
    case "delete":
      rows.splice(index, 1);
      save();
      return [204, null];
    default:
      return [405, null];
  }
}

async function demoAdapter(config) {
  const method = (config.method || "get").toLowerCase();
  const segments = new URL(config.url, window.location.href).pathname.split("/").filter(Boolean);

  let body = config.data;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      // Not JSON; pass it through as-is.
    }
  }

  // A short pause so loading feels like a network call.
  await new Promise((resolve) => setTimeout(resolve, 120));

  const [status, data] = handle(method, segments, body ?? {});
  const response = {
    data: data === null ? null : structuredClone(data),
    status,
    statusText: String(status),
    headers: {},
    config,
    request: null,
  };

  const validateStatus = config.validateStatus ?? ((s) => s >= 200 && s < 300);
  if (validateStatus(status)) return response;
  throw new AxiosError(
    `Request failed with status code ${status}`,
    status >= 500 ? AxiosError.ERR_BAD_RESPONSE : AxiosError.ERR_BAD_REQUEST,
    config,
    null,
    response,
  );
}

export function installDemoApi() {
  axios.defaults.adapter = demoAdapter;
}
