# Maithili Estates Real Estate Platform (MERN)

Modern Chennai real estate experience with discovery, filtering, comparisons, agent profiles, contact workflows, and an admin overview.

## Features
- Property listings with filters, comparisons, and map preview
- Agent profiles and messaging
- Inquiries and appointment requests
- Role-based authentication (user, agent, admin)
- Admin metrics endpoint

## Tech Stack
- Frontend: React + Vite + CSS
- Backend: Node.js + Express + MongoDB (Mongoose)

## Setup

### 1) Client
```bash
npm install
npm run dev
```

### 2) Server
```bash
cd server
npm install
copy .env.example .env
npm run seed
npm run dev
```

The default API base URL is `http://localhost:5001`. Update the client via:
```
VITE_API_URL=http://localhost:5001
```

## API Overview
- `GET /api/properties`
- `GET /api/agents`
- `POST /api/inquiries`
- `POST /api/appointments`
- `POST /api/messages`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/admin/metrics` (admin role)
- `GET /api/users` (admin role)

## Seeded Accounts
- Admin: `admin@maithiliestates.in` / `admin123`
- Agents (password `agent123`): `meera@maithiliestates.in`, `arjun@maithiliestates.in`, `kavya@maithiliestates.in`, `vikram@maithiliestates.in`

## Notes
- The frontend falls back to seeded listings if the backend is unavailable.
- MongoDB must be running locally for the backend to start.
