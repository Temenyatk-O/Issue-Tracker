# Issue Tracker


## Stack
- Frontend: React
- Backend: Node.js + Express
- Database: MySQL
- Auth: JWT

##Structure

issue-tracker/
├── backend/
│   ├── config/db.js              # MySQL connection
│   ├── controllers/              # Auth + issue business logic
│   ├── middleware/authMiddleware.js
│   ├── routes/                   # API endpoints
│   ├── schema.sql                # Database schema
│   └── server.js                 # API entry point
└── frontend/
    ├── src/api/client.js         # API client
    ├── src/components/           # Reusable UI components
    ├── src/pages/                # Login/Register/Dashboard pages
    └── src/App.js                # App routes
```

## How It Works
1. User registers or logs in (`/api/auth/*`).
2. Backend verifies credentials and returns a JWT.
3. Frontend stores token and sends it in API requests.
4. Protected routes use middleware to validate the token.
5. Authenticated users create, view, update, and delete issues.

## Run Locally
1. Create MySQL database tables from `backend/schema.sql`.
2. In `backend/.env`, set database and JWT values.
3. Start backend:
   ```bash
   cd backend
   npm install
   npm start
   ```
4. Start frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```
