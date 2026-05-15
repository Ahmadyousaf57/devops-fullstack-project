/**
 * ┌─────────────────────────────────────────────────────┐
 * │  Todo Routes                                        │
 * │  Maps HTTP methods + URLs → Controller functions    │
 * └─────────────────────────────────────────────────────┘
 *
 * RESTFUL CONVENTION:
 * ┌──────────┬──────────────────┬──────────────────────┐
 * │  Method  │  URL             │  Action              │
 * ├──────────┼──────────────────┼──────────────────────┤
 * │  GET     │  /api/todos      │  List all todos      │
 * │  POST    │  /api/todos      │  Create a new todo   │
 * │  GET     │  /api/todos/:id  │  Get one todo        │
 * │  PUT     │  /api/todos/:id  │  Update a todo       │
 * │  DELETE  │  /api/todos/:id  │  Delete a todo       │
 * └──────────┴──────────────────┴──────────────────────┘
 *
 * Notice: This file ONLY defines routes — no business logic.
 * Logic lives in ../controllers/todoController.js
 */

import express from 'express'
import {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
} from '../controllers/todoController.js'

const router = express.Router()

router.get('/', getAllTodos)
router.post('/', createTodo)
router.get('/:id', getTodoById)
router.put('/:id', updateTodo)
router.delete('/:id', deleteTodo)

export default router
