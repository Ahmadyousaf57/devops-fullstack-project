/**
 * ┌─────────────────────────────────────────────────────┐
 * │  Centralized Configuration Module                   │
 * │  Reads all environment variables in ONE place       │
 * │  so the rest of the app never touches process.env   │
 * └─────────────────────────────────────────────────────┘
 *
 * WHY: Instead of scattering `process.env.XYZ` across many files,
 * we centralise config here. If a variable name changes, we only
 * update this file — not every file that uses it.
 */

import dotenv from 'dotenv'

// Load .env file (only matters in local dev; Docker/K8s inject env vars directly)
dotenv.config()

const config = {
  // ── Server ──────────────────────────────────────────
  port: parseInt(process.env.PORT, 10) || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // ── Database ────────────────────────────────────────
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todoapp',

  // ── CORS ────────────────────────────────────────────
  corsOrigin: process.env.CORS_ORIGIN || '*',

  // ── Logging ─────────────────────────────────────────
  logLevel: process.env.LOG_LEVEL || 'dev',
}

export default config
