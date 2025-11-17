import React, { useState, useEffect } from 'react';

function TaskComponent({ task }) {
  // State for Loan Application Form
  const [loanType, setLoanType] = useState('personal');
  const [loanAmount, setLoanAmount] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // State for Application Status Tracking
  const [applicationStatus, setApplicationStatus] = useState('Submitted');
  const statusOptions = ['Submitted', 'Under Review', 'Approved', 'Rejected'];
  const [statusLoading, setStatusLoading] = useState(false);

  // State for Document Upload & OCR Processing
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [ocrProcessing, setOcrProcessing] = useState(false);
  const [ocrResult, setOcrResult] = useState('');
  const [ocrError, setOcrError] = useState('');

  // State for Credit Check Integration
  const [creditScore, setCreditScore] = useState(null);
  const [creditCheckLoading, setCreditCheckLoading] = useState(false);
  const [creditCheckError, setCreditCheckError] = useState('');

  // State for Notification System
  const [notificationRecipient, setNotificationRecipient] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationSending, setNotificationSending] = useState(false);
  const [notificationSentMessage, setNotificationSentMessage] = useState('');

  // State for Reporting Dashboard
  const [reportLoading, setReportLoading] = useState(false);
  const [reportDisplayData, setReportDisplayData] = useState({
    totalApplications: 125,
    approved: 75,
    rejected: 25,
    pending: 25
  });

  // Clear file preview when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

  // --- Handlers ---

  // Loan Application Form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSubmitted(false);

    if (!applicantName.trim() || !loanAmount || parseFloat(loanAmount) <= 0) {
      setFormError('Please fill in all mandatory fields with valid data (Name and positive Loan Amount).');
      return;
    }

    setFormLoading(true);
    // Simulate API call
    console.log(`Submitting ${loanType} loan for ${applicantName} with amount ${loanAmount}`);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    setFormLoading(false);
    setFormSubmitted(true);
    setLoanAmount('');
    setApplicantName('');
    setFormError(''); // Clear any previous errors on success
  };

  // Application Status Tracking
  const handleStatusUpdate = async () => {
    setStatusLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const currentIndex = statusOptions.indexOf(applicationStatus);
    const nextIndex = (currentIndex + 1) % statusOptions.length;
    setApplicationStatus(statusOptions[nextIndex]);
    setStatusLoading(false);
  };

  // Document Upload & OCR Processing
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (filePreview) URL.revokeObjectURL(filePreview); // Clean up previous preview
      setFilePreview(URL.createObjectURL(file));
      setOcrResult('');
      setOcrError('');
    } else {
      setSelectedFile(null);
      if (filePreview) URL.revokeObjectURL(filePreview);
      setFilePreview(null);
      setOcrResult('');
      setOcrError('');
    }
  };

  const handleOCRProcessing = async () => {
    if (!selectedFile) {
      setOcrError('Please select a file to upload first.');
      return;
    }
    setOcrProcessing(true);
    setOcrResult('');
    setOcrError('');

    // Simulate OCR API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    const success = Math.random() > 0.3; // 70% success rate
    if (success) {
      setOcrResult(`Document "${selectedFile.name}" verified successfully (mock).`);
    } else {
      setOcrError(`Verification failed for "${selectedFile.name}". Please re-upload or review manually.`);
      // As per PRD Risk mitigation: "System flags failed verifications for manual review."
      console.warn('OCR failed, flagging for manual review.');
    }
    setOcrProcessing(false);
  };

  // Credit Check Integration
  const handleCreditCheck = async () => {
    setCreditCheckLoading(true);
    setCreditScore(null);
    setCreditCheckError('');

    // Simulate Credit Bureau API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    const success = Math.random() > 0.2; // 80% success rate
    if (success) {
      setCreditScore(Math.floor(Math.random() * (850 - 300 + 1)) + 300); // Random score between 300-850
      console.log('API request logged for compliance.'); // AC: System logs each API request for compliance.
    } else {
      setCreditCheckError('Failed to fetch credit score. API unavailable or error.');
      // PRD Risk mitigation: "Implement fallback manual verification process"
      console.warn('Credit API unavailability detected. Fallback to manual verification initiated.');
    }
    setCreditCheckLoading(false);
  };

  // Notification System
  const handleSendNotification = async () => {
    if (!notificationRecipient.trim() || !notificationMessage.trim()) {
      setNotificationSentMessage('Please enter a recipient and a message.');
      return;
    }
    setNotificationSending(true);
    setNotificationSentMessage('');

    // Simulate Email/SMS API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    const success = Math.random() > 0.1; // 90% success
    if (success) {
      setNotificationSentMessage(`Notification sent to ${notificationRecipient} successfully!`);
      setNotificationRecipient('');
      setNotificationMessage('');
      console.log('Notification sent via mock Twilio/SendGrid.'); // AC: Notifications sent when loan status changes.
    } else {
      setNotificationSentMessage('Failed to send notification. Please try again.');
    }
    setNotificationSending(false);
    setTimeout(() => setNotificationSentMessage(''), 5000); // Clear message after 5 seconds
  };

  // Reporting Dashboard
  const handleGenerateReport = async () => {
    setReportLoading(true);
    // Simulate fetching report data or generating PDF/CSV
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Report generated and downloaded successfully (mock PDF/CSV).');
    console.log('Report exported as mock PDF/CSV.'); // AC: Reports exportable as PDF or CSV.
    setReportLoading(false);
  };

  // --- Render Logic based on keywords ---
  const renderInteractiveElement = () => {
    const description = task.description.toLowerCase();

    // Loan Application Form & Submission Logic
    if (description.includes("form") || description.includes("submission")) {
      return (
        <form onSubmit={handleFormSubmit} className="mt-4 p-4 border border-gray-200 rounded-md bg-white">
          <h5 className="font-semibold text-gray-800 mb-3">Loan Application Form</h5>
          <div className="mb-3">
            <label htmlFor="loanType" className="block text-sm font-medium text-gray-700">Loan Type</label>
            <select
              id="loanType"
              name="loanType"
              value={loanType}
              onChange={(e) => setLoanType(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="personal">Personal Loan</option>
              <option value="home">Home Loan</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="applicantName" className="block text-sm font-medium text-gray-700">Applicant Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="applicantName"
              name="applicantName"
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">Loan Amount ($) <span className="text-red-500">*</span></label>
            <input
              type="number"
              id="loanAmount"
              name="loanAmount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
              placeholder="Ex: 50000"
              min="1"
              required
            />
          </div>
          {formError && <p className="text-red-500 text-sm mb-2">{formError}</p>}
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={formLoading}
          >
            {formLoading ? 'Submitting...' : 'Submit Application'}
          </button>
          {formSubmitted && <p className="mt-2 text-green-600 text-sm">Application submitted successfully!</p>}
        </form>
      );
    }

    // Application Status Tracking
    if (description.includes("tracking") || description.includes("status")) {
      return (
        <div className="mt-4 p-4 border border-gray-200 rounded-md bg-white">
          <h5 className="font-semibold text-gray-800 mb-2">Application Status Tracker</h5>
          <p className="text-sm text-gray-600">Current Status: <span className="font-medium text-blue-700">{applicationStatus}</span></p>
          <button
            onClick={handleStatusUpdate}
            className="mt-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={statusLoading}
          >
            {statusLoading ? 'Updating...' : 'Advance Status'}
          </button>
        </div>
      );
    }

    // Document Upload, OCR Processing, and Verification Failures
    if (description.includes("upload") || description.includes("document") || description.includes("file") || description.includes("ocr") || description.includes("verification")) {
      return (
        <div className="mt-4 p-4 border border-gray-200 rounded-md bg-white">
          <h5 className="font-semibold text-gray-800 mb-2">Document Upload & OCR Verification</h5>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          {selectedFile && <p className="mt-2 text-sm text-gray-600">Selected: {selectedFile.name}</p>}
          {filePreview && (
            <div className="mt-2">
              <img src={filePreview} alt="Document Preview" className="max-w-xs h-auto rounded-md border border-gray-300" />
            </div>
          )}
          <button
            onClick={handleOCRProcessing}
            className="mt-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            disabled={ocrProcessing || !selectedFile}
          >
            {ocrProcessing ? 'Processing...' : 'Run OCR Verification'}
          </button>
          {ocrResult && <p className="mt-2 text-green-600 text-sm">{ocrResult}</p>}
          {ocrError && <p className="mt-2 text-red-600 text-sm">{ocrError}</p>}
          {!selectedFile && <p className="mt-2 text-sm text-gray-500">Upload a document first to run OCR.</p>}
        </div>
      );
    }

    // Credit Check Integration
    if (description.includes("credit") || description.includes("score") || description.includes("api")) {
      return (
        <div className="mt-4 p-4 border border-gray-200 rounded-md bg-white">
          <h5 className="font-semibold text-gray-800 mb-2">Credit Check Integration</h5>
          <button
            onClick={handleCreditCheck}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            disabled={creditCheckLoading}
          >
            {creditCheckLoading ? 'Fetching Score...' : 'Fetch Credit Score'}
          </button>
          {creditScore && <p className="mt-2 text-sm text-gray-700">Credit Score: <span className="font-bold">{creditScore}</span></p>}
          {creditCheckError && <p className="mt-2 text-red-600 text-sm">{creditCheckError}</p>}
        </div>
      );
    }

    // Notification System
    if (description.includes("notification") || description.includes("email") || description.includes("sms")) {
      return (
        <div className="mt-4 p-4 border border-gray-200 rounded-md bg-white">
          <h5 className="font-semibold text-gray-800 mb-2">Send Notification</h5>
          <div className="mb-3">
            <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">Recipient (Email/Phone)</label>
            <input
              type="text"
              id="recipient"
              value={notificationRecipient}
              onChange={(e) => setNotificationRecipient(e.target.value)}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
              placeholder="email@example.com or +1234567890"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              value={notificationMessage}
              onChange={(e) => setNotificationMessage(e.target.value)}
              rows="3"
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
              placeholder="Your loan status has changed..."
              required
            ></textarea>
          </div>
          <button
            onClick={handleSendNotification}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            disabled={notificationSending}
          >
            {notificationSending ? 'Sending...' : 'Send Notification'}
          </button>
          {notificationSentMessage && <p className="mt-2 text-sm text-gray-700">{notificationSentMessage}</p>}
        </div>
      );
    }

    // Reporting Dashboard
    if (description.includes("dashboard") || description.includes("report")) {
      return (
        <div className="mt-4 p-4 border border-gray-200 rounded-md bg-white">
          <h5 className="font-semibold text-gray-800 mb-2">Reporting Dashboard</h5>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
            <p>Total Applications: <span className="font-bold">{reportDisplayData.totalApplications}</span></p>
            <p>Approved: <span className="font-bold text-green-600">{reportDisplayData.approved}</span></p>
            <p>Rejected: <span className="font-bold text-red-600">{reportDisplayData.rejected}</span></p>
            <p>Pending: <span className="font-bold text-blue-600">{reportDisplayData.pending}</span></p>
          </div>
          <button
            onClick={handleGenerateReport}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            disabled={reportLoading}
          >
            {reportLoading ? 'Generating...' : 'Generate Report (PDF/CSV)'}
          </button>
        </div>
      );
    }

    return null; // No specific interactive element for this task
  };

  return (
    <div className="bg-white shadow-sm rounded-md p-4 border border-gray-200">
      <h4 className="text-md font-semibold text-gray-800">{task.title}</h4>
      <p className="mt-1 text-sm text-gray-600">{task.description}</p>
      {task.acceptance_criteria && task.acceptance_criteria.length > 0 && (
        <div className="mt-3">
          <p className="text-sm font-medium text-gray-700">Acceptance Criteria:</p>
          <ul className="list-disc list-inside text-sm text-gray-500">
            {task.acceptance_criteria.map((criteria, idx) => (
              <li key={idx}>{criteria}</li>
            ))}
          </ul>
        </div>
      )}
      {renderInteractiveElement()}
    </div>
  );
}

export default TaskComponent;