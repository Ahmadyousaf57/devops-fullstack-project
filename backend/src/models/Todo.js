/**
 * ┌─────────────────────────────────────────────────────┐
 * │  Todo Mongoose Model                                │
 * │  Defines the shape of a Todo document in MongoDB    │
 * └─────────────────────────────────────────────────────┘
 *
 * WHAT IS A SCHEMA?
 * A schema defines the structure of documents in a MongoDB collection.
 * Think of it like a blueprint — it specifies which fields exist,
 * their types, and validation rules.
 *
 * MongoDB is "schema-less" by default, but Mongoose adds schemas
 * on top to give you structure, validation, and type casting.
 */

import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema(
  {
    // The text of the todo item — required, cannot be empty
    title: {
      type: String,
      required: [true, 'Todo title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    // Whether the task is done or not — defaults to false
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Mongoose option: automatically adds `createdAt` and `updatedAt` fields
    timestamps: true,
  }
)

const Todo = mongoose.model('Todo', todoSchema)

export default Todo
