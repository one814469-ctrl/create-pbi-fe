import React from "react";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import epicsData from "./data/epics.json";
import prd from "./data/prd.txt?raw";
import EpicPage from "./components/EpicPage";

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const epicSlugs = epicsData.epics.map(e => ({
  slug: slugify(e.name || e.title),
  epic: e
}));

export default function App() {
  const location = useLocation();
  return (
    <div className="app-root">
      <header>
        <h1>Smart Loan Processing System</h1>
        <nav>
          <ul className="epic-nav">
            {epicSlugs.map(({ slug, epic }) => (
              <li key={epic.id || epic.name || epic.title}>
                <Link
                  to={`/epic/${slug}`}
                  className={
                    location.pathname === `/epic/${slug}` ? "active" : undefined
                  }
                >
                  {epic.name || epic.title}
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
            element={
              <Navigate
                to={
                  epicSlugs.length > 0
                    ? `/epic/${epicSlugs[0].slug}`
                    : "/notfound"
                }
                replace
              />
            }
          />
          {epicSlugs.map(({ slug, epic }) => (
            <Route
              key={slug}
              path={`/epic/${slug}`}
              element={<EpicPage epic={epic} prd={prd} />}
            />
          ))}
          <Route path="*" element={<h2>404 - Epic Not Found</h2>} />
        </Routes>
      </main>
    </div>
  );
}