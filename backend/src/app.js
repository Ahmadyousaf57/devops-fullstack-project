/**
 * ┌─────────────────────────────────────────────────────┐
 * │  Express Application Setup                          │
 * │  Creates and configures the Express app             │
 * │  WITHOUT starting the server (no app.listen here)   │
 * └─────────────────────────────────────────────────────┘
 *
 * WHY SEPARATE app.js FROM server.js?
 *
 * - app.js  → Creates the Express app (middleware, routes)
 * - server.js → Connects to DB and starts listening on a port
 *
 * This separation is a best practice because:
 * 1. TESTING: You can import `app` in tests and use `supertest`
 *    to send HTTP requests WITHOUT starting a real server.
 * 2. CLARITY: App config is separate from infrastructure concerns
 *    (database, port binding).
 */

import express from 'express'
import cors from 'cors'
import config from './config/index.js'
import logger from './middleware/logger.js'
import errorHandler from './middleware/errorHandler.js'
import registerRoutes from './routes/index.js'

const app = express()

// ── Middleware Pipeline ─────────────────────────────────
// Middleware runs in ORDER for every request:

// 1. CORS — Allow cross-origin requests (frontend ↔ backend)
app.use(cors({ origin: config.corsOrigin }))

// 2. JSON Parser — Parse incoming JSON request bodies
app.use(express.json())

// 3. Logger — Log every request (method, path, status, timing)
app.use(logger)

// ── Routes ──────────────────────────────────────────────
registerRoutes(app)

// ── Error Handler ───────────────────────────────────────
// MUST be registered AFTER routes (catches errors from them)
app.use(errorHandler)

export default app
