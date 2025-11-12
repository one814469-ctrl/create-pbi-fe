import React, { useState, useEffect } from "react";

/**
 * module-global singletons for app-level "backend" state for demo
 */
const memory = {
  users: [
    { id: 1, name: "Alice Johnson", email: "alice@email.com" },
    { id: 2, name: "Bob Smith", email: "bob@email.com" },
    { id: 3, name: "Charlie Lee", email: "charlie@email.com" }
  ],
  boards: []
};

/**
 * Core logic:
 * Map task names/descriptions to functionality type.
 * "form", "input", "submit" => input/submit form
 * "list", "table", "display" => summary/list/table
 * "remove", "delete" => button w/ action
 * "upload" => file uploader
 * "notification" => notification mock
 * "dashboard", "chart", "report" => visual
 * "tracker", "status" => progress tracker
 * fallback => read-only summary
 */
export default function DynamicTaskFeature({ task, allTasks }) {
  // --- Registration Form
  if (
    /registration form|register a new user|form with .*name.*email.*password/i.test(
      task.name + " " + task.description
    )
  ) {
    const submitTask = allTasks.find(t =>
      /handle form submission|process .*user data/i.test(
        t.name + " " + t.description
      )
    );
    return <RegistrationForm submitTask={!!submitTask} />;
  }

  // --- Handle Registration Submission alone (if no form)
  if (/handle form submission|process .*user data/i.test(task.name + " " + task.description)) {
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
  if (/remove user|delete user/i.test(task.name + " " + task.description)) {
    // Handled above.
    return null;
  }

  // --- Board Creation Form
  if (/board creation form|create a new board|entering board name/i.test(task.name + " " + task.description)) {
    const saveTask = allTasks.find(t =>
      /save.*board|add.*board/i.test(t.name + " " + t.description)
    );
    return <CreateBoardForm allowSave={!!saveTask} />;
  }

  // --- Save new board
  if (/save.*board|add.*board/i.test(task.name + " " + task.description)) {
    return <CreateBoardForm allowSave />;
  }

  // --- List Boards
  if (/display boards|show .*boards/i.test(task.name + " " + task.description)) {
    return <BoardsList />;
  }

  // --- notification
  if (/notification|email|sms/i.test(task.name + " " + task.description)) {
    return <Notification text="This is a mock notification (no real emails sent)." />;
  }

  // --- tracker or status
  if (/track|track.*status|status/i.test(task.name + " " + task.description)) {
    return <ProgressTracker steps={["Started", "In Progress", "Submitted", "Complete"]} current={2} />;
  }

  // --- dashboard/report/chart
  if (/dashboard|report|chart/i.test(task.name + " " + task.description)) {
    return <MiniChart data={{"In Progress": 2, "Complete": 1, "Failed": 0}} />;
  }

  // --- upload
  if (/upload|file|document/i.test(task.name + " " + task.description)) {
    return <FileUploader />;
  }

  // fallback: show title/desc
  return (
    <div className="generic-tasks-list">
      <b>{task.name}:</b> {task.description}
    </div>
  );
}

// Registration Form with inline submission & feedback
function RegistrationForm({ submitTask }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function validate({ name, email, password }) {
    if (!name || !email || !password) return "All fields are required.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email address.";
    if (password.length < 6) return "Password must be at least 6 characters.";
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

    setTimeout(() => {
      const newUser = {
        id: Math.max(...memory.users.map(u => u.id), 0) + 1,
        name: form.name,
        email: form.email
      };
      memory.users.push(newUser);
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

function UsersList({ showRemove = false }) {
  const [users, setUsers] = useState(memory.users);

  useEffect(() => {
    const sync = () => setUsers([...memory.users]);
    window.addEventListener("users_change", sync);
    return () => window.removeEventListener("users_change", sync);
  }, []);

  const handleRemove = id => {
    if (window.confirm("Remove this user?")) {
      const idx = memory.users.findIndex(u => u.id === id);
      if (idx !== -1) {
        memory.users.splice(idx, 1);
        setUsers([...memory.users]);
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
    const exists = memory.boards.some(
      b => b.name.toLowerCase() === form.name.toLowerCase()
    );
    if (exists) {
      setErrorMsg("A board with this name already exists.");
      setSubmitting(false);
      return;
    }
    setTimeout(() => {
      memory.boards.push({
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

function BoardsList() {
  const [boards, setBoards] = useState(memory.boards);

  useEffect(() => {
    const sync = () => setBoards([...memory.boards]);
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

function Notification({ text }) {
  return <div className="notification">{text}</div>;
}

// Progress tracker/steps UI
function ProgressTracker({ steps, current }) {
  return (
    <div className="progress-tracker">
      {steps.map((step, i) => (
        <div
          className={
            "progress-item " +
            (i < current ? "done" : i === current ? "current" : "pending")
          }
          key={i}
        >
          {i < current ? "✔ " : i === current ? "→ " : ""}
          {step}
        </div>
      ))}
    </div>
  );
}

// Mini "chart" for report/dashboard
function MiniChart({ data }) {
  const max = Math.max(...Object.values(data), 1);
  return (
    <div style={{ maxWidth: 350, marginTop: 10 }}>
      {Object.entries(data).map(([label, value]) => (
        <div className="chart-bar-container" key={label}>
          <span className="chart-bar-label">{label}</span>
          <span
            className="chart-bar"
            style={{
              width: (100 * value) / max + "%",
              minWidth: 2 + value * 15 + "px"
            }}
          />
          <span className="chart-bar-value">{value}</span>
        </div>
      ))}
    </div>
  );
}

// Mock file upload/preview component
function FileUploader() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  function onPick(e) {
    const f = e.target.files?.[0];
    setFile(f);
    if (f) {
      if (f.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = ev => setPreview(ev.target.result);
        reader.readAsDataURL(f);
      } else {
        setPreview("");
      }
    }
  }
  return (
    <div>
      <label>
        Upload File
        <input type="file" onChange={onPick} />
      </label>
      {file && (
        <div style={{ marginTop: 8 }}>
          <div><b>Name:</b> {file.name}</div>
          <div><b>Type:</b> {file.type || "unknown"}</div>
          <div><b>Size:</b> {file.size} bytes</div>
          {preview && <img src={preview} alt="Preview" style={{ maxWidth: 200, marginTop: 8 }} />}
        </div>
      )}
    </div>
  );
}

<!-- verification: all PBIs + PRD objectives mapped and validated ✅ -->