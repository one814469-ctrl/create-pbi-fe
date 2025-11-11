/**
 * This file exports a helper factory function to dynamically generate UserStory components
 * based on the tasks of that user story.
 * 
 * The factory creates a React functional component implementing the tasks grouped by type.
 * 
 * Supported Task types (for this generic example):
 * - formValidation: demonstrates simple form validation UI
 * - mockAuth: mock login form with validation + simulated backend
 * - logout: logout button clearing "session"
 * - addTodo: add items to list
 * - toggleTodo: toggle item done status
 * - deleteTodo: delete items from list
 * - filterTodos: filter displayed todos
 * 
 * This example assumes the tasks *together* implement a feature.
 * If unrecognized task types, they render as info only.
 * 
 * Exported:
 *  - UserStoryComponentFactory(userStory) => ReactComponent
 */

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Helpers for mocked authentication scenario
 */
const MOCK_USERS = [{ email: 'user@example.com', password: 'password123' }]

function useLocalSession() {
  // Using localStorage key to simulate logged-in user
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('mockUser')) || null
    } catch {
      return null
    }
  })

  const login = (email) => {
    localStorage.setItem('mockUser', JSON.stringify({ email }))
    setUser({ email })
  }

  const logout = () => {
    localStorage.removeItem('mockUser')
    setUser(null)
  }

  return { user, login, logout }
}

/**
 * Dynamically create a User Story component from the tasks
 * @param {Object} userStory
 * @returns React Functional Component
 */
