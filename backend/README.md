# Todo Backend

Simple Express + Mongoose backend for the Todo app.

Environment:

- By default connects to `mongodb://127.0.0.1:27017/todoapp`.
- To change DB or port, set `MONGO_URI` and `PORT` in the environment.

Install and run:

```
cd backend
npm install
npm run dev   # requires nodemon (dev) or use `npm start` for production
```

API endpoints:

- `GET /api/todos` - list todos
- `POST /api/todos` - create { title }
- `GET /api/todos/:id` - get
- `PUT /api/todos/:id` - update { title?, completed? }
- `DELETE /api/todos/:id` - delete
