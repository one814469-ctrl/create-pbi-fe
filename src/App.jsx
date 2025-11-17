import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import EpicPage from './components/EpicPage';
import epicsData from './data/epics.json';
import './App.css';

function App() {
  // Generate a slug for an epic title
  const getEpicSlug = (title) => title.toLowerCase().replace(/ /g, '-');

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Smart Loan Processing System
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Streamlining loan applications for FinTrust Bank.
            </p>
          </div>
        </header>

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex-grow">
          <nav className="bg-white p-4 rounded-md shadow-sm mb-6">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {epicsData.map((epic) => (
                <li key={epic.title}>
                  <Link
                    to={`/epic/${getEpicSlug(epic.title)}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  >
                    {epic.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <main className="px-4 py-6 sm:px-0">
            <Routes>
              {epicsData.map((epic) => (
                <Route
                  key={epic.title}
                  path={`/epic/${getEpicSlug(epic.title)}`}
                  element={<EpicPage epic={epic} />}
                />
              ))}
              {/* Redirect to the first epic by default */}
              <Route path="/" element={<Navigate to={`/epic/${getEpicSlug(epicsData[0].title)}`} replace />} />
              <Route path="*" element={<div className="text-center text-gray-700 py-10">404 - Page Not Found. Please select an Epic from the navigation.</div>} />
            </Routes>
          </main>
        </div>

        <footer className="bg-white shadow mt-8">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
            &copy; 2026 FinTrust Bank. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;