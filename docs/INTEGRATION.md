Parently Web — Backend Integration Guide (MySQL)
Purpose
This document specifies the minimal backend contract and MySQL schema to support:
- Dedupe waitlist signups by email.
- Live waitlist total count for the Stats section.

The frontend is feature-flagged and will not call the backend unless VITE_BACKEND_ENABLED=true and VITE_API_BASE_URL is configured.

Environment
Vite environment variables:
- VITE_BACKEND_ENABLED=false
- VITE_API_BASE_URL=
See .env.example. Copy to .env.local and set values for your environment.

Frontend Integration Points
Files:
- src/config/env.js
  - BACKEND_ENABLED: boolean from VITE_BACKEND_ENABLED
  - API_BASE_URL: backend URL (no trailing slash)
- src/services/waitlistService.js
  - submitWaitlist(payload): POST to `${API_BASE_URL}/waitlist`, returns status
  - getWaitlistCount(): GET from `${API_BASE_URL}/stats`, returns number or null
- src/components/Waitlist/Waitlist.jsx
  - On submit, when BACKEND_ENABLED=true:
    - collects fields (firstName, lastName, email, country, phone)
    - normalizes email to lowercase trimmed
    - calls submitWaitlist(payload)
- src/components/Stats/Stats.jsx
  - On mount, when BACKEND_ENABLED=true:
    - calls getWaitlistCount() and displays it, otherwise falls back to static value

Minimal MySQL Schema
Normalize email to lowercase before insert and enforce uniqueness.

SQL:
CREATE TABLE IF NOT EXISTS wait_list (
  id INT(11) NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(255) NULL,
  last_name VARCHAR(255) NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NULL,
  country VARCHAR(255) NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_wait_list_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

Notes:
- Store email already normalized to lowercase trimmed in the application layer.
- uq_waitlist_email enforces dedupe.
- Optional: add an index on created_at if you’ll query by time ranges.

Backend API Contract
Base URL
- VITE_API_BASE_URL, e.g., https://api.yourdomain.com

Endpoints
1) POST /waitlist
- Purpose: Create a subscriber if not already registered.
- Request body (JSON):
  {
    "email": "string (required)",
    "firstName": "string (optional)",
    "lastName": "string (optional)",
    "country": "string (optional)",
    "phone": "string (optional)"
  }
- Semantics:
  - Normalize email to lower(trim(email)).
  - Insert into wait_list; if duplicate key, respond with 409.
- Responses:
  - 201 Created: { "status": "ok" }
  - 409 Conflict: { "error": "duplicate" }
  - 400 Bad Request: { "error": "invalid_email" } (if validation fails)
  - 500 Server Error: { "error": "server_error" }

2) GET /stats
- Purpose: Return the total number of waitlist subscribers.
- Response: 200 OK
  {
    "totalWaitlist": 1234
  }

Example Implementation Snippets
Node/Express (pseudo):

const express = require('express');
const app = express();
app.use(express.json());

const pool = /* mysql2/promise pool */;

// helper
const normEmail = (e) => (e || '').trim().toLowerCase();

app.post('/waitlist', async (req, res) => {
  try {
    const { email, firstName, lastName, country, phone } = req.body || {};
    const e = normEmail(email);
    if (!e || !/^\S+@\S+\.\S+$/.test(e)) {
      return res.status(400).json({ error: 'invalid_email' });
    }

    try {
      await pool.execute(
        'INSERT INTO wait_list (first_name, last_name, email, phone_number, country) VALUES (?, ?, ?, ?, ?)',
        [firstName || null, lastName || null, e, phone || null, country || null]
      );
    } catch (err) {
      if (err && err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'duplicate' });
      }
      throw err;
    }

    return res.status(201).json({ status: 'ok' });
  } catch (err) {
    return res.status(500).json({ error: 'server_error' });
  }
});

app.get('/stats', async (_req, res) => {
  try {
    const [rows] = await pool.execute('SELECT COUNT(*) AS total FROM wait_list');
    const total = Number(rows?.[0]?.total || 0);
    return res.json({ totalWaitlist: total });
  } catch {
    return res.status(500).json({ error: 'server_error' });
  }
});

Security and Ops Recommendations
- Rate limiting: Throttle POST /waitlist by IP and by email attempts to mitigate abuse.
- Validation: Validate email server-side; optionally verify MX records or send double opt-in email.
- Logging: Log 409 duplicate attempts (anonymize IP per privacy policy).
- CORS: Restrict to your frontend origin(s).
- HTTPS only.
- Data privacy: Since collecting PII (email, phone), publish a privacy policy.
- Backups: Enable regular MySQL backups and retention.
- Monitoring: Track error rates and POST volume.

Frontend Toggle and Testing
- Keep VITE_BACKEND_ENABLED=false until backend is ready.
- When backend is live:
  1) Set VITE_BACKEND_ENABLED=true
  2) Set VITE_API_BASE_URL=https://api.yourdomain.com
  3) Restart dev server (Vite reads env at start)
- Verify:
  - Submitting form in Waitlist.jsx hits POST /waitlist
  - Stats.jsx displays real count from GET /stats

cURL Examples
POST (create):
curl -i -X POST https://api.yourdomain.com/waitlist \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "test@example.com",
    "firstName": "Test",
    "lastName": "User",
    "country": "AU",
    "phone": "+61 4 1234 5678"
  }'

Duplicate:
HTTP/1.1 409 Conflict
{ "error": "duplicate" }

GET (stats):
curl -s https://api.yourdomain.com/stats
{ "totalWaitlist": 1234 }

Changelog
- v1: Initial contract and schema for MySQL-based waitlist and stats.
