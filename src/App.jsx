import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import EpicPage from './components/EpicPage.jsx';
import epicsData from './data/epics.json';

function App() {
  const [epics, setEpics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setEpics(epicsData.epics);
  }, []);

  return (
    <div className="App">
      <header className="main-header">
        <h1>Smart Loan Processing System [Beta Stage]</h1>
        <nav className="main-nav">
          <ul>
            {epics.map(epic => (
              <li key={epic.slug}>
                <button className="nav-link" onClick={() => navigate(`/epic/${epic.slug}`)}>
                  {epic.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={
            <section className="welcome-page">
              <h2>Welcome to SLPS Demo</h2>
              <p>Choose an Epic to explore mapped features.</p>
            </section>
          } />
          {epics.map(epic => (
            <Route
              key={epic.slug}
              path={`/epic/${epic.slug}`}
              element={<EpicPage epic={epic} />}
            />
          ))}
          {/* Fallback route */}
          <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
      </main>
      <footer>
        <small>
          SLPS Demo &copy; {new Date().getFullYear()} | FinTrust Bank
        </small>
      </footer>
    </div>
  );
}

export default App;
