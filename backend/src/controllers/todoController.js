/**
 * ┌─────────────────────────────────────────────────────┐
 * │  Todo Controller                                    │
 * │  Contains the business logic for Todo CRUD ops      │
 * └─────────────────────────────────────────────────────┘
 *
 * WHY SEPARATE CONTROLLERS FROM ROUTES?
 * - Routes define URL patterns and HTTP methods
 * - Controllers contain the actual logic (database queries, validation)
 * - This separation makes code testable and reusable
 *   e.g., you could call `getAllTodos` from a CLI tool or a test
 *   without needing an HTTP request
 */

import Todo from '../models/Todo.js'

/**
 * GET /api/todos
 * Fetch all todos, newest first
 */
export const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 })
    res.json({ success: true, count: todos.length, data: todos })
  } catch (err) {
    next(err) // Pass to error-handling middleware
  }
}

/**
 * POST /api/todos
 * Create a new todo
 * Body: { title: "string" }
 */
export const createTodo = async (req, res, next) => {
  try {
    const { title } = req.body
    if (!title || !title.trim()) {
      const error = new Error('Title is required')
      error.statusCode = 400
      throw error
    }
    const todo = new Todo({ title: title.trim() })
    const saved = await todo.save()
    res.status(201).json({ success: true, data: saved })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/todos/:id
 * Fetch a single todo by its MongoDB _id
 */
export const getTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id)
    if (!todo) {
      const error = new Error('Todo not found')
      error.statusCode = 404
      throw error
    }
    res.json({ success: true, data: todo })
  } catch (err) {
    next(err)
  }
}

/**
 * PUT /api/todos/:id
 * Update a todo's title and/or completed status
 * Body: { title?: "string", completed?: boolean }
 */
export const updateTodo = async (req, res, next) => {
  try {
    const updates = {}
    if (req.body.title !== undefined) updates.title = req.body.title
    if (req.body.completed !== undefined) updates.completed = req.body.completed

    const todo = await Todo.findByIdAndUpdate(req.params.id, updates, {
      new: true,           // Return the updated document
      runValidators: true, // Validate the update against the schema
    })

    if (!todo) {
      const error = new Error('Todo not found')
      error.statusCode = 404
      throw error
    }
    res.json({ success: true, data: todo })
  } catch (err) {
    next(err)
  }
}

/**
 * DELETE /api/todos/:id
 * Permanently delete a todo
 */
export const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id)
    if (!todo) {
      const error = new Error('Todo not found')
      error.statusCode = 404
      throw error
    }
    res.json({ success: true, message: 'Todo deleted successfully' })
  } catch (err) {
    next(err)
  }
}
