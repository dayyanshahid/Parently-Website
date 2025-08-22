import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load env from server/.env regardless of cwd
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
const useSSL = String(process.env.DB_SSL || "").toLowerCase() === "true";
let sslConfig = undefined;
if (useSSL) {
  sslConfig = {};
  if (process.env.DB_SSL_REJECT_UNAUTHORIZED === "false") {
    sslConfig.rejectUnauthorized = false;
  }
  if (process.env.DB_SSL_CA_PATH) {
    try {
      sslConfig.ca = fs.readFileSync(process.env.DB_SSL_CA_PATH, "utf8");
    } catch (e) {
      console.error("[WARN] Failed to read DB SSL CA file:", e);
    }
  }
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: sslConfig,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
  queueLimit: 0,
});

// Ensure wait_list table exists (id, email UNIQUE, optional fields)
async function ensureWaitListTable() {
  try {
    const [rows] = await pool.query(
      "SELECT COUNT(*) AS c FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'wait_list'",
      [process.env.DB_DATABASE]
    );
    const exists = rows && rows[0] && Number(rows[0].c) > 0;
    if (exists) {
      return;
    }
    console.warn("[DB] wait_list table not found. Attempting to create...");
    const ddl = `
      CREATE TABLE IF NOT EXISTS wait_list (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NULL,
        last_name VARCHAR(255) NULL,
        country VARCHAR(255) NULL,
        phone_number VARCHAR(50) NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY uq_waitlist_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    await pool.query(ddl);
    console.log("[DB] wait_list table created or already exists.");
  } catch (e) {
    console.error("[WARN] ensureWaitListTable failed:", e?.message || e);
  }
}
// Fire and forget; won't block startup
ensureWaitListTable().catch(() => {});

 // Health check
app.get("/healthz", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok");
    res.json({ ok: rows && rows[0] && rows[0].ok === 1 });
  } catch (err) {
    console.error("[ERROR] /healthz failed:", err);
    res.status(500).json({ ok: false, error: "DB unreachable" });
  }
});

// GET waitlist stats
app.get("/stats", async (req, res) => {
  try {
    // Count unique emails only
    const [rows] = await pool.query("SELECT COUNT(DISTINCT LOWER(email)) AS totalWaitlist FROM wait_list");
    res.json({ totalWaitlist: rows[0].totalWaitlist });
  } catch (err) {
    // If table doesn't exist yet, return zero instead of failing
    if (err && (err.code === "ER_NO_SUCH_TABLE" || err.errno === 1146)) {
      console.warn("[WARN] wait_list table missing during /stats; returning 0");
      return res.json({ totalWaitlist: 0 });
    }
    console.error("[ERROR] /stats failed:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

 // POST new waitlist entry (supports /waitlist and /wait_list)

let waitlistColumnsCache = null;
async function getWaitlistColumns() {
  if (waitlistColumnsCache) return waitlistColumnsCache;
  try {
    const [rows] = await pool.query(
      "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'wait_list'",
      [process.env.DB_DATABASE]
    );
    waitlistColumnsCache = new Set(rows.map(r => r.COLUMN_NAME));
    console.log("[DB] wait_list columns:", Array.from(waitlistColumnsCache).join(", "));
  } catch (e) {
    console.error("[ERROR] Failed to read wait_list columns:", e);
    waitlistColumnsCache = new Set(); // avoid repeated failures
  }
  return waitlistColumnsCache;
}

const handleWaitlistPost = async (req, res) => {
  const { firstName, lastName, email, country, phone } = req.body || {};

  // Minimal requirement: email only (names optional for compatibility with remote schema)
  const normalizedEmail = (email || "").trim().toLowerCase();
  if (!normalizedEmail) {
    return res.status(400).json({ error: "Missing required field: email" });
  }

  try {
    const cols = await getWaitlistColumns();

    // If an email column exists, enforce deduplication at application level
    if (cols.has("email")) {
      try {
        const [existRows] = await pool.query(
          "SELECT 1 AS x FROM wait_list WHERE TRIM(LOWER(email)) = ? LIMIT 1",
          [normalizedEmail]
        );
        if (Array.isArray(existRows) && existRows.length > 0) {
          return res.status(409).json({ error: "duplicate" });
        }
      } catch (checkErr) {
        console.error("[WARN] Pre-insert duplicate check failed:", checkErr);
        // Continue to attempt insert; if unique index exists, DB will enforce
      }
    }

    // Build columns/values based on what exists in the remote DB
    const insertCols = [];
    const insertVals = [];

    if (cols.has("email")) {
      insertCols.push("email");
      insertVals.push(normalizedEmail);
    }

    if (firstName && cols.has("first_name")) {
      insertCols.push("first_name");
      insertVals.push(firstName);
    }

    if (lastName && cols.has("last_name")) {
      insertCols.push("last_name");
      insertVals.push(lastName);
    }

    if (country && cols.has("country")) {
      insertCols.push("country");
      insertVals.push(country);
    }

    // Support either 'phone' or 'phone_number' column names
    if (phone) {
      if (cols.has("phone")) {
        insertCols.push("phone");
        insertVals.push(phone);
      } else if (cols.has("phone_number")) {
        insertCols.push("phone_number");
        insertVals.push(phone);
      }
    }

    // Ensure we at least insert email
    if (insertCols.length === 0) {
      console.error("[ERROR] wait_list table does not have an 'email' column");
      return res.status(500).json({ error: "Server misconfiguration: missing email column" });
    }

    const placeholders = insertCols.map(() => "?").join(", ");
    const columnList = insertCols.map(c => `\`${c}\``).join(", ");
    const sql = `INSERT INTO wait_list (${columnList}) VALUES (${placeholders})`;

    const [result] = await pool.query(sql, insertVals);
    return res.status(201).json({ success: true, id: result.insertId });
  } catch (err) {
    // Duplicate email unique constraint (if a unique index exists)
    if (err && (err.code === "ER_DUP_ENTRY" || err.errno === 1062)) {
      return res.status(409).json({ error: "duplicate" });
    }
    console.error("[ERROR] /waitlist failed:", err);
    return res.status(500).json({ error: "Failed to save waitlist entry" });
  }
};

app.post("/wait_list", handleWaitlistPost);
app.post("/waitlist", handleWaitlistPost);

 // Start server on configured port, and also open a compatibility port (3000/3001)
app.listen(PORT, () => {
  console.log(`[SERVER] Running on http://localhost:${PORT}`);
  const primary = Number(PORT);
  const compat = primary === 3001 ? 3000 : 3001;
  if (compat !== primary) {
    try {
      app.listen(compat, () => {
        console.log(`[SERVER] Also listening on http://localhost:${compat} (compat)`);
      });
    } catch (e) {
      console.warn(`[SERVER] Could not bind compatibility port ${compat}:`, e?.message || e);
    }
  }
});
