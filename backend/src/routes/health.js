/**
 * ┌─────────────────────────────────────────────────────┐
 * │  Health Check Routes                                │
 * │  Used by Kubernetes probes to check app status      │
 * └─────────────────────────────────────────────────────┘
 *
 * KUBERNETES HEALTH CHECKS:
 *
 * 1. LIVENESS PROBE → /health
 *    "Is the process alive?"
 *    If this fails, K8s RESTARTS the pod.
 *    Should return 200 as long as the Node.js process is running.
 *
 * 2. READINESS PROBE → /ready
 *    "Is the app ready to serve traffic?"
 *    If this fails, K8s REMOVES the pod from the Service (no traffic).
 *    Checks if the database connection is active.
 *    Useful during startup: the app might be alive but not ready
 *    if it hasn't connected to MongoDB yet.
 */

import express from 'express'
import mongoose from 'mongoose'

const router = express.Router()

/**
 * Liveness probe
 * Simply returns 200 — if the process can respond, it's alive
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: `${Math.floor(process.uptime())}s`,
    timestamp: new Date().toISOString(),
  })
})

/**
 * Readiness probe
 * Checks MongoDB connection state
 * 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
 */
router.get('/ready', (req, res) => {
  const dbState = mongoose.connection.readyState
  const isReady = dbState === 1

  res.status(isReady ? 200 : 503).json({
    status: isReady ? 'ready' : 'not ready',
    database: isReady ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  })
})

export default router
