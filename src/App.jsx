import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
  useParams,
} from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/**
 * Place your JSON epics data here.
 * It must contain epics → userStories → tasks hierarchy.
 * Task objects must contain 'type' to identify functionality:
 * e.g. 'form', 'dashboard', 'statusTracker', etc.
 *
 * For example usage, see the sample below.
 */
const epicsJSON = {
  epics: [
    {
      id: "auth",
      title: "User Authentication",
      description: "User login/signup/logout features.",
      userStories: [
        {
          id: "signup",
          title: "Sign Up Feature",
          description: "Allows users to create new accounts.",
          tasks: [
            {
              id: "signupForm",
              title: "Registration Form",
              type: "form",
              fields: [
                { name: "email", type: "email", required: true },
                { name: "password", type: "password", required: true, minLength: 8 },
                {
                  name: "confirmPassword",
                  type: "password",
                  required: true,
                  matchField: "password",
                },
              ],
              submitText: "Register",
              onSubmit: "mockRegister",
            },
          ],
        },
        {
          id: "loginStatus",
          title: "Login Status Tracker",
          description: "Shows current user login status.",
          tasks: [
            {
              id: "statusTracker",
              title: "Status Tracker",
              type: "statusTracker",
              states: ["logged out", "logging in", "logged in"],
              userInfoFields: ["email", "lastLogin"],
            },
          ],
        },
      ],
    },
    {
      id: "loan",
      title: "Loan Application",
      description: "Loan application and tracking.",
      userStories: [
        {
          id: "applyLoan",
          title: "Loan Application Form",
          description: "Users apply for loans via form.",
          tasks: [
            {
              id: "loanForm",
              title: "Loan Form",
              type: "form",
              fields: [
                { name: "fullName", type: "text", required: true },
                { name: "amount", type: "number", required: true, min: 1000 },
                {
                  name: "term",
                  type: "select",
                  required: true,
                  options: ["6 months", "12 months", "24 months"],
                },
                { name: "email", type: "email", required: true },
              ],
              submitText: "Apply",
              onSubmit: "mockLoanApplication",
            },
            {
              id: "loanDashboard",
              title: "Loan Status Dashboard",
              type: "dashboard",
              metrics: [
                { name: "Applications", value: 23 },
                { name: "Approved", value: 12 },
                { name: "Pending", value: 8 },
                { name: "Rejected", value: 3 },
              ],
            },
          ],
        },
      ],
    },
  ],
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar epics={epicsJSON.epics} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to={`/epic/${epicsJSON.epics[0].id}`} replace />} />
            {epicsJSON.epics.map((epic) => (
              <Route key={epic.id} path={`/epic/${epic.id}`} element={<EpicPage epic={epic} />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Sidebar({ epics }) {
  return (
    <nav className="sidebar">
      <h1>Epics</h1>
      <ul>
        {epics.map((epic) => (
          <li key={epic.id}>
            <NavLink
              to={`/epic/${epic.id}`}
              className={({ isActive }) => (isActive ? "active-link" : undefined)}
              end
            >
              {epic.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function EpicPage({ epic }) {
  const [selectedUserStoryID, setSelectedUserStoryID] = useState(epic.userStories[0]?.id ?? "");
  const selectedUserStory = epic.userStories.find((us) => us.id === selectedUserStoryID);

  if (!selectedUserStory) {
    return <p>No User Stories available.</p>;
  }

  return (
    <section className="epic-page">
      <h1>{epic.title}</h1>
      <p>{epic.description}</p>

      <div className="user-stories-tabs">
        {epic.userStories.map((us) => (
          <button
            key={us.id}
            className={us.id === selectedUserStoryID ? "tab active" : "tab"}
            onClick={() => setSelectedUserStoryID(us.id)}
          >
            {us.title}
          </button>
        ))}
      </div>

      <UserStory userStory={selectedUserStory} />
    </section>
  );
}

function UserStory({ userStory }) {
  return (
    <div className="user-story">
      <h2>{userStory.title}</h2>
      <p>{userStory.description}</p>
      <div className="tasks-container">
        {userStory.tasks.map((task) => (
          <TaskRenderer key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

function TaskRenderer({ task }) {
  switch (task.type) {
    case "form":
      return <DynamicForm task={task} />;
    case "statusTracker":
      return <StatusTracker task={task} />;
    case "dashboard":
      return <Dashboard task={task} />;
    default:
      return (
        <div className="task">
          <h3>{task.title}</h3>
          <p>Task type "{task.type}" is not implemented.</p>
        </div>
      );
  }
}

// FORM COMPONENT WITH FORM VALIDATION

function DynamicForm({ task }) {
  const initialValues = {};
  const validationSchemaShape = {};

  // Build initialValues and validation from fields dynamically
  task.fields.forEach((field) => {
    initialValues[field.name] = "";
    let validator;

    switch (field.type) {
      case "email":
        validator = Yup.string().email("Invalid email").required("Required");
        break;
      case "password":
        validator = Yup.string().required("Required");
        if (field.minLength) validator = validator.min(field.minLength, `Min length ${field.minLength}`);
        break;
      case "number":
        validator = Yup.number()
          .typeError("Must be a number")
          .required("Required");
        if (field.min !== undefined) validator = validator.min(field.min, `Min ${field.min}`);
        if (field.max !== undefined) validator = validator.max(field.max, `Max ${field.max}`);
        break;
      case "select":
        validator = Yup.string().required("Required");
        break;
      default:
        validator = Yup.string().required("Required");
    }

    validationSchemaShape[field.name] = validator;
  });

  // Add validation for fields that rely on matching another field
  task.fields.forEach((field) => {
    if (field.matchField) {
      validationSchemaShape[field.name] = Yup.string()
        .oneOf([Yup.ref(field.matchField), null], `${field.name} must match ${field.matchField}`)
        .required("Required");
    }
  });

  const validationSchema = Yup.object().shape(validationSchemaShape);

  async function onSubmit(values, actions) {
    // Mock backend delay
    await new Promise((r) => setTimeout(r, 1000));
    let message = "Form submitted successfully!";
    switch (task.onSubmit) {
      case "mockRegister":
        message = `User registered with email: ${values.email}`;
        break;
      case "mockLoanApplication":
        message = `Loan applied for ${values.fullName}, amount: ${values.amount}`;
        break;
      default:
        message = `Form submitted`;
    }
    alert(message);
    actions.setSubmitting(false);
    actions.resetForm();
  }

  return (
    <div className="task task-form">
      <h3>{task.title}</h3>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form className="form-container">
            {task.fields.map((field) => (
              <div className="form-field" key={field.name}>
                <label htmlFor={field.name}>
                  {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </label>
                {field.type === "select" ? (
                  <Field as="select" name={field.name} id={field.name}>
                    <option value="">Select</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                ) : (
                  <Field type={field.type} id={field.name} name={field.name} autoComplete="off" />
                )}
                <ErrorMessage name={field.name} component="div" className="error" />
              </div>
            ))}
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : task.submitText || "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

// STATUS TRACKER COMPONENT

function StatusTracker({ task }) {
  const [status, setStatus] = React.useState(task.states[0]);
  const [userInfo, setUserInfo] = React.useState(null);

  function login() {
    setStatus("logging in");
    setTimeout(() => {
      setStatus("logged in");
      setUserInfo({
        email: "user@example.com",
        lastLogin: new Date().toLocaleString(),
      });
    }, 1500);
  }

  function logout() {
    setStatus("logged out");
    setUserInfo(null);
  }

  return (
    <div className="task status-tracker">
      <h3>{task.title}</h3>
      <p>
        Status: <strong>{status}</strong>
      </p>
      {status === "logged out" && <button onClick={login}>Login</button>}
      {status === "logging in" && <p>Logging in...</p>}
      {status === "logged in" && (
        <>
          <div className="user-info">
            {task.userInfoFields.map((field) => (
              <p key={field}>
                <strong>{field}:</strong> {userInfo[field] || "-"}
              </p>
            ))}
          </div>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
}

// DASHBOARD COMPONENT USING RECHARTS

function Dashboard({ task }) {
  const data = task.metrics.map(({ name, value }) => ({ name, value }));
  return (
    <div className="task dashboard">
      <h3>{task.title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value" fill="#3182ce" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function NotFound() {
  return (
    <section>
      <h2>404 - Page Not Found</h2>
      <p>The page you requested was not found.</p>
    </section>
  );
}

export default App;