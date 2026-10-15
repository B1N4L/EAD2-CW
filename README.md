# Saman Tours — Tour Management System

A group coursework project (EAD2) for a fictional Sri Lankan tour company. Customers browse tour packages, place bookings and leave reviews; staff log in to an admin dashboard to manage employees, bookings, vehicles, reviews and tour fleets.

**Live demo:** _add your Netlify link here_

> The live demo runs the React frontend only. The Spring Boot services aren't hosted, so the demo answers API calls in the browser with sample data (see [Demo mode](#demo-mode)). The login page shows a demo account, and **Reset demo data** in the top banner restores the sample data.

## Architecture

Five independent Spring Boot microservices, each with its own MySQL database, and a React single-page app that calls them over REST.

| Service | Port | Base path | Responsibility |
|---|---|---|---|
| Employee | 8081 | `/employee-api` | Staff records, login, list of available guides |
| Booking | 8082 | `/booking-api` | Customer tour bookings |
| Vehicle | 8083 | `/vehicle-api` | Vehicle records, list of available vehicles |
| Review | 8084 | `/review-api` | Customer reviews |
| Fleet | 8085 | `/fleet-api` | Tour groups that combine guides, vehicles and bookings |

Each service follows a controller → service → repository layout using Spring Data JPA, with JPQL queries for the "available guides" and "available vehicles" endpoints. The fleet screens pull data from three other services to build a tour group.

## Tech stack

- **Backend:** Java 17, Spring Boot 3.3 (Web, Data JPA, Validation), MySQL, Maven
- **Frontend:** React 18, Vite 5, React Router 6, Axios, Bootstrap 5 / React-Bootstrap, React Icons

## Running it locally (full stack)

1. Start MySQL and create the databases `employeedb`, `bookingdb`, `vehicledb`, `reviewdb` and `fleetdb` (the services connect as `root` / `root`; change this in each `application.properties`).
2. Start each service from its folder:
   ```bash
   ./mvnw spring-boot:run
   ```
   Folders: `adminBackend/employee-backend-app`, `booking-backend-app`, `vehicleBackend/vehicle-backend-app`, `ReviewBackend/review-backend-app`, `FleetBackend/fleet-backend-app`.
3. Start the frontend:
   ```bash
   cd Frontend/frontend-app
   npm install
   npm run dev
   ```
   Open http://localhost:5173.

## Demo mode

When the frontend is built with `VITE_DEMO_MODE=true` (set in [`netlify.toml`](netlify.toml)), a custom Axios adapter in [`src/demo/demoApi.js`](Frontend/frontend-app/src/demo/demoApi.js) intercepts the calls to the five services and serves them from `localStorage`, following the same rules as the real endpoints. Sample data lives in [`src/demo/seed.js`](Frontend/frontend-app/src/demo/seed.js). Without that variable the app talks to the real services as before.

To try demo mode locally without the backends:

```bash
VITE_DEMO_MODE=true npm run dev
```
