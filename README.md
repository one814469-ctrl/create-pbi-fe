# Dynamic Epics React App

This React app dynamically generates routes, components, and functionality based on a JSON structure representing epics, user stories, and tasks.

## Features

- Epics are pages/routes.
- User stories are feature components.
- Tasks are functional UI implementations (forms, dashboards, trackers, etc).
- Fully dynamic - no hardcoded epic/user story/task names or UI.
- Mock backend logic included.
- Uses React Router, Formik & Yup for forms, Recharts for charts.

## Setup & Run

npm install
npm run dev

Open the provided URL (usually http://localhost:5173).

## Code Structure

- `src/main.jsx` - React entry.
- `src/App.jsx` - Main router and app logic.
- `src/components/` - Dynamically generated feature components.
- `src/App.css` - Styling.

## Usage

Replace the JSON in `src/App.jsx` with any valid epics → user stories → tasks JSON to dynamically generate a React project.

Enjoy!