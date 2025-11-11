# Dynamic Epics User Stories Tasks React App

This React app dynamically builds routes, components, and functionality based on a JSON structure of Epics, User Stories, and Tasks.

## Features

- Each Epic is represented as a route/page.
- Each User Story is rendered as a React component inside its Epic page.
- Each Task implements the described functionality inside its User Story component.
- Fully dynamic: no hardcoded Epics, User Stories, or Tasks.
- State management and interaction handled within components based on Task descriptions.
- Mocked backend logic where needed.
- Uses React Router v6 for routing.
- Created with Vite + React.

## Getting Started

1. Install dependencies

npm install

2. Run development server

npm run dev

3. Build production version

npm run build

4. Preview production build

npm run preview

## Project Structure

- `src/`
  - `main.jsx` — app entry point
  - `App.jsx` — main app & routing logic
  - `App.css` — styles
  - `components/` — dynamic components for Epics and User Stories

## Note

Replace the JSON input inside `src/App.jsx` with your own valid Epics → User Stories → Tasks structure to dynamically generate your app.

---

Created by ChatGPT.