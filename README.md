# Epics Dynamic App

This React project dynamically maps a JSON structure of Epics, User Stories, and Tasks into pages, features, and interactive task UIs.

## Features

- Each Epic becomes its own page/route.
- Each User Story is a React component feature.
- Each Task becomes real interactivity inside the User Story.
- All is generated dynamically from `src/data/epics.json`. Nothing is hardcoded.

## Getting Started

1. Install:

   
   npm install
   
2. Run:

   
   npm run dev
   
3. Visit http://localhost:5173

- You can adjust `src/data/epics.json` to define your own epics, stories, and tasks!

## Project Structure

- `src/main.jsx` — App entrypoint.
- `src/App.jsx` — Routing and layout.
- `src/components/` — Dynamic React feature and task components.
- `src/data/epics.json` — Your input JSON source. Edit to change app content.

---

Powered by Vite + React.