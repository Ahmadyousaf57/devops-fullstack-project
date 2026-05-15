/**
 * ┌─────────────────────────────────────────────────────┐
 * │  Route Aggregator                                   │
 * │  Registers all route modules on the Express app     │
 * └─────────────────────────────────────────────────────┘
 *
 * WHY: As your app grows, you'll have many route files
 * (users, auth, products, etc.). This aggregator keeps
 * app.js clean by mounting all routes in one place.
 */

import todosRouter from './todos.js'
import healthRouter from './health.js'

const registerRoutes = (app) => {
  // ── API Routes ──────────────────────────────────────
  app.use('/api/todos', todosRouter)

  // ── Health/Readiness (used by Kubernetes probes) ────
  app.use('/', healthRouter)

  // ── Root Route ──────────────────────────────────────
  app.get('/', (req, res) => {
    res.json({
      name: 'Todo API',
      version: '1.0.0',
      status: 'running',
      endpoints: {
        todos: '/api/todos',
        health: '/health',
        ready: '/ready',
      },
    })
  })
}

export default registerRoutes
