import React from "react";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import epicsData from "./data/epics.json";
import EpicPage from "./components/EpicPage";

export default function App() {
  const { epics } = epicsData;
  const location = useLocation();

  return (
    <div className="app-root">
      <header>
        <h1>Epics Application (Dynamic)</h1>
        <nav>
          <ul className="epic-nav">
            {epics.map(e => (
              <li key={e.id}>
                <Link
                  to={`/epic/${e.id}`}
                  className={
                    location.pathname === `/epic/${e.id}`
                      ? "active"
                      : undefined
                  }
                >
                  {e.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={`/epic/${epics[0].id}`} replace />}
          />
          {epics.map(epic => (
            <Route
              key={epic.id}
              path={`/epic/${epic.id}`}
              element={<EpicPage epic={epic} />}
            />
          ))}
          <Route path="*" element={<h2>404 - Epic Not Found</h2>} />
        </Routes>
      </main>
    </div>
  );
}