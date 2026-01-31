const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '../data/requests.db'));

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS requests (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    requester_name TEXT NOT NULL,
    requester_contact TEXT,
    location TEXT,
    urgency TEXT DEFAULT 'normal',
    status TEXT DEFAULT 'pending',
    volunteer_id TEXT,
    volunteer_name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    accepted_at DATETIME,
    started_at DATETIME,
    completed_at DATETIME,
    notes TEXT
  );

  CREATE TABLE IF NOT EXISTS status_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    request_id TEXT NOT NULL,
    status TEXT NOT NULL,
    changed_by TEXT,
    changed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    note TEXT,
    FOREIGN KEY (request_id) REFERENCES requests(id)
  );

  CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);
  CREATE INDEX IF NOT EXISTS idx_requests_type ON requests(type);
  CREATE INDEX IF NOT EXISTS idx_status_history_request ON status_history(request_id);
`);

module.exports = db;
