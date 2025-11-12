import React, { useState, useEffect } from "react";

// Global state for "backend" data mocking
const globalMemory = {
  users: [
    { id: 1, name: "Alice Johnson", email: "alice@email.com" },
    { id: 2, name: "Bob Smith", email: "bob@email.com" },
    { id: 3, name: "Charlie Lee", email: "charlie@email.com" }
  ],
  boards: []
};

/**
 * React component that implements each task's UI and logic
 * based on dynamic task name/description.
 */
export default function DynamicTaskFeature({ task, allTasks }) {
  // --- Registration Form
  if (
    /registration form|register a new user|form with .*name.*email.*password/i.test(
      task.name + " " + task.description
    )
  ) {
    // Find if submit task is present in allTasks
    const submitTask = allTasks.find(t =>
      /handle form submission|process .*user data/i.test(
        t.name + " " + t.description
      )
    );
    return <RegistrationForm submitTask={!!submitTask} />;
  }

  // --- Handle Registration Submission alone (if no form)
  if (
    /handle form submission|process .*user data/i.test(
      task.name + " " + task.description
    )
  ) {
    return <RegistrationForm submitTask />;
  }

  // --- User List
  if (
    /fetch.*users|list of users|display users/i.test(
      task.name + " " + task.description
    )
  ) {
    const removeTask = allTasks.find(t =>
      /remove user|delete user/i.test(t.name + " " + t.description)
    );
    return <UsersList showRemove={!!removeTask} />;
  }

  // --- Remove user
  if (
    /remove user|delete user/i.test(task.name + " " + task.description)
  ) {
    // Handled by UsersList above
    return null;
  }

  // --- Board Creation Form
  if (
    /board creation form|create a new board|entering board name/i.test(
      task.name + " " + task.description
    )
  ) {
    const saveTask = allTasks.find(t =>
      /save.*board|add.*board/i.test(t.name + " " + t.description)
    );
    return <CreateBoardForm allowSave={!!saveTask} />;
  }

  // --- Save new board
  if (
    /save.*board|add.*board/i.test(task.name + " " + task.description)
  ) {
    return <CreateBoardForm allowSave />;
  }

  // --- List Boards
  if (
    /display boards|show .*boards/i.test(task.name + " " + task.description)
  ) {
    return <ListBoards />;
  }

  // --- Fallback: just show task name & description.
  return (
    <div className="generic-tasks-list">
      <b>{task.name}:</b> {task.description}
    </div>
  );
}

// --- COMPONENTS ---

// Registration Form & submission
function RegistrationForm({ submitTask }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function validate({ name, email, password }) {
    if (!name || !email || !password) return "All fields are required.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email address.";
    if (password.length < 6)
      return "Password must be at least 6 characters.";
    return null;
  }

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setSuccessMsg("");
    setErrorMsg("");
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");
    const error = validate(form);
    if (error) {
      setErrorMsg(error);
      setSubmitting(false);
      return;
    }

    // Mock API: push to globalMemory.users and show success
    setTimeout(() => {
      const newUser = {
        id: Math.max(...globalMemory.users.map(u => u.id), 0) + 1,
        name: form.name,
        email: form.email
      };
      globalMemory.users.push(newUser);
      setSuccessMsg("User registered successfully (mock)!");
      setForm({ name: "", email: "", password: "" });
      setSubmitting(false);
      window.dispatchEvent(new Event("users_change"));
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" style={{ marginBottom: "12px" }}>
      <label>
        Name
        <input
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Email
        <input
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          required
          value={form.password}
          onChange={handleChange}
        />
      </label>
      <button type="submit" disabled={submitting || !submitTask}>
        {submitting ? "Registering..." : "Register"}
      </button>
      {!submitTask && (
        <div className="success-msg" style={{ marginTop: 8, maxWidth: 400 }}>
          (Form present: integrate with submission task to allow user registration.)
        </div>
      )}
      {successMsg && <div className="success-msg">{successMsg}</div>}
      {errorMsg && <div className="error-msg">{errorMsg}</div>}
    </form>
  );
}

// User List & remove user
function UsersList({ showRemove = false }) {
  const [users, setUsers] = useState(globalMemory.users);

  useEffect(() => {
    const sync = () => setUsers([...globalMemory.users]);
    window.addEventListener("users_change", sync);
    return () => window.removeEventListener("users_change", sync);
  }, []);

  const handleRemove = id => {
    if (window.confirm("Remove this user?")) {
      const idx = globalMemory.users.findIndex(u => u.id === id);
      if (idx !== -1) {
        globalMemory.users.splice(idx, 1);
        setUsers([...globalMemory.users]);
      }
    }
  };

  if (users.length === 0)
    return <div className="success-msg">No users in the list (mock)!</div>;

  return (
    <table className="table-users">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          {showRemove ? <th style={{ width: "62px" }}>Remove</th> : null}
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            {showRemove ? (
              <td>
                <button
                  type="button"
                  className="remove-user-btn"
                  onClick={() => handleRemove(u.id)}
                  aria-label="Remove user"
                >
                  ✕
                </button>
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Board creation form and storing
function CreateBoardForm({ allowSave }) {
  const [form, setForm] = useState({ name: "", description: "" });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");
    if (!form.name) {
      setErrorMsg("Board name is required.");
      setSubmitting(false);
      return;
    }
    // Check for duplicate name (case-insensitive)
    const exists = globalMemory.boards.some(
      b => b.name.toLowerCase() === form.name.toLowerCase()
    );
    if (exists) {
      setErrorMsg("A board with this name already exists.");
      setSubmitting(false);
      return;
    }
    setTimeout(() => {
      globalMemory.boards.push({
        id: "" + Date.now(),
        name: form.name,
        description: form.description
      });
      setSuccessMsg("Board created!");
      setForm({ name: "", description: "" });
      setSubmitting(false);
      window.dispatchEvent(new Event("boards_change"));
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" style={{ marginBottom: 12 }}>
      <label>
        Board Name
        <input
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Description
        <textarea
          name="description"
          rows={2}
          value={form.description}
          onChange={handleChange}
        />
      </label>
      <button type="submit" disabled={submitting || !allowSave}>
        {submitting ? "Creating..." : "Create Board"}
      </button>
      {!allowSave && (
        <div className="success-msg" style={{ marginTop: 8, maxWidth: 480 }}>
          (Form present: integrate with save task to enable creation.)
        </div>
      )}
      {successMsg && <div className="success-msg">{successMsg}</div>}
      {errorMsg && <div className="error-msg">{errorMsg}</div>}
    </form>
  );
}

// List Boards
function ListBoards() {
  const [boards, setBoards] = useState(globalMemory.boards);

  useEffect(() => {
    const sync = () => setBoards([...globalMemory.boards]);
    window.addEventListener("boards_change", sync);
    return () => window.removeEventListener("boards_change", sync);
  }, []);

  if (!boards || boards.length === 0) {
    return (
      <div className="success-msg">No boards yet (create one above)!</div>
    );
  }

  return (
    <table className="table-boards">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {boards.map(board => (
          <tr key={board.id}>
            <td>{board.name}</td>
            <td>{board.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}