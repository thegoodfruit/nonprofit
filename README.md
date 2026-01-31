# nonprofit

The non-profit of the future is open-sourced, driven by volunteers who freely give of themselves to shape a world where the least among us are cared for, and no one is ever alone. It envisions a world where food, clothing, shelter, resources, and time are shared with anyone, anywhere, regardless of beliefs, religion, sex, status, race, or gender.

## Request Confirmation System

A streamlined request tracking system inspired by Uber and Airbnb, making it easy for volunteers to accept and fulfill requests with clear status updates.

### Features

- **Visual Status Timeline**: Track request progress through clear stages (Requested → Accepted → In Progress → Completed)
- **One-Click Confirmations**: Simple action buttons to advance requests through the workflow
- **Request Types**: Support for food, clothing, shelter, transportation, medical, financial assistance
- **Urgency Levels**: Prioritize requests as low, normal, high, or urgent
- **Activity History**: Complete timeline of all status changes with timestamps
- **Dashboard Stats**: Overview of pending, in-progress, and completed requests

### Status Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Pending   │ -> │  Accepted   │ -> │ In Progress │ -> │  Completed  │
│  (Waiting)  │    │ (Volunteer  │    │  (Being     │    │   (Done!)   │
│             │    │  assigned)  │    │  fulfilled) │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

### Getting Started

```bash
# Install dependencies
npm run install:all

# Run development server (backend + frontend)
npm run dev

# Or run separately
npm run server    # Backend on :3001
npm run client    # Frontend on :3000
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/requests` | List all requests (with optional filters) |
| GET | `/api/requests/:id` | Get request details with history |
| POST | `/api/requests` | Create a new request |
| POST | `/api/requests/:id/advance` | Move request to next status |
| POST | `/api/requests/:id/cancel` | Cancel a request |
| GET | `/api/requests/stats/dashboard` | Get dashboard statistics |

### Tech Stack

- **Backend**: Node.js, Express, SQLite (better-sqlite3)
- **Frontend**: React 18, React Router, Vite
- **Styling**: Custom CSS with modern design patterns
