# 🔧 Todo Backend — Express.js REST API

A production-ready REST API built with **Express.js** and **Mongoose** (MongoDB ODM).

## Architecture

```
src/
├── config/           # Centralized environment configuration
│   └── index.js
├── controllers/      # Business logic (database queries)
│   └── todoController.js
├── middleware/        # Request processing pipeline
│   ├── errorHandler.js   # Global error catching
│   └── logger.js         # Request logging
├── models/           # MongoDB schema definitions
│   └── Todo.js
├── routes/           # HTTP route definitions
│   ├── index.js      # Route aggregator
│   ├── todos.js      # CRUD routes for todos
│   └── health.js     # K8s health/readiness probes
└── app.js            # Express app setup (no server)
server.js             # Entry point — DB connect + listen
```

## API Endpoints

| Method   | Endpoint          | Description          | Body                          |
|----------|-------------------|----------------------|-------------------------------|
| `GET`    | `/api/todos`      | List all todos       | —                             |
| `POST`   | `/api/todos`      | Create a todo        | `{ "title": "string" }`      |
| `GET`    | `/api/todos/:id`  | Get a specific todo  | —                             |
| `PUT`    | `/api/todos/:id`  | Update a todo        | `{ "title?", "completed?" }` |
| `DELETE` | `/api/todos/:id`  | Delete a todo        | —                             |
| `GET`    | `/health`         | Liveness probe       | —                             |
| `GET`    | `/ready`          | Readiness probe      | —                             |

## Quick Start

```bash
cp .env.example .env    # Create your environment file
npm install             # Install dependencies
npm run dev             # Start with hot-reload (nodemon)
```

## Environment Variables

See [`.env.example`](.env.example) for all available configuration options.
