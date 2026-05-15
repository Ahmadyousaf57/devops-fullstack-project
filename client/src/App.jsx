import { useEffect, useState } from 'react'
import './App.css'

const API_BASE = import.meta.env.VITE_API_BASE || '/api'

function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingTitle, setEditingTitle] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    try {
      const res = await fetch(`${API_BASE}/api/todos`)
      const data = await res.json()
      setTodos(data)
    } catch (err) {
      console.error('fetchTodos', err)
    }
  }

  async function addTodo(e) {
    e.preventDefault()
    if (!title.trim()) return
    try {
      await fetch(`${API_BASE}/api/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim() }),
      })
      setTitle('')
      fetchTodos()
    } catch (err) {
      console.error('addTodo', err)
    }
  }

  async function toggleTodo(todo) {
    try {
      await fetch(`${API_BASE}/api/todos/${todo._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
      })
      fetchTodos()
    } catch (err) {
      console.error('toggleTodo', err)
    }
  }

  function startEdit(todo) {
    setEditingId(todo._id)
    setEditingTitle(todo.title)
  }

  async function saveEdit(e) {
    e.preventDefault()
    if (!editingTitle.trim()) return
    try {
      await fetch(`${API_BASE}/api/todos/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editingTitle.trim() }),
      })
      setEditingId(null)
      setEditingTitle('')
      fetchTodos()
    } catch (err) {
      console.error('saveEdit', err)
    }
  }

  async function deleteTodo(id) {
    try {
      await fetch(`${API_BASE}/api/todos/${id}`, { method: 'DELETE' })
      fetchTodos()
    } catch (err) {
      console.error('deleteTodo', err)
    }
  }

  return (
    <div className="app">
      <h1>Todo App</h1>

      <form onSubmit={addTodo} className="new-todo">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add</button>
      </form>

      <ul className="todos">
        {todos.map((todo) => (
          <li key={todo._id} className={todo.completed ? 'done' : ''}>
            <input
              type="checkbox"
              checked={!!todo.completed}
              onChange={() => toggleTodo(todo)}
            />

            {editingId === todo._id ? (
              <form onSubmit={saveEdit} className="edit-form">
                <input
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
                <button type="submit">Save</button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <span className="title">{todo.title}</span>
                <div className="actions">
                  <button onClick={() => startEdit(todo)}>Edit</button>
                  <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
