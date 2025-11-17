import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EpicPage from './components/EpicPage';
import epicsData from './data/epics.json';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Smart Loan Processing System
            </h1>
          </div>
        </header>
        <nav className="bg-gray-100 p-4 rounded-md mt-4">
          <ul className="flex space-x-4">
            {epicsData.map((epic) => (
              <li key={epic.title}>
                <Link to={`/epic/${epic.title.toLowerCase().replace(/ /g, '-')}`} className="text-blue-500 hover:underline">
                  {epic.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <main className="mt-8">
          <Routes>
            {epicsData.map((epic) => (
              <Route
                key={epic.title}
                path={`/epic/${epic.title.toLowerCase().replace(/ /g, '-')}`}
                element={<EpicPage epic={epic} />}
              />
            ))}
            <Route path="/" element={<div className="text-gray-700">Select an Epic from the navigation above.</div>} />
          </Routes>
        </main>

        <footer className="mt-8 py-4 text-center text-gray-500 border-t">
          &copy; 2026 FinTrust Bank. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;