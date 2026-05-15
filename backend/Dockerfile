# ┌──────────────────────────────────────────────────────────┐
# │  BACKEND DOCKERFILE — Multi-Stage Build                 │
# │                                                        │
# │  WHAT IS A DOCKERFILE?                                 │
# │  A text file with instructions to build a Docker image │
# │  Think of it as a recipe: each line is a step.         │
# │                                                        │
# │  WHAT IS MULTI-STAGE BUILD?                            │
# │  We use TWO stages:                                    │
# │  Stage 1 (deps): Install ALL dependencies              │
# │  Stage 2 (prod): Copy only what we need to run         │
# │  Result: Smaller, more secure final image              │
# └──────────────────────────────────────────────────────────┘

# ── Stage 1: Install Dependencies ─────────────────────────
# We use "node:18-alpine" — Alpine Linux is only ~5MB
# compared to ~900MB for full Ubuntu-based images
FROM node:18-alpine AS deps

# Set the working directory inside the container
WORKDIR /app

# Copy ONLY package files first (Docker layer caching trick)
# If package.json hasn't changed, Docker reuses the cached
# npm install layer — saving minutes on rebuilds!
COPY package*.json ./

# Install ONLY production dependencies (no devDependencies)
# --omit=dev skips nodemon, eslint, etc. — not needed in prod
RUN npm ci --omit=dev

# ── Stage 2: Production Image ─────────────────────────────
FROM node:18-alpine AS production

# Security: Don't run as root inside the container
# If the app is compromised, the attacker has limited permissions
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy dependencies from stage 1
COPY --from=deps /app/node_modules ./node_modules

# Copy application source code
COPY package*.json ./
COPY server.js ./
COPY src/ ./src/

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4000

# Switch to non-root user
USER appuser

# Tell Docker which port this container uses
# (documentation only — doesn't actually publish the port)
EXPOSE 4000

# Health check — Docker/K8s will ping this endpoint
# to verify the container is working
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:4000/health || exit 1

# Start the application
CMD ["node", "server.js"]