export function UserStoryComponentFactory(userStory) {
  const { tasks } = userStory
  const taskTypes = tasks.map((t) => t.type)

  // Composite component implementing tasks in this user story
  function GeneratedUserStoryComponent({ tasks }) {
    // Authentication related states and logic
    const { user, login, logout } = useLocalSession()
    const navigate = useNavigate()
    // Local states for tasks:
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [formErrors, setFormErrors] = useState({})
    const [authError, setAuthError] = useState('')
    const [loginLoading, setLoginLoading] = useState(false)

    // Todo app states
    const [todos, setTodos] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem('todos')) || []
      } catch {
        return []
      }
    })
    const [filter, setFilter] = useState('all')

    // Persist todos on change
    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    /**
     * Handling various task types / functionalities
     */

    // --- formValidation + mockAuth ---
    const validateLoginForm = () => {
      const errors = {}
      if (!formData.email) errors.email = 'Email is required'
      else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid'

      if (!formData.password) errors.password = 'Password is required'
      else if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters'

      setFormErrors(errors)
      return Object.keys(errors).length === 0
    }

    const handleLoginSubmit = async (e) => {
      e.preventDefault()
      setAuthError('')
      if (!validateLoginForm()) return
      setLoginLoading(true)
      // Simulate async call
      await new Promise((r) => setTimeout(r, 1000))
      const foundUser = MOCK_USERS.find(
        (u) => u.email === formData.email && u.password === formData.password
      )
      if (foundUser) {
        login(foundUser.email)
        setFormData({ email: '', password: '' })
        navigate('/') // navigate home after login
      } else {
        setAuthError('Invalid email or password')
      }
      setLoginLoading(false)
    }

    // --- logout task ---
    const handleLogout = () => {
      logout()
      navigate('/')
    }

    // --- todo tasks ---
    const addTodo = (text) => {
      if (!text.trim()) return
      setTodos((prev) => [
        ...prev,
        { id: Date.now().toString(), text: text.trim(), done: false }
      ])
    }

    const toggleTodo = (id) => {
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
      )
    }

    const deleteTodo = (id) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    }

    const filteredTodos = todos.filter((todo) => {
      if (filter === 'all') return true
      if (filter === 'done') return todo.done
      if (filter === 'undone') return !todo.done
      return true
    })

    /**
     * Render per task - combining tasks that belong to common features
     */

    // For demo solution, let's detect feature sets:
    // - if formValidation+mockAuth present -> render Login Form
    // - if logout present -> render logout button when logged in
    // - if addTodo,toggleTodo,deleteTodo present -> render todo list with CRUD
    // - if filterTodos present -> render filter buttons for todo list

    const hasLoginFeature =
      taskTypes.includes('formValidation') && taskTypes.includes('mockAuth')
    const hasLogoutFeature = taskTypes.includes('logout')
    const hasTodoCrud =
      taskTypes.includes('addTodo') &&
      taskTypes.includes('toggleTodo') &&
      taskTypes.includes('deleteTodo')
    const hasTodoFilter = taskTypes.includes('filterTodos')

    // Auxiliary controlled input for adding todo (if todo tasks present)
    const [newTodoText, setNewTodoText] = useState('')

    return (
      <div className="userstory-content" style={{ marginTop: '10px' }}>
        {hasLoginFeature && !user && (
          <form onSubmit={handleLoginSubmit} aria-label="Login form">
            <div>
              <label htmlFor="email">Email:</label><br />
              <input
                id="email"
                type="email"
                autoComplete="username"
                value={formData.email}
                onChange={(e) =>
                  setFormData((fd) => ({ ...fd, email: e.target.value }))
                }
                aria-describedby="email-error"
              />
              {formErrors.email && (
                <p id="email-error" className="error" role="alert">
                  {formErrors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password">Password:</label><br />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((fd) => ({ ...fd, password: e.target.value }))
                }
                aria-describedby="password-error"
              />
              {formErrors.password && (
                <p id="password-error" className="error" role="alert">
                  {formErrors.password}
                </p>
              )}
            </div>
            <button type="submit" disabled={loginLoading} aria-busy={loginLoading}>
              {loginLoading ? 'Logging in...' : 'Login'}
            </button>
            {authError && (
              <p className="error" role="alert" aria-live="assertive">
                {authError}
              </p>
            )}
          </form>
        )}

        {user && hasLogoutFeature && (
          <div aria-label="Logout section" style={{ marginTop: '1rem' }}>
            <p>Logged in as <strong>{user.email}</strong></p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}

        {hasTodoCrud && (
          <section aria-label="Todo List Feature" style={{ marginTop: '1.5rem' }}>
            <div>
              <input
                type="text"
                placeholder="New todo..."
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    if (newTodoText.trim()) {
                      addTodo(newTodoText)
                      setNewTodoText('')
                    }
                  }
                }}
                aria-label="New todo input"
              />
              <button
                type="button"
                onClick={() => {
                  if (newTodoText.trim()) {
                    addTodo(newTodoText)
                    setNewTodoText('')
                  }
                }}
              >
                Add
              </button>
            </div>
            <ul aria-live="polite" aria-label="Todo list" style={{ paddingLeft: 0 }}>
              {filteredTodos.length === 0 && <li>No todos</li>}
              {filteredTodos.map((todo) => (
                <li
                  key={todo.id}
                  className={`todo-item${todo.done ? ' done' : ''}`}
                  style={{ listStyle: 'none' }}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.done}
                      onChange={() => toggleTodo(todo.id)}
                      aria-checked={todo.done}
                    />{' '}
                    <span>{todo.text}</span>
                  </label>
                  <button
                    aria-label={`Delete todo: ${todo.text}`}
                    onClick={() => deleteTodo(todo.id)}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            {hasTodoFilter && (
              <div className="filter-buttons" role="group" aria-label="Filter todo items">
                <button
                  onClick={() => setFilter('all')}
                  aria-pressed={filter === 'all'}
                  type="button"
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('done')}
                  aria-pressed={filter === 'done'}
                  type="button"
                >
                  Done
                </button>
                <button
                  onClick={() => setFilter('undone')}
                  aria-pressed={filter === 'undone'}
                  type="button"
                >
                  Undone
                </button>
              </div>
            )}
          </section>
        )}

        {/* Render unknown tasks as a list of descriptions */}
        {tasks.length > 0 && !hasLoginFeature && !hasLogoutFeature && !hasTodoCrud && (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <strong>{task.name}:</strong> {task.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  return GeneratedUserStoryComponent
}

---

This project:

- Loads EPICS_DATA from a JSON array.
- Dynamically creates routes per Epic: `/epic/:slug`
- Each Epic page lists User Stories.
- Each User Story renders a dynamically generated component implementing tasks.
- Common task types are recognized and combined into features:
  - Authentication (login form validation + mock)
  - Logout button
  - Todo app CRUD (add, toggle, delete) + Filtering
- Unrecognized tasks render their descriptions.
- Uses React Router v6 & hooks.
- Mock backend/auth simulated with localStorage and delays.
- Fully dynamic, structured in components folder.
- Styled with plain CSS.

You can replace `EPICS_DATA` in `src/App.jsx` to any valid structure, and the app adapts dynamically.