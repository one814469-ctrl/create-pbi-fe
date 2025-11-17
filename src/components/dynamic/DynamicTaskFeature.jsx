import React, { useState } from 'react';

// Utility matching rules for mapping task intent
function getFeatureComponent(task, epicSlug, userStoryId) {
  const lowerTitle = task.title.toLowerCase();
  const lowerDesc = task.description.toLowerCase();

  // Loan Application Form
  if (lowerTitle.includes('form')) {
    return <LoanApplicationForm />;
  }
  // Document Upload
  if (lowerTitle.includes('upload')) {
    return <DocumentUploadFeature />;
  }
  // Status Tracking / Confirmation
  if (lowerTitle.includes('confirmation') || lowerTitle.includes('status')) {
    return <ApplicationStatusFeature />;
  }
  // Notification mock
  if (lowerTitle.includes('notification')) {
    return <NotificationMockPanel />;
  }
  // Application list/details for dashboard
  if (lowerTitle.includes('list') || lowerTitle.includes('details')) {
    return <ApplicationListDetails />;
  }
  // Approve/reject logic
  if (lowerTitle.includes('approve') || lowerTitle.includes('reject')) {
    return <ApproveRejectActions />;
  }
  // Credit Bureau API mock
  if (lowerTitle.includes('credit bureau')) {
    return <CreditApiMock />;
  }
  // Document OCR API mock
  if (lowerTitle.includes('ocr')) {
    return <OCRApiMock />;
  }
  // Analytics dashboard
  if (lowerTitle.includes('analytics') || lowerTitle.includes('report')) {
    return <DashboardReportKPIs />;
  }
  // Notification interface for admin
  if (lowerTitle.includes('notification interface')) {
    return <AdminSystemNotifications />;
  }

  // Default: read-only description/summary
  return <DefaultTaskFeature task={task} />;
}

// Feature components

// ------------- Loan Application Form -------------
function LoanApplicationForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    loanType: '',
    loanAmount: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function validateFields() {
    // simple check
    if (!values.name || !values.email || !values.loanType || !values.loanAmount) {
      return false;
    }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validateFields()) {
      setSubmitted(true);
      setError('');
    } else {
      setError("All fields are required.");
    }
  }

  if (submitted) {
    return <div className="success-msg">Loan application submitted (mock).</div>;
  }

  return (
    <form className="loan-app-form" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={values.name}
          onChange={e => setValues({ ...values, name: e.target.value })}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={values.email}
          onChange={e => setValues({ ...values, email: e.target.value })}
          required
        />
      </label>
      <label>
        Loan Type:
        <select
          value={values.loanType}
          onChange={e => setValues({ ...values, loanType: e.target.value })}
          required
        >
          <option value="">Select...</option>
          <option value="Personal">Personal</option>
          <option value="Home">Home</option>
        </select>
      </label>
      <label>
        Loan Amount:
        <input
          type="number"
          min={1000}
          max={1000000}
          step={100}
          value={values.loanAmount}
          onChange={e => setValues({ ...values, loanAmount: e.target.value })}
          required
        />
      </label>
      <button type="submit">Submit Application</button>
      {error && <div className="error-msg">{error}</div>}
    </form>
  );
}

// ------------- Document Upload Feature -------------
function DocumentUploadFeature() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  function handleChange(e) {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
    setError('');
  }

  function handleRemove(idx) {
    setFiles(files.filter((_, i) => i !== idx));
  }

  return (
    <div className="doc-upload-zone">
      <input
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleChange}
      />
      {error && <div className="error-msg">{error}</div>}
      <ul className="uploaded-doc-list">
        {files.map((file, idx) => (
          <li key={idx}>
            {file.name}
            <button onClick={() => handleRemove(idx)}>Remove</button>
          </li>
        ))}
      </ul>
      {files.length > 0 && (
        <div className="preview-info">
          {files.length} document(s) uploaded (mock preview).
        </div>
      )}
    </div>
  );
}

