import React, { useState } from 'react';

function TaskComponent({ task }) {
  const [loanType, setLoanType] = useState('personal');
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState('Submitted');
  const [creditScore, setCreditScore] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [notification, setNotification] = useState('');
  const [reportData, setReportData] = useState({ totalApplications: 100, approvals: 60, rejections: 40 });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted (mock). Data: ' + JSON.stringify(formData));
  };

  const handleStatusChange = () => {
    const statuses = ['Submitted', 'Under Review', 'Approved', 'Rejected'];
    const currentIndex = statuses.indexOf(status);
    setStatus(statuses[(currentIndex + 1) % statuses.length]);
  };

  const handleCreditCheck = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCreditScore(Math.floor(Math.random() * (850 - 300 + 1)) + 300);
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handleOCR = async () => {
    if (!file) {
      alert('Please upload a file first.');
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    setOcrResult('OCR Result: Verified (mock)');
  };

  const handleSendNotification = () => {
    setNotification('Notification sent! (mock)');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleGenerateReport = () => {
    alert('Report generated and downloaded (mock).');
  };

  return (
    <div className="border rounded-md p-4 bg-gray-100">
      <h4 className="font-semibold">{task.title}</h4>
      <p className="text-sm">{task.description}</p>
      <ul className="list-disc pl-5 mt-2">
        {task.acceptance_criteria && task.acceptance_criteria.map((criteria, index) => (
          <li key={index} className="text-gray-700">{criteria}</li>
        ))}
      </ul>

      {task.description.includes("form") && (
        <form onSubmit={handleSubmit} className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Loan Type:</label>
          <select value={loanType} onChange={(e) => setLoanType(e.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="personal">Personal Loan</option>
            <option value="home">Home Loan</option>
          </select>

          <label className="block text-sm font-medium text-gray-700 mt-2">Amount:</label>
          <input type="number" name="amount" onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />

          <button type="submit" className="mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
        </form>
      )}

      {task.description.includes("upload") && (
        <div className="mt-4">
          <input type="file" onChange={handleFileUpload} className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          {file && <p className="mt-2 text-sm text-gray-500">Selected file: {file.name}</p>}
        </div>
      )}

      {task.description.includes("API") && task.description.includes("credit") && (
        <div className="mt-4">
          <button onClick={handleCreditCheck} className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Fetch Credit Score</button>
          {creditScore !== null && <p className="mt-2 text-sm text-gray-700">Credit Score: {creditScore}</p>}
        </div>
      )}

      {task.description.includes("notification") && (
        <div className="mt-4">
          <button onClick={handleSendNotification} className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">Send Notification</button>
          {notification && <p className="mt-2 text-sm text-green-700">{notification}</p>}
        </div>
      )}

      {task.description.includes("dashboard") && (
        <div className="mt-4">
          <h5 className="font-semibold">Reporting Dashboard</h5>
          <p>Total Applications: {reportData.totalApplications}</p>
          <p>Approvals: {reportData.approvals}</p>
          <p>Rejections: {reportData.rejections}</p>
          <button onClick={handleGenerateReport} className="mt-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Generate Report</button>
        </div>
      )}

      {task.description.includes("tracking") && (
        <div className="mt-4">
          <p>Application Status: {status}</p>
          <button onClick={handleStatusChange} className="mt-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Update Status</button>
        </div>
      )}

      {task.description.includes("OCR") && (
        <div className="mt-4">
          <button onClick={handleOCR} className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">Run OCR</button>
          {ocrResult && <p className="mt-2 text-sm text-gray-700">{ocrResult}</p>}
        </div>
      )}
    </div>
  );
}

export default TaskComponent;