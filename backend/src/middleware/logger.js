/**
 * ┌─────────────────────────────────────────────────────┐
 * │  Request Logger Middleware                          │
 * │  Logs every incoming HTTP request with timing       │
 * └─────────────────────────────────────────────────────┘
 *
 * WHY: In production, logging every request helps you:
 * - Debug issues ("which endpoint was hit?")
 * - Monitor performance ("which routes are slow?")
 * - Audit access ("who accessed what and when?")
 *
 * This is a simple implementation. In production, you'd use
 * a library like `morgan` or `pino` for structured JSON logs.
 */

const logger = (req, res, next) => {
  const start = Date.now()

  // When the response finishes, log the details
  res.on('finish', () => {
    const duration = Date.now() - start
    const timestamp = new Date().toISOString()
    console.log(
      `[${timestamp}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`
    )
  })

  next()
}

export default logger
