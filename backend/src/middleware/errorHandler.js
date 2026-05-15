/**
 * ┌─────────────────────────────────────────────────────┐
 * │  Global Error-Handling Middleware                    │
 * │  Catches any error thrown in routes/controllers      │
 * │  and returns a structured JSON response             │
 * └─────────────────────────────────────────────────────┘
 *
 * HOW IT WORKS:
 * Express recognises middleware with 4 params (err, req, res, next)
 * as an error handler. When any route calls `next(err)` or throws,
 * Express skips to this middleware and sends a clean error response
 * instead of crashing.
 */

import config from '../config/index.js'

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  console.error(`[ERROR] ${req.method} ${req.path} → ${statusCode}: ${message}`)

  // In development, include the stack trace for debugging
  // In production, hide it to avoid leaking internals
  const response = {
    success: false,
    status: statusCode,
    message,
    ...(config.nodeEnv === 'development' && { stack: err.stack }),
  }

  res.status(statusCode).json(response)
}

export default errorHandler
