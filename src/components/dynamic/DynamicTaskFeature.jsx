import React, { useState, useEffect } from "react";

const memory = {
  applications: [],
  ocrScans: {},
  notifications: [],
  stats: {
    submitted: 14,
    approved: 6,
    auto: 10,
    manual: 4,
    avgTimeHrs: 19,
    csat: 88 // percent
  }
};

function randomId() {
  return Math.random().toString(36).slice(2,10);
}

export default function DynamicTaskFeature({ task, allTasks }) {
  // ---- LOAN APPLICATION FORM ----
  if (/application form|loan application.*form/i.test(task.name + " " + task.description)) {
    return <LoanApplicationForm allTasks={allTasks} />;
  }
  if (/validation and error/i.test(task.name + " " + task.description)) {
    return <LoanApplicationForm allTasks={allTasks} />;
  }
  if (/confirmation message/i.test(task.name + " " + task.description)) {
    return <LoanApplicationForm allTasks={allTasks} />;
  }

  // ---- TRACKER ----
  if (/status tracker|progress/i.test(task.name + " " + task.description)) {
    return <AppStatusTracker />;
  }
  if (/pending actions/i.test(task.name + " " + task.description)) {
    return <PendingActionDemo />;
  }

  // ---- OCR ----
  if (/ocr.*api|ocr|document.*scan|document.*extract/i.test(task.name + " " + task.description)) {
    return <OCRIntegration task={task} />;
  }

  // ---- CREDIT SCORE API ----
  if (/credit.*api|credit.*score/i.test(task.name + " " + task.description)) {
    return <CreditCheckDemo />;
  }

  // ---- Notification ----
  if (/notification|banner|toast/i.test(task.name + " " + task.description)) {
    return <NotificationDemo />;
  }
  if (/trigger notification/i.test(task.name + " " + task.description)) {
    return <NotificationDemo />;
  }

  // ---- DASHBOARD / ANALYTICS ----
  if (/dashboard|analytics|chart/i.test(task.name + " " + task.description)) {
    return <AnalyticsDashboard />;
  }

  // fallback: summary
  return (
    <div>
      <b>{task.name}:</b> {task.description}
    </div>
  );
}