// ------------- Application Status Feature -------------
function ApplicationStatusFeature() {
  const [status, setStatus] = useState('Submitted');

  function advanceStatus() {
    if (status === 'Submitted') setStatus('In Review');
    else if (status === 'In Review') setStatus('Approved');
    else if (status === 'Approved') setStatus('Disbursed');
    else setStatus('Submitted');
  }

  return (
    <div className="status-tracker-block">
      <div>
        <strong>Current Status:</strong>
        <span style={{
          marginLeft: '1em',
          fontWeight: 'bold',
          color:
            status === 'Submitted' ? '#1792d5' :
            status === 'In Review' ? '#ee962a' :
            status === 'Approved' ? '#2d8a4d' :
            '#184810'
        }}>
          {status}
        </span>
        <button
          style={{ marginLeft: '1.5em' }}
          onClick={advanceStatus}
          >
          Advance Status (Demo)
        </button>
      </div>
      {status === 'Submitted' && <div>Success! Application submitted.</div>}
      {status === 'Approved' && <div>Congratulations! Your loan is approved.</div>}
    </div>
  );
}

// ------------- Notification Mock Panel -------------
function NotificationMockPanel() {
  const [messages, setMessages] = useState([]);

  function handleSend(type) {
    let msg;
    if (type === 'email') {
      msg = {
        type: 'Email',
        content: 'Your loan application status was updated. Check your dashboard for details.'
      };
    } else if (type === 'sms') {
      msg = {
        type: 'SMS',
        content: 'Update: Loan app review in progress. Next steps coming soon.'
      };
    }
    setMessages(prev => [msg, ...prev]);
  }

  return (
    <div className="notification-panel">
      <button onClick={() => handleSend('email')}>Send Email Notification (Mock)</button>
      <button onClick={() => handleSend('sms')}>Send SMS Notification (Mock)</button>
      <ul className="notif-list">
        {messages.map((msg, idx) => (
          <li key={idx}>
            <strong>{msg.type}:</strong> {msg.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

// -------------------- Application List/Details --------------------
function ApplicationListDetails() {
  // demo mock data
  const [apps] = useState([
    { id: 1, name: 'Anna Green', type: 'Personal', status: 'Submitted' },
    { id: 2, name: 'Mike Lee', type: 'Home', status: 'In Review' },
    { id: 3, name: 'Becca Troy', type: 'Personal', status: 'Approved' }
  ]);
  const [selected, setSelected] = useState(null);

  return (
    <div className="app-list-details-block">
      <table className="app-list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Loan Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {apps.map(app => (
            <tr key={app.id} onClick={() => setSelected(app)}>
              <td>{app.name}</td>
              <td>{app.type}</td>
              <td>
                <span
                  style={{
                    fontWeight: 'bold',
                    color:
                      app.status === 'Submitted' ? '#1792d5' :
                      app.status === 'In Review' ? '#ee962a' :
                      app.status === 'Approved' ? '#2d8a4d' :
                      '#333'
                  }}
                >
                  {app.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selected && (
        <div className="app-details">
          <h5>{selected.name}'s Application</h5>
          <p>
            <strong>Type:</strong> {selected.type}
            <br />
            <strong>Status:</strong> {selected.status}
            <br />
            <strong>Docs:</strong>
            <ul>
              <li>ID_Document.pdf</li>
              <li>Income_Proof.jpg</li>
            </ul>
          </p>
          <button onClick={() => setSelected(null)}>Close Details</button>
        </div>
      )}
    </div>
  );
}

// -------------------- Approve/Reject Actions --------------------
function ApproveRejectActions() {
  // demo application state
  const [status, setStatus] = useState('In Review');
  const [message, setMessage] = useState('');

  function handleApprove() {
    setStatus('Approved');
    setMessage('Application Approved (mock feedback).');
  }
  function handleReject() {
    setStatus('Rejected');
    setMessage('Application Rejected (mock feedback).');
  }

  return (
    <div className="approve-reject-actions">
      <div>
        <strong>Status:</strong> {status}
      </div>
      <button style={{ background: '#2d8a4d', color: '#fff', marginRight: '1em' }} onClick={handleApprove}>Approve</button>
      <button style={{ background: '#a2392e', color: '#fff' }} onClick={handleReject}>Reject</button>
      {message && (
        <div className={status === 'Approved' ? 'success-msg' : 'error-msg'}>
          {message}
        </div>
      )}
    </div>
  );
}

// -------------------- Credit Bureau API Mock --------------------
function CreditApiMock() {
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(null);
  const [error, setError] = useState('');

  function handleFetchScore() {
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (Math.random() > 0.85) {
        setError("Credit Bureau API unavailable (mock fallback).");
        setScore(null);
      } else {
        setScore(742);
        setError('');
      }
      setLoading(false);
    }, 1800);
  }

  return (
    <div className="credit-api-mock">
      <button onClick={handleFetchScore}>Fetch Credit Score (Mock)</button>
      {loading && <div>Loading Credit Data...</div>}
      {score && (
        <div>
          <strong>Credit Score:</strong> {score}
        </div>
      )}
      {error && <div className="error-msg">{error}</div>}
    </div>
  );
}

// -------------------- OCR API Mock --------------------
function OCRApiMock() {
  const [fields, setFields] = useState(null);

  function handleVerify() {
    setTimeout(() => {
      setFields({
        Name: "Anna Green",
        Income: "87,000 USD",
        Document: "ID_Document.pdf"
      });
    }, 1200);
  }

  return (
    <div className="ocr-api-mock">
      <button onClick={handleVerify}>Verify Document (Mock OCR)</button>
      {fields && (
        <div className="ocr-fields">
          <strong>Extracted Fields:</strong>
          <ul>
            {Object.entries(fields).map(([k, v]) => (
              <li key={k}><strong>{k}:</strong> {v}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// -------------------- Dashboard Report KPIs --------------------
function DashboardReportKPIs() {
  // Demo PRD metric values
  const kpiData = {
    'Auto-Processed %': 82,
    'Manual Intervention %': 4,
    'Uptime %': 90,
    'Post-Launch CSAT %': 91
  };
  return (
    <div className="dashboard-report">
      <h5>Loan Application KPIs (Demo)</h5>
      <table>
        <thead>
          <tr>
            <th>KPI</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(kpiData).map(([kpi, val], idx) => (
            <tr key={idx}>
              <td>{kpi}</td>
              <td>{val}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '1em' }}>
        {/* Simple demo chart bar */}
        <div style={{ background: '#e6f8ec', padding: '0.5em 1em', borderRadius: 6 }}>
          <strong>Auto-Processed:</strong>
          <div style={{
            height: 18,
            width: kpiData['Auto-Processed %'] + '%',
            background: '#2d8a4d',
            display: 'inline-block',
            minWidth: 24,
            verticalAlign: 'middle'
          }}>
          </div>
          <span style={{ marginLeft: 6 }}>{kpiData['Auto-Processed %']}%</span>
        </div>
        <div style={{ background: '#faebe7', padding: '0.5em 1em', borderRadius: 6, marginTop: '0.6em' }}>
          <strong>Manual Intervention:</strong>
          <div style={{
            height: 18,
            width: kpiData['Manual Intervention %'] + '%',
            background: '#ee962a',
            display: 'inline-block',
            minWidth: 18,
            verticalAlign: 'middle'
          }}>
          </div>
          <span style={{ marginLeft: 6 }}>{kpiData['Manual Intervention %']}%</span>
        </div>
      </div>
    </div>
  );
}

// -------------------- Admin System Notifications --------------------
function AdminSystemNotifications() {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState([]);
  function handleSend(type) {
    if (!message) return;
    setSent(s => [{
      type,
      content: message,
      date: new Date().toLocaleString()
    }, ...s]);
    setMessage('');
  }
  return (
    <div className="admin-system-notif">
      <textarea
        rows={3}
        value={message}
        placeholder="Enter compliance/reminder message..."
        onChange={e => setMessage(e.target.value)}
      />
      <div>
        <button onClick={() => handleSend('Compliance')}>Send Compliance Notification</button>
        <button onClick={() => handleSend('Reminder')}>Send Reminder Notification</button>
      </div>
      <ul className="notif-list">
        {sent.map((msg, idx) => (
          <li key={idx}>
            <strong>{msg.type}:</strong> {msg.content}
            <span style={{ marginLeft: '2em', color: '#868' }}>{msg.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ------------------ Default Fallback ---------------------
function DefaultTaskFeature({ task }) {
  // Display read-only description if no UI mapping.
  return (
    <div style={{ background: "#eee", padding: "0.6em", borderRadius: 4, margin: "0.5em 0" }}>
      <em>No interactive demo available for this task: </em>
      <span>{task.description}</span>
    </div>
  );
}

export default function DynamicTaskFeature(props) {
  return getFeatureComponent(props.task, props.epicSlug, props.userStoryId);
}