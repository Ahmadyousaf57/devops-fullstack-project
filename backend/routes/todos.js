import express from 'express'
import Todo from '../models/Todo.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 })
    res.json(todos)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const todo = new Todo({ title: req.body.title })
    const saved = await todo.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    if (!todo) return res.status(404).json({ message: 'Not found' })
    res.json(todo)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updates = {}
    if (req.body.title !== undefined) updates.title = req.body.title
    if (req.body.completed !== undefined) updates.completed = req.body.completed

    const todo = await Todo.findByIdAndUpdate(req.params.id, updates, { new: true })
    if (!todo) return res.status(404).json({ message: 'Not found' })
    res.json(todo)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id)
    if (!todo) return res.status(404).json({ message: 'Not found' })
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

export default router