// -----------------------------
// LOAN APPLICATION FORM + SUBMIT
// -----------------------------
function LoanApplicationForm({ allTasks }) {
  const [form, setForm] = useState({
    name: "",
    loanType: "personal",
    amount: "",
    docs: null
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [summary, setSummary] = useState(null);
  const [ocrText, setOcrText] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  // Find OCR scan task to combine document scan if present
  const hasOCR = (allTasks || []).some(
    t => /ocr|scan|document.*extract/i.test(t.name + " " + t.description)
  );

  function validate(form) {
    const errs = {};
    if (!form.name) errs.name = "Required";
    if (!form.amount || isNaN(form.amount) || +form.amount < 1000)
      errs.amount = "Enter a valid amount (min 1000)";
    if (!form.docs) errs.docs = "Upload required document file";
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors({});
    setShowConfirm(false);
  }
  function handleFile(e) {
    const file = e.target.files?.[0];
    setForm(f => ({ ...f, docs: file }));
    setErrors({});
    setShowConfirm(false);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);

    // Simulate OCR if applicable
    if (hasOCR) {
      // Fake async OCR
      setOcrText("Processing document with OCR...");
      setTimeout(() => {
        const extracted = "Name: " + form.name + "\nIncome: $74,000";
        setOcrText("Extracted Info:\n" + extracted);
        memory.ocrScans[form.name] = extracted;
      }, 1000);
    }

    setTimeout(() => {
      setSummary({
        name: form.name,
        loanType: form.loanType,
        amount: form.amount,
        docName: form.docs?.name,
        submittedAt: new Date().toLocaleString()
      });
      // Log as completed
      memory.applications.push({
        ...form,
        id: randomId()
      });
      setShowConfirm(true);
      setSubmitted(false);
    }, 1000);
  }

  if (showConfirm && summary) {
    return (
      <div className="success-msg">
        <b>Application Submitted!</b>
        <div>
          <b>Name:</b> {summary.name}
        </div>
        <div>
          <b>Type:</b> {summary.loanType}
        </div>
        <div>
          <b>Amount:</b> ${summary.amount}
        </div>
        <div>
          <b>Document:</b> {summary.docName}
        </div>
        <div>
          <b>Time:</b> {summary.submittedAt}
        </div>
        {hasOCR && <div style={{marginTop:5}}><pre style={{fontSize:13}}>{ocrText}</pre></div>}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <label>
        Name
        <input
          name="name"
          value={form.name}
          disabled={submitted}
          onChange={handleChange}
        />
        {errors.name && <span className="error-msg">{errors.name}</span>}
      </label>
      <label>
        Loan Type
        <select
          name="loanType"
          value={form.loanType}
          disabled={submitted}
          onChange={handleChange}
        >
          <option value="personal">Personal</option>
          <option value="home">Home</option>
        </select>
      </label>
      <label>
        Amount
        <input
          name="amount"
          value={form.amount}
          disabled={submitted}
          onChange={handleChange}
        />
        {errors.amount && <span className="error-msg">{errors.amount}</span>}
      </label>
      <label>
        Upload Document
        <input type="file" onChange={handleFile} disabled={submitted} />
        {errors.docs && <span className="error-msg">{errors.docs}</span>}
      </label>
      <button type="submit" disabled={submitted}>
        {submitted ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}

// -----------------------------
// STATUS TRACKER
// -----------------------------
function AppStatusTracker() {
  // Demo progress state
  const steps = [
    "Info Provided",
    "Docs Verified",
    "Credit Score Checked",
    "Approved/Rejected"
  ];
  const [current, setCurrent] = useState(2);
  function next() {
    setCurrent(c => Math.min(steps.length - 1, c + 1));
  }
  function prev() {
    setCurrent(c => Math.max(0, c - 1));
  }
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
      <div style={{marginTop:7}}>
        <button onClick={prev} disabled={current === 0}>Back</button>{" "}
        <button onClick={next} disabled={current === steps.length - 1}>Next</button>
      </div>
    </div>
  );
}
function PendingActionDemo() {
  // Typical pending-case mock-up
  const [pending, setPending] = useState(true);
  return (
    <div className="success-msg">
      {pending
        ? <>
            <b>Pending Action:</b> Please upload missing income proof.
            <button style={{marginLeft:14}} onClick={() => setPending(false)}>Mark as Done</button>
          </>
        : <>All actions complete!<span role="img" aria-label="done">✔️</span></>
      }
    </div>
  );
}

// -----------------------------
// OCR INTEGRATION
// -----------------------------
function OCRIntegration() {
  const [file, setFile] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState("");

  function handleFile(e) {
    setFile(e.target.files?.[0]);
    setResult("");
  }

  function handleScan() {
    if (!file) return;
    setScanning(true);
    setTimeout(() => {
      setResult("Extracted: John Doe\nID# 423729, Salary: 75,000\n(Document parsed successfully!)");
      setScanning(false);
    }, 1400);
  }

  return (
    <div>
      <label>
        Upload Document for OCR:
        <input type="file" onChange={handleFile} />
      </label>
      <button onClick={handleScan} disabled={!file || scanning}>
        {scanning ? "Scanning..." : "Simulate OCR"}
      </button>
      {result && <div className="success-msg" style={{marginTop: 12}}><pre>{result}</pre></div>}
    </div>
  );
}

// -----------------------------
// CREDIT CHECK INTEGRATION DEMO
// -----------------------------
function CreditCheckDemo() {
  const [status, setStatus] = useState("");
  const [score, setScore] = useState(null);
  function simulateCheck() {
    setStatus("Checking with credit bureau API...");
    setScore(null);
    setTimeout(() => {
      const fakeScore = Math.floor(640 + Math.random() * 100);
      setScore(fakeScore);
      setStatus(
        fakeScore >= 700
          ? "Credit check passed (Good)"
          : fakeScore >= 680
          ? "Credit check passed (OK)"
          : "Credit check failed"
      );
    }, 1100);
  }
  return (
    <div>
      <button onClick={simulateCheck}>
        Simulate Credit Bureau Check
      </button>
      {score !== null && (
        <div style={{marginTop:7}}>
          <b>Score:</b> {score}<br/>
          <b>Status:</b> {status}
        </div>
      )}
    </div>
  );
}

// -----------------------------
// NOTIFICATION DEMO
// -----------------------------
function NotificationDemo() {
  const [shown, setShown] = useState(false);
  function trigger() {
    setShown(true);
    setTimeout(() => setShown(false), 2200);
  }
  return (
    <div>
      <button onClick={trigger}>Trigger Notification</button>
      {shown && (
        <div className="notification">
          <b>Status:</b> Your loan application is now under credit review.<br />
          We'll notify you when a decision is made.
        </div>
      )}
    </div>
  );
}

// -----------------------------
// ANALYTICS DASHBOARD DEMO
// -----------------------------
function AnalyticsDashboard() {
  const { submitted, approved, auto, manual, avgTimeHrs, csat } = memory.stats;
  return (
    <div>
      <b>Loan Analytics (Demo):</b>
      <table className="table-apps" style={{ maxWidth: 440, marginTop: 9 }}>
        <tbody>
          <tr><td>Submitted</td><td>{submitted}</td></tr>
          <tr><td>Approved</td><td>{approved}</td></tr>
          <tr><td>Auto-processed</td><td>{auto}</td></tr>
          <tr><td>Manual Review</td><td>{manual}</td></tr>
          <tr><td>Avg Processing Time</td><td>{avgTimeHrs} hrs</td></tr>
          <tr><td>CSAT</td><td>{csat}%</td></tr>
        </tbody>
      </table>
      <MiniChart
        data={{
          "Personal Loans": 7,
          "Home Loans": 7
        }}
        title="Loan Types"
      />
      <MiniChart
        data={{
          "Approved": approved,
          "Auto": auto,
          "Manual": manual,
          "Rejected": Math.max(0, submitted - approved)
        }}
        title="Loan Outcomes"
      />
      <div style={{marginTop:9, fontSize: "1.01em"}}>
        <b>Pie Chart Legend:</b> <span style={{display:"inline-block",width:18,height:10,background:"#38bdf8"}} /> Data bar
      </div>
    </div>
  );
}

// Reusable bar chart component
function MiniChart({ data, title }) {
  const max = Math.max(...Object.values(data), 1);
  return (
    <div style={{ maxWidth: 355, marginTop: 10, marginBottom: 18 }}>
      {title && <div style={{fontWeight:500,marginBottom:4}}>{title}</div>}
      {Object.entries(data).map(([label, value]) => (
        <div className="chart-bar-container" key={label}>
          <span className="chart-bar-label">{label}</span>
          <span
            className="chart-bar"
            style={{
              width: (100 * value) / max + "%",
              minWidth: (8 + (value * 11)) + "px"
            }}
          />
          <span className="chart-bar-value">{value}</span>
        </div>
      ))}
    </div>
  );
}
