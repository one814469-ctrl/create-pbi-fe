import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate
} from 'react-router-dom'
import * as Components from './components'

/**
 * Replace this JSON with any valid Epic → User Story → Task JSON data
 * Structure example:
 * [
 *   {
 *     "id": "epic-1",
 *     "name": "Epic 1",
 *     "description": "Description of Epic 1",
 *     "userStories": [
 *       {
 *         "id": "us-1",
 *         "name": "User Story 1",
 *         "description": "Description of User Story 1",
 *         "tasks": [
 *           {
 *             "id": "task-1",
 *             "name": "Task 1",
 *             "type": "counter", // Task type hints for implementation
 *             "description": "A simple counter increment task"
 *           }
 *         ]
 *       }
 *     ]
 *   }
 * ]
 * 
 * For demo, hardcoded example below — replace it or load from API/file
 */
const EPICS_DATA = [
  {
    "id": "epic-authentication",
    "name": "Authentication",
    "description": "Handle user login, logout and registration",
    "userStories": [
      {
        "id": "us-login",
        "name": "User Login",
        "description": "Allows users to login with email and password",
        "tasks": [
          {
            "id": "task-validate-form",
            "name": "Validate Login Form",
            "type": "formValidation",
            "description": "Ensure email and password fields are filled and valid"
          },
          {
            "id": "task-mock-auth",
            "name": "Mock Authentication",
            "type": "mockAuth",
            "description": "Mock backend to authenticate user with predefined credentials"
          }
        ]
      },
      {
        "id": "us-logout",
        "name": "User Logout",
        "description": "Allows logged-in users to logout",
        "tasks": [
          {
            "id": "task-logout",
            "name": "Logout Functionality",
            "type": "logout",
            "description": "Clear user session and redirect to login page"
          }
        ]
      }
    ]
  },
  {
    "id": "epic-todo",
    "name": "ToDo List",
    "description": "Manage a todo list with add, mark done, and filter tasks",
    "userStories": [
      {
        "id": "us-todo-crud",
        "name": "Todo CRUD",
        "description": "Create, read, update, and delete todos",
        "tasks": [
          {
            "id": "task-add-todo",
            "name": "Add Todo",
            "type": "addTodo",
            "description": "Add new todo items to the list"
          },
          {
            "id": "task-toggle-todo",
            "name": "Toggle Todo Done",
            "type": "toggleTodo",
            "description": "Mark todo items as done or undone"
          },
          {
            "id": "task-delete-todo",
            "name": "Delete Todo",
            "type": "deleteTodo",
            "description": "Remove todo items from the list"
          }
        ]
      },
      {
        "id": "us-todo-filter",
        "name": "Filter Todos",
        "description": "Filter todos by status",
        "tasks": [
          {
            "id": "task-filter-todos",
            "name": "Filter Todos",
            "type": "filterTodos",
            "description": "Filter todo items by all/done/undone"
          }
        ]
      }
    ]
  }
]

// Helper: slugify for paths
const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^[-]+|[-]+$/g, '')

function Home() {
  return (
    <div className="container">
      <h1>Epics</h1>
      <ul>
        {EPICS_DATA.map((epic) => (
          <li key={epic.id}>
            <Link to={`/epic/${slugify(epic.name)}`}>{epic.name}</Link> — {epic.description}
          </li>
        ))}
      </ul>
      <footer style={{ marginTop: '3rem', fontSize: '0.8rem', color: '#666' }}>
        <p>Dynamic app based on JSON of epics, user stories, and tasks.</p>
      </footer>
    </div>
  )
}

function EpicPage() {
  const { epicSlug } = useParams()
  const epic = EPICS_DATA.find((e) => slugify(e.name) === epicSlug)
  if (!epic) return <Navigate to="/" />

  return (
    <div className="container">
      <h1>{epic.name}</h1>
      <p><i>{epic.description}</i></p>
      <nav>
        <Link to="/">← Back to Epics</Link>
      </nav>
      <div className="userstories">
        {epic.userStories.map((us) => {
          const UsComponent = Components.UserStoryComponentFactory(us)
          return (
            <section key={us.id} className="userstory">
              <h2>{us.name}</h2>
              <p><em>{us.description}</em></p>
              <UsComponent tasks={us.tasks} />
            </section>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Main app component with routing
 */
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/epic/:epicSlug" element={<EpicPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}