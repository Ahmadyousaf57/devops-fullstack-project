/**
 * ┌─────────────────────────────────────────────────────┐
 * │  Server Entry Point                                 │
 * │  Connects to MongoDB, then starts the HTTP server   │
 * └─────────────────────────────────────────────────────┘
 *
 * This file is intentionally minimal:
 * - Connects to the database
 * - Starts listening on the configured port
 *
 * All Express configuration (middleware, routes) lives in
 * src/app.js — keeping concerns separated.
 *
 * STARTUP FLOW:
 *   1. Import app (Express) and config
 *   2. Connect to MongoDB
 *   3. Start HTTP server on PORT
 *   4. Handle graceful shutdown (SIGTERM/SIGINT)
 */

import mongoose from 'mongoose'
import app from './src/app.js'
import config from './src/config/index.js'

async function start() {
  try {
    // ── Step 1: Connect to MongoDB ────────────────────
    console.log(`⏳ Connecting to MongoDB at ${config.mongoUri}...`)
    await mongoose.connect(config.mongoUri)
    console.log('✅ Connected to MongoDB successfully')

    // ── Step 2: Start HTTP Server ─────────────────────
    const server = app.listen(config.port, () => {
      console.log(`🚀 Server listening on port ${config.port}`)
      console.log(`📍 Environment: ${config.nodeEnv}`)
      console.log(`🔗 http://localhost:${config.port}`)
    })

    // ── Step 3: Graceful Shutdown ─────────────────────
    // When Docker/K8s sends SIGTERM, close connections cleanly
    const shutdown = async (signal) => {
      console.log(`\n🛑 ${signal} received. Shutting down gracefully...`)
      server.close(async () => {
        await mongoose.connection.close()
        console.log('👋 MongoDB disconnected. Server closed.')
        process.exit(0)
      })
    }

    process.on('SIGTERM', () => shutdown('SIGTERM'))
    process.on('SIGINT', () => shutdown('SIGINT'))

  } catch (err) {
    console.error('❌ Failed to start server:', err.message)
    process.exit(1)
  }
}

start()
