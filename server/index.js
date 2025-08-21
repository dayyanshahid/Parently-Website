/**
 * Parently minimal backend (Express + MySQL) for waitlist + stats
 * - POST /waitlist: insert deduped subscriber
 * - GET  /stats: return total subscribers
 *
 * IMPORTANT: Add your MySQL connection string/credentials where indicated below.
 * You can either:
 *  A) Set DATABASE_URL in .env (single connection string), e.g.:
 *     mysql://USER:PASS@HOST:3306/DBNAME
 *  B) Or set DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE individually.
 *
 * Also set FRONTEND_ORIGIN to your deployed frontend origin to allow CORS.
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mysql from 'mysql2/promise';
import { z } from 'zod';

// ---------- Configuration ----------

// TODO: Add your MySQL connection string or individual credentials in server/.env
// Option A: Single connection string (recommended for simplicity)
const DATABASE_URL = process.env.DATABASE_URL || ''; // e.g., mysql://user:pass@host:3306/dbname

// Option B: Individual parameters (if not using DATABASE_URL)
const DB_HOST = process.env.DB_HOST || '';       // e.g., 'localhost'
const DB_PORT = Number(process.env.DB_PORT || 3306);
const DB_USER = process.env.DB_USER || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_DATABASE = process.env.DB_DATABASE || '';

// Optional overrides
const PORT = Number(process.env.PORT || 3000);
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
const WAITLIST_TABLE = process.env.WAITLIST_TABLE || 'wait_list'; // Default to your table name per screenshot
// NOTE: This table is expected to contain columns:
// first_name, last_name, email, phone_number, country, id (AUTO_INCREMENT)

// Create MySQL pool
let pool;
if (DATABASE_URL) {
  // Using a single connection string
  console.log('[SERVER] Creating MySQL pool with DATABASE_URL');
  pool = mysql.createPool(DATABASE_URL);
} else {
  // Using individual parameters
  console.log('[SERVER] Creating MySQL pool with individual parameters');
  console.log('[SERVER] DB_HOST:', DB_HOST);
  console.log('[SERVER] DB_PORT:', DB_PORT);
  console.log('[SERVER] DB_USER:', DB_USER);
  console.log('[SERVER] DB_DATABASE:', DB_DATABASE);
  console.log('[SERVER] DB_PASSWORD:', DB_PASSWORD ? '[REDACTED]' : '[EMPTY]');
  
  pool = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    // You can tune pool options below as needed
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

// ---------- App setup ----------

const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: false,
  })
);
app.use(morgan('tiny'));

// ---------- Helpers ----------

const normEmail = (e) => (e || '').trim().toLowerCase();

const WaitlistSchema = z.object({
  email: z.string().email(),
  firstName: z.string().trim().max(255).optional().nullable(),
  lastName: z.string().trim().max(255).optional().nullable(),
  country: z.string().trim().max(255).optional().nullable(),
  phone: z.string().trim().max(255).optional().nullable(),
});

// ---------- Routes ----------

app.get('/healthz', async (_req, res) => {
  console.log('[SERVER] Health check requested');
  try {
    console.log('[SERVER] Testing database connection...');
    const conn = await pool.getConnection();
    console.log('[SERVER] Database connection successful');
    conn.release();
    return res.json({ status: 'ok' });
  } catch (e) {
    console.error('[SERVER] Database connection failed:', e);
    return res.status(500).json({ status: 'error', error: 'db_unavailable' });
  }
});

/**
 * POST /waitlist
 * Body: { email, firstName?, lastName?, country?, phone? }
 * - Normalizes email to lowercase trimmed
 * - Dedupes by checking existing row with same email (case-insensitive)
 * Response:
 * - 201 { status: "ok" } on insert
 * - 409 { error: "duplicate" } if email already exists
 * - 400 { error: "invalid_payload" } on validation failure
 * - 500 { error: "server_error" } on other errors
 */
app.post('/waitlist', async (req, res) => {
  console.log('[SERVER] POST /waitlist received');
  console.log('[SERVER] Request body:', req.body);
  
  try {
    const parsed = WaitlistSchema.safeParse(req.body || {});
    if (!parsed.success) {
      console.log('[SERVER] Validation failed:', parsed.error);
      return res.status(400).json({ error: 'invalid_payload' });
    }

    const { firstName, lastName, country, phone } = parsed.data;
    const email = normEmail(parsed.data.email);
    
    console.log('[SERVER] Normalized email:', email);
    console.log('[SERVER] Checking for duplicates...');

    // Check duplicate (case-insensitive)
    const [existing] = await pool.execute(
      `SELECT id FROM \`${WAITLIST_TABLE}\` WHERE LOWER(email) = LOWER(?) LIMIT 1`,
      [email]
    );

    console.log('[SERVER] Duplicate check result:', existing);

    if (Array.isArray(existing) && existing.length > 0) {
      console.log('[SERVER] Duplicate email found, returning 409');
      return res.status(409).json({ error: 'duplicate' });
    }

    console.log('[SERVER] No duplicate found, inserting new subscriber...');

    // Insert new subscriber
    const insertResult = await pool.execute(
      `INSERT INTO \`${WAITLIST_TABLE}\`
        (first_name, last_name, email, phone_number, country)
       VALUES (?, ?, ?, ?, ?)`,
      [
        firstName || null,
        lastName || null,
        email,
        phone || null,
        country || null,
      ]
    );

    console.log('[SERVER] Insert successful:', insertResult);
    return res.status(201).json({ status: 'ok' });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[SERVER] POST /waitlist error:', err);
    return res.status(500).json({ error: 'server_error' });
  }
});

/**
 * GET /stats
 * Response: { totalWaitlist: number }
 */
app.get('/stats', async (_req, res) => {
  console.log('[SERVER] GET /stats requested');
  
  try {
    console.log('[SERVER] Executing count query...');
    const [rows] = await pool.execute(
      `SELECT COUNT(*) AS total FROM \`${WAITLIST_TABLE}\``
    );
    
    console.log('[SERVER] Count query result:', rows);
    const total = Number(rows?.[0]?.total || 0);
    console.log('[SERVER] Parsed total:', total);
    
    const response = { totalWaitlist: total };
    console.log('[SERVER] Sending response:', response);
    return res.json(response);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[SERVER] GET /stats error:', err);
    return res.status(500).json({ error: 'server_error' });
  }
});

// ---------- Start ----------

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[SERVER] Parently backend listening on http://localhost:${PORT}`);
  console.log(`[SERVER] CORS origin set to: ${FRONTEND_ORIGIN}`);
  console.log(`[SERVER] Using table: ${WAITLIST_TABLE}`);
  
  // eslint-disable-next-line no-console
  if (!DATABASE_URL && (!DB_HOST || !DB_USER || !DB_DATABASE)) {
    console.warn(
      '[SERVER] Database config not fully set. Add your MySQL connection in server/.env (DATABASE_URL or DB_* vars).'
    );
  } else {
    console.log('[SERVER] Database configuration appears complete');
  }
});
