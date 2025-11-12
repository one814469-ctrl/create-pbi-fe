import React from "react";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import epicsData from "./data/epics.json";
import EpicPage from "./components/EpicPage";

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function App() {
  const { epics } = epicsData;
  const location = useLocation();

  return (
    <div className="app-root">
      <header>
        <h1>Epics App (Dynamic)</h1>
        <nav>
          <ul className="epic-nav">
            {epics.map(e => (
              <li key={e.id}>
                <Link
                  to={`/epic/${slugify(e.name)}`}
                  className={
                    location.pathname === `/epic/${slugify(e.name)}`
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
            element={<Navigate to={`/epic/${slugify(epics[0].name)}`} replace />}
          />
          {epics.map(epic => (
            <Route
              key={epic.id}
              path={`/epic/${slugify(epic.name)}`}
              element={<EpicPage epic={epic} />}
            />
          ))}
          <Route path="*" element={<h2>404 - Epic Not Found</h2>} />
        </Routes>
      </main>
    </div>
  );
}